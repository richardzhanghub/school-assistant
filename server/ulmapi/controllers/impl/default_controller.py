import connexion
import datetime
import flask
import logging

from mongoengine.errors import DoesNotExist, NotUniqueError

from ulmapi.controllers.impl.security_controller_ import hash_password, verify_password, encode_auth_token
from ulmapi.db import models
from ulmapi.dto.access_token import AccessToken
from ulmapi.dto.user_credentials import UserCredentials
from ulmapi.dto.signup_info import SignupInfo
from ulmapi.controllers.util.db_converter import user_info_from_db, user_info_to_db
from ulmapi.dto.schedule_info import ScheduleInfo
from ulmapi.dto.user_info import UserInfo


LOG = logging.getLogger(__name__)


def login_post(credentials=None):  # noqa: E501
    '''Login using username and password

    The user&#39;s credentials are exchanged for a bearer token. # noqa: E501

    :param credentials:
    :type credentials: dict | bytes

    :rtype: AccessToken
    '''
    credentials = UserCredentials.from_dict(connexion.request.get_json())
    # Load a document
    try:
        user = models.User.objects.get(username=credentials.username)
    except DoesNotExist:
        return flask.Response(status=401)
    if not verify_password(credentials.password, user['password']):
        return flask.Response(status=401)
    access_token = encode_auth_token(credentials.username)
    return AccessToken(access_token=access_token)


def schedule_post(schedule_info=None):  # noqa: E501
    """Request generation of a new schedule

     # noqa: E501

    :param schedule_info:
    :type schedule_info: dict | bytes

    :rtype: ScheduleInfo
    """
    if connexion.request.is_json:
        schedule_info = ScheduleInfo.from_dict(connexion.request.get_json())  # noqa: E501


def signup_post(signup_info=None):  # noqa: E501
    '''Creates a new user (signup)

     # noqa: E501

    :param signup_info:
    :type signup_info: dict | bytes

    :rtype: AccessToken
    '''
    signup_info = SignupInfo.from_dict(connexion.request.get_json())
    # Create a new document
    new_user = models.User(email=signup_info.email,
                           username=signup_info.username,
                           password=hash_password(signup_info.password),
                           joined_at=datetime.datetime.utcnow(),
                           courses={})
    try:
        new_user.save()
    except NotUniqueError:
        return ('Both email and username must be unique.', 400)
    return 200


def user_get(user):  # noqa: E501
    """Get user&#39;s information

     # noqa: E501


    :rtype: List[UserInfo]
    """
    LOG.info('The current user is \'%s\'', user)
    try:
        user = models.User.objects.get(username=user)
    except DoesNotExist:
        return flask.Response(status=404)
            
    return user_info_from_db(user)


def user_put(user, user_info=None):  # noqa: E501
    """Update user&#39;s information

     # noqa: E501

    :param user_info: 
    :type user_info: dict | bytes

    :rtype: UserInfo
    """
    user_info = UserInfo.from_dict(connexion.request.get_json())
    try:
        original_user = models.User.objects.get(username=user)
    except DoesNotExist:
        return flask.Response(status=401)

    user_info_to_db(original_user, user_info)
    original_user.save()
