import datetime
import jwt
import logging

from passlib.hash import bcrypt
from ulmapi import get_flask_app


LOG = logging.getLogger(__name__)


def hash_password(password, rounds=8):
    return bcrypt.using(rounds=rounds).hash(password)


def verify_password(password, hash):
    return bcrypt.verify(password, hash)


def info_from_bearerAuth(token):
    """
    Check and retrieve authentication information from custom bearer token.
    Returned value will be passed in 'token_info' parameter of your operation function, if there is one.
    'sub' or 'uid' will be set in 'user' parameter of your operation function, if there is one.

    :param token Token provided by Authorization header
    :type token: str
    :return: Decoded token information or None if token is invalid
    :rtype: dict | None
    """
    try:
        payload = jwt.decode(token, get_flask_app().config.get('SECRET_KEY'), algorithms=['HS256'])
        return {'uid': payload['sub']}
    except jwt.ExpiredSignatureError:
        LOG.info('Token %s is expired', token)
        return None
    except jwt.InvalidTokenError:
        LOG.info('Token %s is invalid', token)
        return None

def encode_auth_token(user_id):
    """
    Generates the Auth Token
    :return: string
    """
    try:
        payload = {
            'exp': datetime.datetime.utcnow() + datetime.timedelta(days=1, seconds=0),
            'iat': datetime.datetime.utcnow(),
            'sub': user_id
        }
        return jwt.encode(payload, get_flask_app().config.get('SECRET_KEY'), algorithm='HS256')
    except Exception as e:
        print(e)
        return e
