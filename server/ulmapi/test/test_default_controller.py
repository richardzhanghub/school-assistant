# coding: utf-8

from __future__ import absolute_import
import unittest

from flask import json
from six import BytesIO

from ulmapi.dto.access_token import AccessToken  # noqa: E501
from ulmapi.dto.cat import Cat  # noqa: E501
from ulmapi.dto.signup_info import SignupInfo  # noqa: E501
from ulmapi.dto.user_credentials import UserCredentials  # noqa: E501
from ulmapi.test import BaseTestCase


class TestDefaultController(BaseTestCase):
    """DefaultController integration test stubs"""

    def test_cat_cat_id_get(self):
        """Test case for cat_cat_id_get

        Get cat by id for the user
        """
        headers = { 
            'Accept': 'application/json',
            'Authorization': 'Bearer special-key',
        }
        response = self.client.open(
            '/api/v1/cat/{cat_id}'.format(cat_id='cat_id_example'),
            method='GET',
            headers=headers)
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_cat_cat_id_put(self):
        """Test case for cat_cat_id_put

        Replace a cat for the user
        """
        cat = {
  "birth_date" : "2000-01-23T04:56:07.000+00:00",
  "cat_id" : "cat_id",
  "name" : "name",
  "weight" : 8
}
        headers = { 
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer special-key',
        }
        response = self.client.open(
            '/api/v1/cat/{cat_id}'.format(cat_id='cat_id_example'),
            method='PUT',
            headers=headers,
            data=json.dumps(cat),
            content_type='application/json')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_cat_get(self):
        """Test case for cat_get

        Get all cats for the user
        """
        headers = { 
            'Accept': 'application/json',
            'Authorization': 'Bearer special-key',
        }
        response = self.client.open(
            '/api/v1/cat',
            method='GET',
            headers=headers)
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_cat_post(self):
        """Test case for cat_post

        Create a new cat for the user
        """
        cat = {
  "birth_date" : "2000-01-23T04:56:07.000+00:00",
  "cat_id" : "cat_id",
  "name" : "name",
  "weight" : 8
}
        headers = { 
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer special-key',
        }
        response = self.client.open(
            '/api/v1/cat',
            method='POST',
            headers=headers,
            data=json.dumps(cat),
            content_type='application/json')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_login_post(self):
        """Test case for login_post

        Exchange username and password for access token
        """
        user_credentials = {
  "password" : "password",
  "username" : "username"
}
        headers = { 
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
        response = self.client.open(
            '/api/v1/login',
            method='POST',
            headers=headers,
            data=json.dumps(user_credentials),
            content_type='application/json')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_signup_post(self):
        """Test case for signup_post

        Creates a new user (signup)
        """
        signup_info = {
  "password" : "password",
  "email" : "email",
  "username" : "username"
}
        headers = { 
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
        response = self.client.open(
            '/api/v1/signup',
            method='POST',
            headers=headers,
            data=json.dumps(signup_info),
            content_type='application/json')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))


if __name__ == '__main__':
    unittest.main()
