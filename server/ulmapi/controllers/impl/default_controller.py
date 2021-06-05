import connexion
import datetime
import flask
import hashlib
import logging

from mongoengine.errors import DoesNotExist, NotUniqueError

from ulmapi.controllers.impl.security_controller_ import hash_password, verify_password, encode_auth_token
from ulmapi.db import models
from ulmapi.dto.access_token import AccessToken
from ulmapi.dto.user_credentials import UserCredentials
from ulmapi.dto.signup_info import SignupInfo
from ulmapi.controllers.util.db_converter import user_info_from_db, course_info_to_db, \
    course_info_from_db, deliverable_info_to_db, deliverable_info_from_db, time_spent_info_from_db, \
    time_spent_info_to_db, schedule_info_to_db
from ulmapi.dto.course_info import CourseInfo
from ulmapi.dto.deliverable_info import DeliverableInfo
from ulmapi.dto.schedule_info import ScheduleInfo
from ulmapi.dto.time_spent_info import TimeSpentInfo
from ulmapi.schedule.generator import create_time_allocations


LOG = logging.getLogger(__name__)


def course_course_id_deliverable_post(course_id, user):  # noqa: E501
    deliverable_info = DeliverableInfo.from_dict(connexion.request.get_json())  # noqa: E501
    deliverable_name = deliverable_info.deliverable_name
    deliverable_id = hashlib.sha256(deliverable_name.encode('utf8')).hexdigest()
    deliverable_info.deliverable_id = deliverable_id

    try:
        user_db = models.User.objects.get(username=user)
    except DoesNotExist:
        return flask.Response(status=401)

    if course_id not in user_db.courses:
        return 'course_id {} does not exist for user {}'.format(course_id, user), 400
    if deliverable_id in user_db.courses[course_id].deliverables:
        return 'deliverable_id {} already exists for user {} and course_id {}'.format(deliverable_id, user, course_id), 400

    deliverable_db = deliverable_info_to_db(deliverable_info)
    user_db.courses[course_id].deliverables[deliverable_id] = deliverable_db
    user_db.save()
    return deliverable_info_from_db(user_db.courses[course_id].deliverables[deliverable_id])


def course_course_id_deliverable_deliverable_id_put(course_id, deliverable_id, user):  # noqa: E501
    deliverable_info = DeliverableInfo.from_dict(connexion.request.get_json())  # noqa: E501
    deliverable_info.deliverable_id = deliverable_id
    deliverable_name = deliverable_info.deliverable_name

    try:
        user_db = models.User.objects.get(username=user)
    except DoesNotExist:
        return flask.Response(status=401)

    if course_id not in user_db.courses:
        return 'course_id {} does not exist for user {}'.format(course_id, user), 400
    if deliverable_id not in user_db.courses[course_id].deliverables:
        return 'deliverable_id {} does not exist for user {} and course_id {}'.format(deliverable_name, user, course_id), 400

    deliverable_db = deliverable_info_to_db(deliverable_info)
    user_db.courses[course_id].deliverables[deliverable_id] = deliverable_db
    user_db.save()
    return deliverable_info_from_db(user_db.courses[course_id].deliverables[deliverable_id])


def course_course_id_timespent_post(course_id, user):  # noqa: E501
    """Create a new deliverable for the user&#39;s course

     # noqa: E501

    :param course_id: Course ID
    :type course_id: str
    :param time_spent_info:
    :type time_spent_info: dict | bytes

    :rtype: TimeSpentInfo
    """
    time_spent_info = TimeSpentInfo.from_dict(connexion.request.get_json())  # noqa: E501
    try:
        user_db = models.User.objects.get(username=user)
    except DoesNotExist:
        return flask.Response(status=401)

    if course_id not in user_db.courses:
        return 'Course {} does not exist for user {}'.format(course_id, user), 400

    time_spent_db = time_spent_info_to_db(time_spent_info)
    user_db.courses[course_id].time_spent.append(time_spent_db)
    user_db.save()
    return time_spent_info_from_db(time_spent_db)


