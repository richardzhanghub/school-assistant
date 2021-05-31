# coding: utf-8

from __future__ import absolute_import
from datetime import date, datetime  # noqa: F401

from typing import List, Dict  # noqa: F401

from ulmapi.dto.base_model_ import Model
from ulmapi import util


class DeleteCourseResponse(Model):
    """NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).

    Do not edit the class manually.
    """

    def __init__(self, deleted=None):  # noqa: E501
        """DeleteCourseResponse - a model defined in OpenAPI

        :param deleted: The deleted of this DeleteCourseResponse.  # noqa: E501
        :type deleted: bool
        """
        self.openapi_types = {
            'deleted': bool
        }

        self.attribute_map = {
            'deleted': 'deleted'
        }

        self._deleted = deleted

    @classmethod
    def from_dict(cls, dikt) -> 'DeleteCourseResponse':
        """Returns the dict as a model

        :param dikt: A dict.
        :type: dict
        :return: The DeleteCourseResponse of this DeleteCourseResponse.  # noqa: E501
        :rtype: DeleteCourseResponse
        """
        return util.deserialize_model(dikt, cls)

    @property
    def deleted(self):
        """Gets the deleted of this DeleteCourseResponse.


        :return: The deleted of this DeleteCourseResponse.
        :rtype: bool
        """
        return self._deleted

    @deleted.setter
    def deleted(self, deleted):
        """Sets the deleted of this DeleteCourseResponse.


        :param deleted: The deleted of this DeleteCourseResponse.
        :type deleted: bool
        """
        if deleted is None:
            raise ValueError("Invalid value for `deleted`, must not be `None`")  # noqa: E501

        self._deleted = deleted
