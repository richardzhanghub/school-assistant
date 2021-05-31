# coding: utf-8

from __future__ import absolute_import
from datetime import date, datetime  # noqa: F401

from typing import List, Dict  # noqa: F401

from ulmapi.dto.base_model_ import Model
from ulmapi import util


class CourseInfo(Model):
    """NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).

    Do not edit the class manually.
    """

    def __init__(self, course_id=None, course_name=None, expected_difficulty=None, desired_grade=None):  # noqa: E501
        """CourseInfo - a model defined in OpenAPI

        :param course_id: The course_id of this CourseInfo.  # noqa: E501
        :type course_id: str
        :param course_name: The course_name of this CourseInfo.  # noqa: E501
        :type course_name: str
        :param expected_difficulty: The expected_difficulty of this CourseInfo.  # noqa: E501
        :type expected_difficulty: int
        :param desired_grade: The desired_grade of this CourseInfo.  # noqa: E501
        :type desired_grade: int
        """
        self.openapi_types = {
            'course_id': str,
            'course_name': str,
            'expected_difficulty': int,
            'desired_grade': int
        }

        self.attribute_map = {
            'course_id': 'course_id',
            'course_name': 'course_name',
            'expected_difficulty': 'expected_difficulty',
            'desired_grade': 'desired_grade'
        }

        self._course_id = course_id
        self._course_name = course_name
        self._expected_difficulty = expected_difficulty
        self._desired_grade = desired_grade

    @classmethod
    def from_dict(cls, dikt) -> 'CourseInfo':
        """Returns the dict as a model

        :param dikt: A dict.
        :type: dict
        :return: The CourseInfo of this CourseInfo.  # noqa: E501
        :rtype: CourseInfo
        """
        return util.deserialize_model(dikt, cls)

    @property
    def course_id(self):
        """Gets the course_id of this CourseInfo.


        :return: The course_id of this CourseInfo.
        :rtype: str
        """
        return self._course_id

    @course_id.setter
    def course_id(self, course_id):
        """Sets the course_id of this CourseInfo.


        :param course_id: The course_id of this CourseInfo.
        :type course_id: str
        """
        if course_id is None:
            raise ValueError("Invalid value for `course_id`, must not be `None`")  # noqa: E501
        if course_id is not None and len(course_id) < 1:
            raise ValueError("Invalid value for `course_id`, length must be greater than or equal to `1`")  # noqa: E501

        self._course_id = course_id

    @property
    def course_name(self):
        """Gets the course_name of this CourseInfo.


        :return: The course_name of this CourseInfo.
        :rtype: str
        """
        return self._course_name

    @course_name.setter
    def course_name(self, course_name):
        """Sets the course_name of this CourseInfo.


        :param course_name: The course_name of this CourseInfo.
        :type course_name: str
        """
        if course_name is None:
            raise ValueError("Invalid value for `course_name`, must not be `None`")  # noqa: E501
        if course_name is not None and len(course_name) < 1:
            raise ValueError("Invalid value for `course_name`, length must be greater than or equal to `1`")  # noqa: E501

        self._course_name = course_name

    @property
    def expected_difficulty(self):
        """Gets the expected_difficulty of this CourseInfo.


        :return: The expected_difficulty of this CourseInfo.
        :rtype: int
        """
        return self._expected_difficulty

    @expected_difficulty.setter
    def expected_difficulty(self, expected_difficulty):
        """Sets the expected_difficulty of this CourseInfo.


        :param expected_difficulty: The expected_difficulty of this CourseInfo.
        :type expected_difficulty: int
        """
        if expected_difficulty is None:
            raise ValueError("Invalid value for `expected_difficulty`, must not be `None`")  # noqa: E501
        if expected_difficulty is not None and expected_difficulty > 5:  # noqa: E501
            raise ValueError("Invalid value for `expected_difficulty`, must be a value less than or equal to `5`")  # noqa: E501
        if expected_difficulty is not None and expected_difficulty < 1:  # noqa: E501
            raise ValueError("Invalid value for `expected_difficulty`, must be a value greater than or equal to `1`")  # noqa: E501

        self._expected_difficulty = expected_difficulty

    @property
    def desired_grade(self):
        """Gets the desired_grade of this CourseInfo.


        :return: The desired_grade of this CourseInfo.
        :rtype: int
        """
        return self._desired_grade

    @desired_grade.setter
    def desired_grade(self, desired_grade):
        """Sets the desired_grade of this CourseInfo.


        :param desired_grade: The desired_grade of this CourseInfo.
        :type desired_grade: int
        """
        if desired_grade is None:
            raise ValueError("Invalid value for `desired_grade`, must not be `None`")  # noqa: E501
        if desired_grade is not None and desired_grade > 100:  # noqa: E501
            raise ValueError("Invalid value for `desired_grade`, must be a value less than or equal to `100`")  # noqa: E501
        if desired_grade is not None and desired_grade < 0:  # noqa: E501
            raise ValueError("Invalid value for `desired_grade`, must be a value greater than or equal to `0`")  # noqa: E501

        self._desired_grade = desired_grade
