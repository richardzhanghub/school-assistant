from flask_mongoengine import MongoEngine

mongo_db = MongoEngine()

flask_app = None
def get_flask_app():
    return flask_app
