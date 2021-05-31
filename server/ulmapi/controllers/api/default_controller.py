import connexion
import six

from ulmapi.dto.access_token import AccessToken  # noqa: E501
from ulmapi.dto.signup_info import SignupInfo  # noqa: E501
from ulmapi.dto.user_credentials import UserCredentials  # noqa: E501
from ulmapi import util


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