def course_post(user):  # noqa: E501
    """Create a new course for the user

     # noqa: E501

    :param course_info:
    :type course_info: dict | bytes

    :rtype: CourseInfo
    """
    course_info = CourseInfo.from_dict(connexion.request.get_json())  # noqa: E501
    course_id = course_info.course_id

    try:
        user_db = models.User.objects.get(username=user)
    except DoesNotExist:
        return flask.Response(status=401)

    if course_id in user_db.courses:
        return 'Course {} already exists for user {}'.format(course_id, user), 400

    course_db = course_info_to_db(course_info)
    user_db.courses[course_id] = course_db
    user_db.save()
    return course_info_from_db(user_db.courses[course_id])


def course_course_id_put(course_id, user):  # noqa: E501
    """Create a new course for the user

     # noqa: E501

    :param course_info:
    :type course_info: dict | bytes

    :rtype: CourseInfo
    """
    course_info = CourseInfo.from_dict(connexion.request.get_json())  # noqa: E501

    try:
        user_db = models.User.objects.get(username=user)
    except DoesNotExist:
        return flask.Response(status=401)

    if course_id not in user_db.courses:
        return 'Course {} does not exist for user {}'.format(course_id, user), 400

    course_db = course_info_to_db(course_info)
    # If client did not specify a deliverables dictionary, don't change the existing one
    if course_info.deliverables is None:
        course_db.deliverables = user_db.courses[course_id].deliverables
    if course_info.time_spent is None:
        course_db.time_spent = user_db.courses[course_id].time_spent

    user_db.courses[course_id] = course_db
    user_db.save()
    return course_info_from_db(user_db.courses[course_id])


def login_post():  # noqa: E501
    '''Login using username and password

    The user&#39;s credentials are exchanged for a bearer token. # noqa: E501

    :param credentials:
    :type credentials: dict | bytes

    :rtype: AccessToken
    '''
    credentials = UserCredentials.from_dict(connexion.request.get_json())
    # Load a document
    try:
        user = models.User.objects.get(username=credentials.username)
    except DoesNotExist:
        return flask.Response(status=401)
    if not verify_password(credentials.password, user['password']):
        return flask.Response(status=401)
    access_token = encode_auth_token(credentials.username)
    return AccessToken(access_token=access_token)


def schedule_post(user):  # noqa: E501
    """Request generation of a new schedule

     # noqa: E501

    :param schedule_info:
    :type schedule_info: dict | bytes

    :rtype: ScheduleInfo
    """
    schedule_info = ScheduleInfo.from_dict(connexion.request.get_json())
    try:
        user_db = models.User.objects.get(username=user)
    except DoesNotExist:
        return flask.Response(status=404)

    schedule_info.time_allocations = create_time_allocations(schedule_info, user_db)
    schedule_db = schedule_info_to_db(schedule_info)
    user_db.current_schedule = schedule_db
    user_db.save()
    return schedule_info


def signup_post():  # noqa: E501
    '''Creates a new user (signup)

     # noqa: E501

    :param signup_info:
    :type signup_info: dict | bytes

    :rtype: AccessToken
    '''
    signup_info = SignupInfo.from_dict(connexion.request.get_json())
    # Create a new document
    user_db = models.User(email=signup_info.email,
                           username=signup_info.username,
                           password=hash_password(signup_info.password),
                           joined_at=datetime.datetime.utcnow(),
                           courses={})
    try:
        user_db.save()
    except NotUniqueError:
        return ('Both email and username must be unique.', 400)
    return 200


def user_get(user):  # noqa: E501
    """Get user&#39;s information

     # noqa: E501


    :rtype: List[UserInfo]
    """
    LOG.info('The current user is \'%s\'', user)
    try:
        user_db = models.User.objects.get(username=user)
    except DoesNotExist:
        return flask.Response(status=404)
            
    return user_info_from_db(user_db)


# def user_put(user, user_info=None):  # noqa: E501
#     """Update user&#39;s information
#
#      # noqa: E501
#
#     :param user_info:
#     :type user_info: dict | bytes
#
#     :rtype: UserInfo
#     """
#     user_info = UserInfo.from_dict(connexion.request.get_json())
#     try:
#         user_db = models.User.objects.get(username=user)
#     except DoesNotExist:
#         return flask.Response(status=401)
#
#     user_info_to_db(user_db, user_info)
#     user_db.save()
