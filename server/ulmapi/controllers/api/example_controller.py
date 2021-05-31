import connexion
import six

from ulmapi.dto.cat import Cat  # noqa: E501
from ulmapi import util


def cat_cat_id_get(cat_id):  # noqa: E501
    """Get cat by id for the user

     # noqa: E501

    :param cat_id: Cat ID
    :type cat_id: str

    :rtype: Cat
    """
    return 'do some magic!'


def cat_cat_id_put(cat_id, cat=None):  # noqa: E501
    """Replace a cat for the user

     # noqa: E501

    :param cat_id: Cat ID
    :type cat_id: str
    :param cat: 
    :type cat: dict | bytes

    :rtype: Cat
    """
    if connexion.request.is_json:
        cat = Cat.from_dict(connexion.request.get_json())  # noqa: E501
    return 'do some magic!'


def cat_get():  # noqa: E501
    """Get all cats for the user

     # noqa: E501


    :rtype: List[Cat]
    """
    return 'do some magic!'


def cat_post(cat=None):  # noqa: E501
    """Create a new cat for the user

     # noqa: E501

    :param cat: 
    :type cat: dict | bytes

    :rtype: Cat
    """
    if connexion.request.is_json:
        cat = Cat.from_dict(connexion.request.get_json())  # noqa: E501
    return 'do some magic!'
