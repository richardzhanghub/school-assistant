import connexion
import datetime
import flask
import logging

from ulmapi.dto.cat import Cat


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