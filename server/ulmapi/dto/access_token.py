# coding: utf-8

from __future__ import absolute_import
from datetime import date, datetime  # noqa: F401

from typing import List, Dict  # noqa: F401

from ulmapi.dto.base_model_ import Model
from ulmapi import util


class AccessToken(Model):
    """NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).

    Do not edit the class manually.
    """

    def __init__(self, access_token=None):  # noqa: E501
        """AccessToken - a model defined in OpenAPI

        :param access_token: The access_token of this AccessToken.  # noqa: E501
        :type access_token: str
        """
        self.openapi_types = {
            'access_token': str
        }

        self.attribute_map = {
            'access_token': 'access_token'
        }

        self._access_token = access_token

    @classmethod
    def from_dict(cls, dikt) -> 'AccessToken':
        """Returns the dict as a model

        :param dikt: A dict.
        :type: dict
        :return: The AccessToken of this AccessToken.  # noqa: E501
        :rtype: AccessToken
        """
        return util.deserialize_model(dikt, cls)

    @property
    def access_token(self):
        """Gets the access_token of this AccessToken.


        :return: The access_token of this AccessToken.
        :rtype: str
        """
        return self._access_token

    @access_token.setter
    def access_token(self, access_token):
        """Sets the access_token of this AccessToken.


        :param access_token: The access_token of this AccessToken.
        :type access_token: str
        """
        if access_token is None:
            raise ValueError("Invalid value for `access_token`, must not be `None`")  # noqa: E501

        self._access_token = access_token
