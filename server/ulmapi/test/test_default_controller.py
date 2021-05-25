# coding: utf-8

from __future__ import absolute_import
import unittest

from flask import json
from six import BytesIO

from ulmapi.test import BaseTestCase


class TestDefaultController(BaseTestCase):
    """DefaultController integration test stubs"""

    def test_example_get(self):
        """Test case for example_get

        Server example operation
        """
        headers = { 
            'Authorization': 'Bearer special-key',
        }
        response = self.client.open(
            '/api/v1/example',
            method='GET',
            headers=headers)
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_ping_get(self):
        """Test case for ping_get

        Server heartbeat operation
        """
        headers = { 
        }
        response = self.client.open(
            '/api/v1/ping',
            method='GET',
            headers=headers)
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))


if __name__ == '__main__':
    unittest.main()
