from ulmapi import mongo_db


class Deliverable(mongo_db.EmbeddedDocument):
    deliverable_name = mongo_db.StringField(required=True)
    grade = mongo_db.FloatField(min_value=0,
                                max_value=100)
    weight = mongo_db.FloatField(min_value=0,
                                 max_value=100,
                                 required=True)
    due_at = mongo_db.DateTimeField(required=True)
    completed = mongo_db.BooleanField(required=True)


class TimeSpent(mongo_db.EmbeddedDocument):
    notes = mongo_db.StringField()
    started_at = mongo_db.DateTimeField(required=True)
    ended_at = mongo_db.DateTimeField(required=True)


class Course(mongo_db.EmbeddedDocument):
    course_id = mongo_db.StringField(required=True)
    course_name = mongo_db.StringField(required=True)
    expected_difficulty = mongo_db.IntField(required=True,
                                            min_value=1,
                                            max_value=5)
    desired_grade = mongo_db.FloatField(min_value=0,
                                        max_value=100,
                                        required=True)
    deliverables = mongo_db.MapField(mongo_db.EmbeddedDocumentField(Deliverable))
    time_spent = mongo_db.ListField(mongo_db.EmbeddedDocumentField(TimeSpent))


class User(mongo_db.Document):
    email = mongo_db.StringField(required=True, max_length=120, unique=True)
    username = mongo_db.StringField(required=True, unique=True)
    password = mongo_db.StringField(required=True)
    joined_at = mongo_db.DateTimeField(required=True)
    courses = mongo_db.MapField(mongo_db.EmbeddedDocumentField(Course))
