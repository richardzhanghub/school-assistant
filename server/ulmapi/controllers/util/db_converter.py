from ulmapi.db import models
from ulmapi.dto.course_info import CourseInfo
from ulmapi.dto.deliverable_info import DeliverableInfo
from ulmapi.dto.time_spent_info import TimeSpentInfo
from ulmapi.dto.user_info import UserInfo

def time_spent_from_course(course):
    time_spent = []
    for ts in course.time_spent:
        time_spent.append(TimeSpentInfo(notes=ts.notes, started_at=ts.started_at, ended_at=ts.ended_at))
    return time_spent


def deliverables_from_course(course):
    deliverables = {}
    for (deliverable_key, deliverable_db) in course.deliverables.items():
        deliverables[deliverable_key] = deliverable_info_from_db(deliverable_db)
    return deliverables

def deliverable_info_from_db(deliverable_db):
    return DeliverableInfo(deliverable_name=deliverable_db.deliverable_name,
                           grade=deliverable_db.grade,
                           weight=deliverable_db.weight,
                           due_at=deliverable_db.due_at,
                           completed=deliverable_db.completed)

def courses_from_user(user):
    courses = {}
    for (course_key, course_db) in user.courses.items():
        courses[course_key] = course_info_from_db(course_db)
    return courses  

def course_info_from_db(course_db):
    deliverables = deliverables_from_course(course_db)
    time_spent = time_spent_from_course(course_db)
    return CourseInfo(course_id=course_db.course_id,
                      course_name=course_db.course_name,
                      expected_difficulty=course_db.expected_difficulty,
                      desired_grade=course_db.desired_grade,
                      deliverables=deliverables, time_spent=time_spent)

def user_info_from_db(user):
    courses = courses_from_user(user)
    return UserInfo(username=user.username, email=user.email, joined_at=user.joined_at, courses=courses)


def user_info_to_db(user_db, user_info):
    user_db.email = user_info.email
    user_db.username = user_info.username

    user_db.courses.clear()

    if user_info.courses is not None:
        for key, val in user_info.courses.items():
            user_db.courses[key] = course_info_to_db(val)


def course_info_to_db(course_info):
    new_deliverables = {}
    if course_info.deliverables is not None:
        for key, val in course_info.deliverables.items():
            new_deliverables[key] = deliverable_info_to_db(val)

    new_time_spents = []
    if course_info.time_spent is not None:
        for time_spent in course_info.time_spent:
            new_time_spents.append(time_spent_to_db(time_spent))

    new_course = models.Course(course_id=course_info.course_id,
                              course_name=course_info.course_name,
                              expected_difficulty=course_info.expected_difficulty,
                              desired_grade=course_info.desired_grade,
                              deliverables=new_deliverables,
                              time_spent=new_time_spents)
    return new_course


def deliverable_info_to_db(deliverable_info):
    new_deliverable = models.Deliverable(deliverable_name=deliverable_info.deliverable_name,
                                         grade=deliverable_info.grade,
                                         weight=deliverable_info.weight,
                                         due_at=deliverable_info.due_at,
                                         completed=deliverable_info.completed)
    return new_deliverable


def time_spent_to_db(time_spent_info):
    new_time_spent = models.TimeSpent(notes=time_spent_info.notes,
                                      started_at=time_spent_info.started_at,
                                      ended_at=time_spent_info.ended_at)
    return new_time_spent