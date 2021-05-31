from passlib.hash import bcrypt


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
    # TODO(Richard): Verify token and link it with user
    if token == "admin_bearer_token":
        return {'uid': 'admin_user_id'}
    return None

