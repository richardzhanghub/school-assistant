import connexion
import six

from ulmapi.dto.access_token import AccessToken  # noqa: E501
from ulmapi.dto.deliverable import Deliverable  # noqa: E501
from ulmapi.dto.user_credentials import UserCredentials  # noqa: E501
from ulmapi import util


def deliverable_get():  # noqa: E501
    """Get all deliverables for the user

     # noqa: E501


    :rtype: List[Deliverable]
    """
    return 'do some magic!'


def deliverable_post(deliverable=None):  # noqa: E501
    """Create a new deliverable for the user

     # noqa: E501

    :param deliverable: 
    :type deliverable: dict | bytes

    :rtype: Deliverable
    """
    if connexion.request.is_json:
        deliverable = Deliverable.from_dict(connexion.request.get_json())  # noqa: E501
    return 'do some magic!'


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
