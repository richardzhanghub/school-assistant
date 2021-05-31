#!/usr/bin/env python3

import connexion
import logging
import ulmapi

from ulmapi import encoder


def main():
    # Configure logging
    logging.basicConfig(level=logging.INFO)

    # Configure routes from OpenAPI file
    app = connexion.App(__name__, specification_dir='./openapi/')
    app.app.register_blueprint(ulmapi.flask_blueprint)
    app.app.json_encoder = encoder.JSONEncoder
    app.add_api('openapi.yaml',
                arguments={'title': 'University Life Manager API'},
                pythonic_params=True)

    # Configure MongoDB
    mongo_username = 'dev'
    mongo_password = 'UuFCpekY8eCxf8m'
    app.app.config['MONGODB_HOST'] = 'mongodb://{}:{}@cluster0-shard-00-00.vx0sn.mongodb.net:27017,' \
                                  'cluster0-shard-00-01.vx0sn.mongodb.net:27017,' \
                                  'cluster0-shard-00-02.vx0sn.mongodb.net:27017/ULM?' \
                                  'ssl=true&replicaSet=atlas-iveasl-shard-0&authSource=admin&retryWrites=true&w=majority' \
        .format(mongo_username, mongo_password)
    ulmapi.mongo_db.init_app(app.app)

    # Configure JWT
    app.app.config['SECRET_KEY'] = '2uFCpekY8eCxf8m2'
    ulmapi.flask_app = app.app

    app.run(port=8080)


if __name__ == '__main__':
    main()
