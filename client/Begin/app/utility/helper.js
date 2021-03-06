class Course {
  constructor(
    course_id,
    course_name,
    deliverables,
    desired_grade,
    expected_difficulty,
    time_spent
  ) {
    this.course_id = course_id;
    this.course_name = course_name;
    this.deliverables = deliverables;
    this.desired_grade = desired_grade;
    this.expected_difficulty = expected_difficulty;
    this.time_spent = time_spent;
  }
}

class Deliverable {
  constructor(deliverable_name, completed, due_at, grade, weight) {
    this.deliverable_name = deliverable_name;
    this.completed = completed;
    this.due_at = due_at;
    this.grade = grade;
    this.weight = weight;
  }
}

const helpers = {
  // @param: an array of courses
  serializePutUserRequestData: function (data) {
    return serialize(data);
  },
  deserializeGetUserResponse: function (data) {
    // console.log("Raw data: ", data);
    data.courses = _getCourses(data.courses);

    // console.log("cleaned data", data);
    return data;
  },
  cleanNewCourseDate: function (newCourse) {
    const result = {
      course_id: newCourse.courseNumber,
      course_name: newCourse.courseName,
      desired_grade: parseInt(newCourse.grade, 10),
      expected_difficulty: parseInt(newCourse.difficulty, 10),
    };

    return result;
  },
  cleanEditCourseDate: function (editedCourse) {
    const result = {
      course_id: editedCourse.courseNumber,
      course_name: editedCourse.courseName,
      desired_grade: parseInt(editedCourse.grade, 10),
      expected_difficulty: parseInt(editedCourse.difficulty, 10),
    };
    return result;
  },
  addCourse: function (deserializedUserInfo, newCourse) {
    deserializedUserInfo.courses.push({
      course_id: newCourse.courseNumber,
      course_name: newCourse.courseName,
      deliverables: [],
      desired_grade: parseInt(newCourse.grade, 10),
      expected_difficulty: parseInt(newCourse.difficulty, 10),
      time_spent: [],
    });
    return deserializedUserInfo;
  },
  addDeliverable: function (deserializedUserInfo, newDeliverable) {},
  addTimeSpent: function (deserializedUserInfo, course_id, newTimeSpent) {
    var arr_time_spent = getTimeSpent(deserializedUserInfo, course_id);
    if (arr_time_spent !== "NOT_FOUND") {
      arr_time_spent.push(newTimeSpent);

      const t = convertArrayOfObjToObj(
        deserializedUserInfo.courses,
        "course_id"
      );
      t[course_id].time_spent = arr_time_spent;
    }

    return deserializedUserInfo;
  },
  getCourses: function (data) {
    return getCourses(data.courses);
  },
  serializeScheduleData: function (newSchedule) {
    newSchedule.starts_at = this.convertDateToString(newSchedule.starts_at);
    newSchedule.ends_at = this.convertDateToString(newSchedule.ends_at);
    newSchedule.max_study_hours = parseInt(newSchedule.max_study_hours);
    console.log("newSchedule", newSchedule);

    return newSchedule;
  },
  convertDateToString: function (date) {
    console.log("** Date is", _convertDateToString(date));
    return _convertDateToString(date);
  },
  getScheduleForProgressVisual: function (getUserResp) {
    var current_schedule = getUserResp.current_schedule;
    return current_schedule;
  },
  getDataForProgressVisual: function (getUserResp) {
    const courses = getUserResp.courses;

    const res = [];
    for (const p in courses) {
      const _o = courses[p];
      res.push(_o);
    }
    return res;
  },
  getCoursesForPieChart: function (getUserResp) {},

  getTimeSpentsForWeeklyChart: function (getUserResp) {},

  formatDate: function (date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("/");
  },
};

const serialize = (data) => {
  const arr = data.courses;
  const t = convertArrayOfObjToObj(arr, "course_id");
  for (const p in t) {
    const deliverables = t[p].deliverables;

    const _deliverables = convertArrayOfObjToObj(
      deliverables,
      "deliverable_name"
    );

    t[p].deliverables = _deliverables;
    // console.log("Hello World", t[p]);
  }

  //   console.log("**Converted", t);
  data.courses = t;
  return data;
};

const convertArrayOfObjToObj = (arr, key) => {
  const obj = {};
  for (var i = 0; i < arr.length; ++i) {
    const element = arr[i];
    const objKey = element[key];
    obj[objKey] = element;
  }
  return obj;
};

// return an array of Course objects
const _getCourses = (coursesObj) => {
  _convertDateToString(new Date());

  // Array of Course objects
  const coursesArr = [];
  for (const p in coursesObj) {
    const obj = coursesObj[p];

    const deliverablesArr = getDeliverables(obj.deliverables);
    const course = {
      course_id: obj.course_id,
      course_name: obj.course_name,
      deliverables: deliverablesArr,
      desired_grade: obj.desired_grade,
      expected_difficulty: obj.expected_difficulty,
      time_spent: obj.time_spent,
    };

    coursesArr.push(course);
  }

  return coursesArr;
};

function _convertDateToString(date) {
  return date.toISOString();
}

function convertStringToDate(s) {
  var b = s.split(/\D+/);
  return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
}

function getDeliverables(obj) {
  const res = [];
  for (const p in obj) {
    const o = obj[p];

    const deliverable_name = o.deliverable_name;
    const completed = o.completed;
    const due_at = o.due_at;
    const grade = o.grade;
    const weight = o.weight;

    res.push(
      {
        deliverable_name: deliverable_name,
        completed: completed,
        due_at: due_at,
        grade: grade,
        weight: weight,
      }
      //   new Deliverable(deliverable_name, completed, due_at, grade, weight)
    );
  }

  return res;
}

function getTimeSpent(deserializedUserInfo, _course_id) {
  const courses = deserializedUserInfo.courses;
  for (var i = 0; i < courses.length; ++i) {
    const course = courses[i];
    const course_id = course.course_id;
    if (course_id === _course_id) {
      return course.time_spent;
    }
  }
  return "NOT_FOUND";
}

export default helpers;
