import math
from ortools.algorithms import pywrapknapsack_solver as ks


def calculate_current_course_grade(course_db):
    weight_achieved = 0
    weight_graded = 0
    if course_db.deliverables is not None:
        for deliverable_name, deliverable_db in course_db.deliverables.items():
            if deliverable_db.grade is not None:
                weight_achieved += (deliverable_db.grade / 100) * deliverable_db.weight
                weight_graded += deliverable_db.weight
    if weight_graded == 0:
        return course_db.desired_grade
    return weight_achieved / weight_graded


def create_time_allocations(schedule_info, user_db):
    # Cost of 1 corresponds to a 15 minute session
    #
    # Maximum number of hours to schedule over the period
    num_hours_per_unit_cost = 0.25
    cost_limit = schedule_info.max_study_hours / num_hours_per_unit_cost
    item_cost = 1

    # Each course tries to use the whole cost budget
    num_items_per_course = int(cost_limit // item_cost)

    # Total number of items across all courses
    num_courses = len(user_db.courses)
    total_num_items = num_items_per_course * num_courses

    solver = ks.KnapsackSolver(ks.KnapsackSolver.KNAPSACK_MULTIDIMENSION_BRANCH_AND_BOUND_SOLVER, 'ScheduleGenerator')
    item_weights = [[item_cost for _ in range(total_num_items)]]

    item_courses = []
    item_values = []
    for course_id, course_db in user_db.courses.items():
        for i in range(num_items_per_course):
            # Prioritize courses where the current grade is less than the desired grade and de-prioritize courses where
            # the current grade is better than the desired grade
            current_course_grade = calculate_current_course_grade(course_db)
            priority_factor = 100 - (current_course_grade - course_db.desired_grade)
            # TODO: Change decay rate based on expected difficulty
            item_value = priority_factor * math.exp(-0.025 * i)
            item_values.append(item_value)
            item_courses.append(course_id)

    cost_limits = [cost_limit]
    solver.Init(item_values, item_weights, cost_limits)
    solver.Solve()

    packed_items = []
    packed_weights = []
    total_weight = 0
    for i in range(total_num_items):
        if solver.BestSolutionContains(i):
            packed_items.append(i)
            packed_weights.append(item_weights[0][i])
            total_weight += item_weights[0][i]

    time_allocations = {}
    for course_id in user_db.courses:
        time_allocations[course_id] = 0
    for idx in range(len(packed_items)):
        i = packed_items[idx]
        course_id = item_courses[i]
        time_allocations[course_id] += num_hours_per_unit_cost
    return time_allocations