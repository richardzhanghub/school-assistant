#!/usr/bin/env python3

import connexion
import ulmapi

from flask_pymongo import PyMongo
from ulmapi import encoder


def main():
    app = connexion.App(__name__, specification_dir='./openapi/')
    app.app.json_encoder = encoder.JSONEncoder
    app.add_api('openapi.yaml',
                arguments={'title': 'University Life Manager API'},
                pythonic_params=True)
    mongo_username = 'dev'
    mongo_password = 'UuFCpekY8eCxf8m'
    app.app.config['MONGO_URI'] = 'mongodb://{}:{}@cluster0-shard-00-00.vx0sn.mongodb.net:27017,' \
                                  'cluster0-shard-00-01.vx0sn.mongodb.net:27017,' \
                                  'cluster0-shard-00-02.vx0sn.mongodb.net:27017/ULM?' \
                                  'ssl=true&replicaSet=atlas-iveasl-shard-0&authSource=admin&retryWrites=true&w=majority'\
        .format(mongo_username, mongo_password)
    ulmapi.mongo = PyMongo(app.app)
    app.app.config['SECRET_KEY'] = 'UuFCpekY8eCxf8m'
    app.run(port=8080)


if __name__ == '__main__':
    main()
