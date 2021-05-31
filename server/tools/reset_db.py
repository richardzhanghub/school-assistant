import datetime
import pprint
import pymongo

from passlib.hash import bcrypt


# Connect to Mongo
admin_username = 'admin'
admin_password = 'zOpaSJpvRcS61vEW'
mongo = pymongo.MongoClient('mongodb://{}:{}@cluster0-shard-00-00.vx0sn.mongodb.net:27017,' \
                            'cluster0-shard-00-01.vx0sn.mongodb.net:27017,' \
                            'cluster0-shard-00-02.vx0sn.mongodb.net:27017/ULM?' \
                            'ssl=true&replicaSet=atlas-iveasl-shard-0&authSource=admin&retryWrites=true&w=majority' \
                            .format(admin_username, admin_password))
db = mongo.ULM

# Drop existing collections
for c in db.list_collections():
    db[c['name']].drop()

# Create new collections
db.create_collection('users')
db.users.create_index([('email', pymongo.ASCENDING)], unique=True)
db.users.create_index([('username', pymongo.ASCENDING)], unique=True)

# Enforce schema on 'users' collection
deliverable_schema = {
    'bsonType': ['object'],
    'required': [
        'deliverable_name',
        'weight',
        'completed'
    ],
    'additionalProperties': False,
    'properties': {
        'deliverable_name': {
            'bsonType': 'string'
        },
        'grade': {
            'bsonType': 'double',
            'minimum': 0,
            'maximum': 100
        },
        'weight': {
            'bsonType': 'double',
            'minimum': 0,
            'maximum': 100
        },
        'due_at': {
            'bsonType': 'date'
        },
        'completed': {
            'bsonType': 'bool'
        }
    }
}
time_spent_schema = {
    'bsonType': ['object'],
    'required': [
        'started_at',
        'ended_at'
    ],
    'additionalProperties': False,
    'properties': {
        'notes': {
            'bsonType': 'string'
        },
        'started_at': {
            'bsonType': 'date'
        },
        'ended_at': {
            'bsonType': 'date'
        }
    }
}
course_schema = {
    'bsonType': ['object'],
    'required': [
        'course_id',
        'deliverables'
    ],
    'additionalProperties': False,
    'properties': {
        'course_id': {
            'bsonType': 'string'
        },
        'course_name': {
            'bsonType': 'string'
        },
        'expected_difficulty': {
            'bsonType': 'int',
            'minimum': 1,
            'maximum': 5
        },
        'desired_grade': {
            'bsonType': 'double',
            'minimum': 0,
            'maximum': 100
        },
        'deliverables': {
            'bsonType': ['array'],
            'minItems': 0,
            'items': deliverable_schema
        },
        'time_spent': {
            'bsonType': ['array'],
            'minItems': 0,
            'items': time_spent_schema
        }
    }
}
user_schema = {
    '$jsonSchema': {
        'bsonType': 'object',
        'required': [
            'email',
            'username',
            'password',
            'joined_at',
            'courses'
        ],
        'additionalProperties': False,
        'properties': {
            '_id': {},
            'email': {
                'bsonType': 'string'
            },
            'username': {
                'bsonType': 'string'
            },
            'password': {
                'bsonType': 'string'
            },
            'joined_at': {
                'bsonType': 'date'
            },
            'courses': {
                'bsonType': ['array'],
                'minItems': 0,
                'items': course_schema
            }
        }
    }
}
db.command({
    'collMod': 'users',
    'validator': user_schema,
    'validationLevel': 'strict'
})

# Insert sample data
user = {
    'email': 'admin@admin.com',
    'username': 'admin',
    'password': bcrypt.using(rounds=8).hash('admin'),
    'joined_at': datetime.datetime(1996, 6, 23),
    'courses': [
        {
            'course_id': 'ECE240',
            'course_name': 'Electronic circuits 1',
            'expected_difficulty': 5,
            'desired_grade': 85.0,
            'deliverables': [
                {
                    'deliverable_name': 'Assignment 1',
                    'grade': 75.0,
                    'weight': 10.0,
                    'due_at': datetime.datetime(1996, 6, 23),
                    'completed': False
                }
            ],
            'time_spent': [
                {
                    'notes': '',
                    'started_at': datetime.datetime(1996, 6, 23),
                    'ended_at': datetime.datetime(1996, 6, 23)
                }
            ]
        }
    ]
}
db.users.insert_one(user)

# Load the user we just inserted
user = db.users.find_one({"username": "admin"})
pretty = pprint.PrettyPrinter(indent=2)
pretty.pprint(user)
