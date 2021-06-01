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
    for (deliverable_key, deliverable) in course.deliverables.items():
        deliverables[deliverable_key] = DeliverableInfo(deliverable_name=deliverable.deliverable_name, grade=deliverable.grade, weight=deliverable.weight, due_at=deliverable.due_at, completed=deliverable.completed)
    return deliverables


def courses_from_user(user):
    courses = {}
    for (course_key, course) in user.courses.items():
        deliverables = deliverables_from_course(course)
        time_spent = time_spent_from_course(course)
        courses[course_key] = CourseInfo(course_id=course.course_id, course_name=course.course_name, expected_difficulty=course.expected_difficulty, desired_grade=course.desired_grade, deliverables=deliverables, time_spent=time_spent)
    return courses  


def user_info_from_db(user):
    courses = courses_from_user(user)
    return UserInfo(username=user.username, email=user.email, joined_at=user.joined_at, courses=courses)


def user_info_to_db(original_user, updated_val):
    original_user.email = updated_val.email
    original_user.username = updated_val.username

    original_user.courses.clear()

    for key, val in updated_val.courses.items():
        original_user.courses[key] = course_info_to_db(val)


def course_info_to_db(course_info):
    new_deliverables = {}
    for key, val in course_info.deliverables.items():
        new_deliverables[key] = deliverable_info_to_db(val)

    new_time_spents = []
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