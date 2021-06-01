# coding: utf-8

from __future__ import absolute_import
from datetime import date, datetime  # noqa: F401

from typing import List, Dict  # noqa: F401

from ulmapi.dto.base_model_ import Model
from ulmapi import util


class UpdateCourseResponse(Model):
    """NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).

    Do not edit the class manually.
    """

    def __init__(self, updated_at=None, course_id=None, username=None):  # noqa: E501
        """UpdateCourseResponse - a model defined in OpenAPI

        :param updated_at: The updated_at of this UpdateCourseResponse.  # noqa: E501
        :type updated_at: datetime
        :param course_id: The course_id of this UpdateCourseResponse.  # noqa: E501
        :type course_id: str
        :param username: The username of this UpdateCourseResponse.  # noqa: E501
        :type username: str
        """
        self.openapi_types = {
            'updated_at': datetime,
            'course_id': str,
            'username': str
        }

        self.attribute_map = {
            'updated_at': 'updated_at',
            'course_id': 'course_id',
            'username': 'username'
        }

        self._updated_at = updated_at
        self._course_id = course_id
        self._username = username

    @classmethod
    def from_dict(cls, dikt) -> 'UpdateCourseResponse':
        """Returns the dict as a model

        :param dikt: A dict.
        :type: dict
        :return: The UpdateCourseResponse of this UpdateCourseResponse.  # noqa: E501
        :rtype: UpdateCourseResponse
        """
        return util.deserialize_model(dikt, cls)

    @property
    def updated_at(self):
        """Gets the updated_at of this UpdateCourseResponse.


        :return: The updated_at of this UpdateCourseResponse.
        :rtype: datetime
        """
        return self._updated_at

    @updated_at.setter
    def updated_at(self, updated_at):
        """Sets the updated_at of this UpdateCourseResponse.


        :param updated_at: The updated_at of this UpdateCourseResponse.
        :type updated_at: datetime
        """
        if updated_at is None:
            raise ValueError("Invalid value for `updated_at`, must not be `None`")  # noqa: E501

        self._updated_at = updated_at

    @property
    def course_id(self):
        """Gets the course_id of this UpdateCourseResponse.


        :return: The course_id of this UpdateCourseResponse.
        :rtype: str
        """
        return self._course_id

    @course_id.setter
    def course_id(self, course_id):
        """Sets the course_id of this UpdateCourseResponse.


        :param course_id: The course_id of this UpdateCourseResponse.
        :type course_id: str
        """
        if course_id is None:
            raise ValueError("Invalid value for `course_id`, must not be `None`")  # noqa: E501

        self._course_id = course_id

    @property
    def username(self):
        """Gets the username of this UpdateCourseResponse.


        :return: The username of this UpdateCourseResponse.
        :rtype: str
        """
        return self._username

    @username.setter
    def username(self, username):
        """Sets the username of this UpdateCourseResponse.


        :param username: The username of this UpdateCourseResponse.
        :type username: str
        """
        if username is None:
            raise ValueError("Invalid value for `username`, must not be `None`")  # noqa: E501

        self._username = username