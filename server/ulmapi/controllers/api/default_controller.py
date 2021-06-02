import connexion
import six

from ulmapi.dto.access_token import AccessToken  # noqa: E501
from ulmapi.dto.course_info import CourseInfo  # noqa: E501
from ulmapi.dto.deliverable_info import DeliverableInfo  # noqa: E501
from ulmapi.dto.schedule_info import ScheduleInfo  # noqa: E501
from ulmapi.dto.signup_info import SignupInfo  # noqa: E501
from ulmapi.dto.user_credentials import UserCredentials  # noqa: E501
from ulmapi.dto.user_info import UserInfo  # noqa: E501
from ulmapi import util


def course_course_id_deliverable_post(course_id, deliverable_info=None):  # noqa: E501
    """Create a new deliverable for the user&#39;s course

     # noqa: E501

    :param course_id: Course ID
    :type course_id: str
    :param deliverable_info: 
    :type deliverable_info: dict | bytes

    :rtype: DeliverableInfo
    """
    if connexion.request.is_json:
        deliverable_info = DeliverableInfo.from_dict(connexion.request.get_json())  # noqa: E501
    return 'do some magic!'


def course_post(course_info=None):  # noqa: E501
    """Create a new course for the user

     # noqa: E501

    :param course_info: 
    :type course_info: dict | bytes

    :rtype: CourseInfo
    """
    if connexion.request.is_json:
        course_info = CourseInfo.from_dict(connexion.request.get_json())  # noqa: E501
    return 'do some magic!'


def login_post(user_credentials=None):  # noqa: E501
    """Exchange username and password for access token

     # noqa: E501

    :param user_credentials: 
    :type user_credentials: dict | bytes

    :rtype: AccessToken
    """
    if connexion.request.is_json:
        user_credentials = UserCredentials.from_dict(connexion.request.get_json())  # noqa: E501
    return 'do some magic!'


def schedule_post(schedule_info=None):  # noqa: E501
    """Request generation of a new schedule

     # noqa: E501

    :param schedule_info: 
    :type schedule_info: dict | bytes

    :rtype: ScheduleInfo
    """
    if connexion.request.is_json:
        schedule_info = ScheduleInfo.from_dict(connexion.request.get_json())  # noqa: E501
    return 'do some magic!'


def signup_post(signup_info=None):  # noqa: E501
    """Creates a new user (signup)

     # noqa: E501

    :param signup_info: 
    :type signup_info: dict | bytes

    :rtype: AccessToken
    """
    if connexion.request.is_json:
        signup_info = SignupInfo.from_dict(connexion.request.get_json())  # noqa: E501
    return 'do some magic!'


def user_get():  # noqa: E501
    """Get user&#39;s information

     # noqa: E501


    :rtype: List[UserInfo]
    """
    return 'do some magic!'


def user_put(user_info=None):  # noqa: E501
    """Update user&#39;s information

     # noqa: E501

    :param user_info: 
    :type user_info: dict | bytes

    :rtype: UserInfo
    """
    if connexion.request.is_json:
        user_info = UserInfo.from_dict(connexion.request.get_json())  # noqa: E501
    return 'do some magic!'
