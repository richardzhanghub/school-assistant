import connexion
import datetime
import flask

from ulmapi.dto.access_token import AccessToken
from ulmapi.dto.deliverable import Deliverable
from ulmapi.dto.user_credentials import UserCredentials


def deliverable_get(user):  # noqa: E501
    """Get all deliverables for the user

     # noqa: E501


    :rtype: List[Deliverable]
    """
    # Read from db...
    return [
        Deliverable(course_id="ece498b",
                    weight=20,
                    duedate=datetime.datetime.utcnow()),
        Deliverable(course_id="ece406",
                    weight=75,
                    duedate=datetime.datetime.utcnow())
    ]


def deliverable_post(deliverable=None):  # noqa: E501
    """Create a new deliverable for the user

     # noqa: E501

    :param deliverable:
    :type deliverable: dict | bytes

    :rtype: Deliverable
    """
    deliverable = Deliverable.from_dict(connexion.request.get_json())
    # Write to db...
    return deliverable


def login_post(user_credentials=None):  # noqa: E501
    """Login using username and password

    The user&#39;s credentials are exchanged for a bearer token. # noqa: E501

    :param user_credentials:
    :type user_credentials: dict | bytes

    :rtype: AccessToken
    """
    user_credentials = UserCredentials.from_dict(connexion.request.get_json())
    if (user_credentials.username, user_credentials.password) == ("admin", "admin"):
        return AccessToken(access_token="admin_bearer_token")
    return flask.Response(status=401)