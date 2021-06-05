# coding: utf-8

from __future__ import absolute_import
from datetime import date, datetime  # noqa: F401

from typing import List, Dict  # noqa: F401

from ulmapi.dto.base_model_ import Model
from ulmapi import util


class UserInfoCurrentSchedule(Model):
    """NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).

    Do not edit the class manually.
    """

    def __init__(self, starts_at=None, ends_at=None, time_allocations=None):  # noqa: E501
        """UserInfoCurrentSchedule - a model defined in OpenAPI

        :param starts_at: The starts_at of this UserInfoCurrentSchedule.  # noqa: E501
        :type starts_at: date
        :param ends_at: The ends_at of this UserInfoCurrentSchedule.  # noqa: E501
        :type ends_at: date
        :param time_allocations: The time_allocations of this UserInfoCurrentSchedule.  # noqa: E501
        :type time_allocations: Dict[str, float]
        """
        self.openapi_types = {
            'starts_at': date,
            'ends_at': date,
            'time_allocations': Dict[str, float]
        }

        self.attribute_map = {
            'starts_at': 'starts_at',
            'ends_at': 'ends_at',
            'time_allocations': 'time_allocations'
        }

        self._starts_at = starts_at
        self._ends_at = ends_at
        self._time_allocations = time_allocations

    @classmethod
    def from_dict(cls, dikt) -> 'UserInfoCurrentSchedule':
        """Returns the dict as a model

        :param dikt: A dict.
        :type: dict
        :return: The UserInfo_current_schedule of this UserInfoCurrentSchedule.  # noqa: E501
        :rtype: UserInfoCurrentSchedule
        """
        return util.deserialize_model(dikt, cls)

    @property
    def starts_at(self):
        """Gets the starts_at of this UserInfoCurrentSchedule.


        :return: The starts_at of this UserInfoCurrentSchedule.
        :rtype: date
        """
        return self._starts_at

    @starts_at.setter
    def starts_at(self, starts_at):
        """Sets the starts_at of this UserInfoCurrentSchedule.


        :param starts_at: The starts_at of this UserInfoCurrentSchedule.
        :type starts_at: date
        """

        self._starts_at = starts_at

    @property
    def ends_at(self):
        """Gets the ends_at of this UserInfoCurrentSchedule.


        :return: The ends_at of this UserInfoCurrentSchedule.
        :rtype: date
        """
        return self._ends_at

    @ends_at.setter
    def ends_at(self, ends_at):
        """Sets the ends_at of this UserInfoCurrentSchedule.


        :param ends_at: The ends_at of this UserInfoCurrentSchedule.
        :type ends_at: date
        """

        self._ends_at = ends_at

    @property
    def time_allocations(self):
        """Gets the time_allocations of this UserInfoCurrentSchedule.


        :return: The time_allocations of this UserInfoCurrentSchedule.
        :rtype: Dict[str, float]
        """
        return self._time_allocations

    @time_allocations.setter
    def time_allocations(self, time_allocations):
        """Sets the time_allocations of this UserInfoCurrentSchedule.


        :param time_allocations: The time_allocations of this UserInfoCurrentSchedule.
        :type time_allocations: Dict[str, float]
        """

        self._time_allocations = time_allocations
