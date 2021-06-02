import connexion
import datetime
import flask
import logging

from mongoengine.errors import DoesNotExist, NotUniqueError

from ortools.algorithms import pywrapknapsack_solver as ks

from ulmapi.controllers.impl.security_controller_ import hash_password, verify_password, encode_auth_token
from ulmapi.db import models
from ulmapi.dto.access_token import AccessToken
from ulmapi.dto.user_credentials import UserCredentials
from ulmapi.dto.signup_info import SignupInfo
from ulmapi.controllers.util.db_converter import user_info_from_db, user_info_to_db, course_info_to_db, \
    course_info_from_db, deliverable_info_to_db, deliverable_info_from_db, time_spent_info_from_db, \
    time_spent_info_to_db
from ulmapi.dto.course_info import CourseInfo
from ulmapi.dto.deliverable_info import DeliverableInfo
from ulmapi.dto.schedule_info import ScheduleInfo
from ulmapi.dto.time_spent_info import TimeSpentInfo
from ulmapi.dto.user_info import UserInfo

LOG = logging.getLogger(__name__)


def course_course_id_deliverable_post(course_id, user):  # noqa: E501
    """Create a new deliverable for the user&#39;s course

     # noqa: E501

    :param course_id: Course ID
    :type course_id: str
    :param deliverable_info:
    :type deliverable_info: dict | bytes

    :rtype: DeliverableInfo
    """
    deliverable_info = DeliverableInfo.from_dict(connexion.request.get_json())  # noqa: E501
    deliverable_name = deliverable_info.deliverable_name

    try:
        user_db = models.User.objects.get(username=user)
    except DoesNotExist:
        return flask.Response(status=401)

    if course_id not in user_db.courses:
        return 'Course {} does not exist for user {}'.format(course_id, user), 400
    if deliverable_name in user_db.courses[course_id].deliverables:
        return 'Deliverable {} already exists for user {} and course_id {}'.format(deliverable_name, user, course_id), 400

    deliverable_db = deliverable_info_to_db(deliverable_info)
    user_db.courses[course_id].deliverables[deliverable_name] = deliverable_db
    user_db.save()
    return deliverable_info_from_db(user_db.courses[course_id].deliverables[deliverable_name])


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
    schedule_dto = ScheduleInfo.from_dict(connexion.request.get_json())
    try:
        user_db = models.User.objects.get(username=user)
        print(user_db.to_json())
    except DoesNotExist:
        return flask.Response(status=404)

    # Maximum number of hours to schedule over the period
    cost_limit = schedule_dto.max_study_hours

    # Each item costs 0.25h
    item_cost = 0.25
    # Each course tries to use the whole cost budget
    num_items_per_course = int(cost_limit // item_cost)

    # Total number of items across all courses
    num_courses = len(user_db.courses)
    total_num_items = num_items_per_course * num_courses

    solver = ks.KnapsackSolver(ks.KnapsackSolver.KNAPSACK_MULTIDIMENSION_BRANCH_AND_BOUND_SOLVER, 'ScheduleGenerator')
    item_weights = [[item_cost for _ in range(total_num_items)]]

    item_courses = []
    item_values = []
    for course_id, course in user_db.courses.items():
        for i in range(num_items_per_course):
            # TODO: use decreasing exponential value function
            item_value = 1
            item_values.append(item_value)
            item_courses.append(course_id)

    item_courses, item_values = (list(t) for t in zip(*sorted(zip(item_courses, item_values))))

    cost_limits = [cost_limit]
    solver.Init(item_values, item_weights, cost_limits)
    computed_value = solver.Solve()

    packed_items = []
    packed_weights = []
    total_weight = 0
    print('Total value =', computed_value)
    for i in range(len(item_values)):
        if solver.BestSolutionContains(i):
            packed_items.append(i)
            packed_weights.append(item_weights[0][i])
            total_weight += item_weights[0][i]
    print('Total weight:', total_weight)
    print('Packed items:', packed_items)
    print('Packed_weights:', packed_weights)

    schedule_dto.time_allocations = {}
    print(len(packed_items))
    for idx in range(len(packed_items)):
        if idx == num_items_per_course:
            break
        i = packed_items[idx]
        course_id = item_courses[i]
        if course_id not in schedule_dto.time_allocations:
            schedule_dto.time_allocations[course_id] = 0.25
        else:
            schedule_dto.time_allocations[course_id] += 0.25
    return schedule_dto

def signup_post(signup_info=None):  # noqa: E501
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


def user_put(user, user_info=None):  # noqa: E501
    """Update user&#39;s information

     # noqa: E501

    :param user_info: 
    :type user_info: dict | bytes

    :rtype: UserInfo
    """
    user_info = UserInfo.from_dict(connexion.request.get_json())
    try:
        user_db = models.User.objects.get(username=user)
    except DoesNotExist:
        return flask.Response(status=401)

    user_info_to_db(user_db, user_info)
    user_db.save()
