from flask import Blueprint
from flask_mongoengine import MongoEngine

mongo_db = MongoEngine()

flask_blueprint = Blueprint('ulmapi_blueprint', __name__)
