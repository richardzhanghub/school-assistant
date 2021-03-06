# coding: utf-8

from __future__ import absolute_import
from datetime import date, datetime  # noqa: F401

from typing import List, Dict  # noqa: F401

from ulmapi.dto.base_model_ import Model
from ulmapi import util


class Cat(Model):
    """NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).

    Do not edit the class manually.
    """

    def __init__(self, cat_id=None, name=None, weight=None, birth_date=None):  # noqa: E501
        """Cat - a model defined in OpenAPI

        :param cat_id: The cat_id of this Cat.  # noqa: E501
        :type cat_id: str
        :param name: The name of this Cat.  # noqa: E501
        :type name: str
        :param weight: The weight of this Cat.  # noqa: E501
        :type weight: int
        :param birth_date: The birth_date of this Cat.  # noqa: E501
        :type birth_date: datetime
        """
        self.openapi_types = {
            'cat_id': str,
            'name': str,
            'weight': int,
            'birth_date': datetime
        }

        self.attribute_map = {
            'cat_id': 'cat_id',
            'name': 'name',
            'weight': 'weight',
            'birth_date': 'birth_date'
        }

        self._cat_id = cat_id
        self._name = name
        self._weight = weight
        self._birth_date = birth_date

    @classmethod
    def from_dict(cls, dikt) -> 'Cat':
        """Returns the dict as a model

        :param dikt: A dict.
        :type: dict
        :return: The Cat of this Cat.  # noqa: E501
        :rtype: Cat
        """
        return util.deserialize_model(dikt, cls)

    @property
    def cat_id(self):
        """Gets the cat_id of this Cat.


        :return: The cat_id of this Cat.
        :rtype: str
        """
        return self._cat_id

    @cat_id.setter
    def cat_id(self, cat_id):
        """Sets the cat_id of this Cat.


        :param cat_id: The cat_id of this Cat.
        :type cat_id: str
        """

        self._cat_id = cat_id

    @property
    def name(self):
        """Gets the name of this Cat.


        :return: The name of this Cat.
        :rtype: str
        """
        return self._name

    @name.setter
    def name(self, name):
        """Sets the name of this Cat.


        :param name: The name of this Cat.
        :type name: str
        """
        if name is None:
            raise ValueError("Invalid value for `name`, must not be `None`")  # noqa: E501

        self._name = name

    @property
    def weight(self):
        """Gets the weight of this Cat.


        :return: The weight of this Cat.
        :rtype: int
        """
        return self._weight

    @weight.setter
    def weight(self, weight):
        """Sets the weight of this Cat.


        :param weight: The weight of this Cat.
        :type weight: int
        """
        if weight is None:
            raise ValueError("Invalid value for `weight`, must not be `None`")  # noqa: E501
        if weight is not None and weight > 100:  # noqa: E501
            raise ValueError("Invalid value for `weight`, must be a value less than or equal to `100`")  # noqa: E501
        if weight is not None and weight < 0:  # noqa: E501
            raise ValueError("Invalid value for `weight`, must be a value greater than or equal to `0`")  # noqa: E501

        self._weight = weight

    @property
    def birth_date(self):
        """Gets the birth_date of this Cat.


        :return: The birth_date of this Cat.
        :rtype: datetime
        """
        return self._birth_date

    @birth_date.setter
    def birth_date(self, birth_date):
        """Sets the birth_date of this Cat.


        :param birth_date: The birth_date of this Cat.
        :type birth_date: datetime
        """
        if birth_date is None:
            raise ValueError("Invalid value for `birth_date`, must not be `None`")  # noqa: E501

        self._birth_date = birth_date
