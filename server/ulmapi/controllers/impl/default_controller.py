import connexion
import datetime
import flask
import logging

from pymongo.errors import DuplicateKeyError

from ulmapi import get_mongo_db
from ulmapi.controllers.impl.security_controller_ import hash_password, verify_password, encode_auth_token
from ulmapi.dto.access_token import AccessToken
from ulmapi.dto.cat import Cat
from ulmapi.dto.user_credentials import UserCredentials
from ulmapi.dto.signup_info import SignupInfo


LOG = logging.getLogger(__name__)


def cat_cat_id_get(user, cat_id):  # noqa: E501
    '''Get cat by id for the user

     # noqa: E501

    :param cat_id: Cat ID
    :type cat_id: str

    :rtype: Cat
    '''
    LOG.info('The current user is \'%s\'', user)
    if cat_id == 'bu3WDwq4qw':
        return Cat(cat_id='bu3WDwq4qw',
                           name='Cat1',
                           weight=20,
                           birth_date=datetime.datetime.utcnow())
    return flask.Response(status=404)


def cat_cat_id_put(user, cat_id, cat=None):  # noqa: E501
    '''Replace a cat for the user

     # noqa: E501

    :param cat_id: Cat ID
    :type cat_id: str
    :param cat:
    :type cat: dict | bytes

    :rtype: Cat
    '''
    LOG.info('The current user is \'%s\'', user)
    if cat_id in ('bu3WDwq4qw', 'x2aaZwq4oq'):
        cat = Cat.from_dict(connexion.request.get_json())  # noqa: E501
        # Update cat in db...
        return cat
    return flask.Response(status=404)


def cat_get(user):  # noqa: E501
    '''Get all cats for the user

     # noqa: E501


    :rtype: List[Cat]
    '''
    LOG.info('The current user is \'%s\'', user)
    return [
        Cat(cat_id='bu3WDwq4qw',
            name='Cat1',
            weight=20,
            birth_date=datetime.datetime.utcnow()),
        Cat(cat_id='x2aaZwq4oq',
            name='Cat2',
            weight=20,
            birth_date=datetime.datetime.utcnow())
    ]


def cat_post(user, cat=None):  # noqa: E501
    '''Create a new cat for the user

     # noqa: E501

    :param cat:
    :type cat: dict | bytes

    :rtype: Cat
    '''
    LOG.info('The current user is \'%s\'', user)
    cat = Cat.from_dict(connexion.request.get_json())
    # Write to db, generate unique id...
    cat.cat_id = 'DZMElXdXzm'
    return (cat, 201)


def login_post(user_credentials=None):  # noqa: E501
    '''Login using username and password

    The user&#39;s credentials are exchanged for a bearer token. # noqa: E501

    :param user_credentials:
    :type user_credentials: dict | bytes

    :rtype: AccessToken
    '''
    user_credentials = UserCredentials.from_dict(connexion.request.get_json())
    user = get_mongo_db().users.find_one({'username': user_credentials.username})
    if user is None or not verify_password(user_credentials.password, user['password']):
        return flask.Response(status=401)
    access_token = encode_auth_token(user_credentials.username)
    return AccessToken(access_token=access_token)



def signup_post(signup_info=None):  # noqa: E501
    '''Creates a new user (signup)

     # noqa: E501

    :param signup_info:
    :type signup_info: dict | bytes

    :rtype: AccessToken
    '''
    signup_info = SignupInfo.from_dict(connexion.request.get_json())
    new_user = {
        'email': signup_info.email,
        'username': signup_info.username,
        'password': hash_password(signup_info.password),
        'joined_at': datetime.datetime.utcnow(),
        'courses': []
    }
    try:
        get_mongo_db().users.insert_one(new_user)
    except DuplicateKeyError:
        return ('Both email and username must be unique.', 400)
    return 200
