import connexion
import six

from ulmapi.dto.course_info import CourseInfo  # noqa: E501
from ulmapi.dto.create_course_response import CreateCourseResponse  # noqa: E501
from ulmapi.dto.delete_course_response import DeleteCourseResponse  # noqa: E501
from ulmapi.dto.update_course_response import UpdateCourseResponse  # noqa: E501
from ulmapi import util


def users_username_course_course_iddelete(username, course_id):  # noqa: E501
    """Delete a course for the user

     # noqa: E501

    :param username: Username
    :type username: str
    :param course_id: Course ID
    :type course_id: str

    :rtype: DeleteCourseResponse
    """
    return 'do some magic!'


def users_username_course_course_idget(username, course_id):  # noqa: E501
    """Get course by id for the user

     # noqa: E501

    :param username: Username
    :type username: str
    :param course_id: Course ID
    :type course_id: str

    :rtype: CourseInfo
    """
    return 'do some magic!'


def users_username_course_course_idput(username, course_id, course_info=None):  # noqa: E501
    """Replace a course for the user

     # noqa: E501

    :param username: Username
    :type username: str
    :param course_id: Course ID
    :type course_id: str
    :param course_info: 
    :type course_info: dict | bytes

    :rtype: UpdateCourseResponse
    """
    if connexion.request.is_json:
        course_info = CourseInfo.from_dict(connexion.request.get_json())  # noqa: E501
    return 'do some magic!'


def users_username_course_get(username):  # noqa: E501
    """Get all courses for the user

     # noqa: E501

    :param username: Username
    :type username: str

    :rtype: List[CourseInfo]
    """
    return 'do some magic!'


def users_username_course_post(username, course_info=None):  # noqa: E501
    """Create a new course for the user

     # noqa: E501

    :param username: Username
    :type username: str
    :param course_info: 
    :type course_info: dict | bytes

    :rtype: CreateCourseResponse
    """
    if connexion.request.is_json:
        course_info = CourseInfo.from_dict(connexion.request.get_json())  # noqa: E501
    return 'do some magic!'
