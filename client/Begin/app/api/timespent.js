import util from "../utility/helper";
import client from "./client";
/*
    @ params:
        - course_id: String
        - newTimeSpent: 
            Object{
                ended_at: Date
                notes: string,
                started_at: Date
            }
            ## Example:
                const newTimeSpent = {
                    ended_at: util.convertDateToString(new Date()),
                    notes: "New Notes 2123",
                    started_at: util.convertDateToString(new Date()),
                };
        - Example: addTimeSpent() in ListingsScreen.js 
*/
const addTimeSpent = (course_id, newTimeSpent) => {
  const endpoint = `/course/${course_id}/timespent`;

  const data = {
    ended_at: util.convertDateToString(newTimeSpent.ended_at),
    notes: "New Notes 2123",
    started_at: util.convertDateToString(newTimeSpent.started_at),
  };

  client.post(endpoint, data);
};

const getTimeSpent = (courseId) => {
  getCourses().then((courses) => {
    const deserializedUserInfo = helper.deserializeGetUserResponse(
      courses.data
    );
    var course = deserializedUserInfo.courses.filter(course => {
      return course.course_id == courseId;
    });
    return course[0].time_spent;
  });
};


const getCourseTotalTimeSpent = (courseId) => {
  getTimeSpent(courseId).then((timeSpents) => {
    var totalDiff = moment()
    timeSpents.forEach( (timeSpent) => {
      const start = moment(timeSpent.started_at)
      const end = moment(timeSpent.ended_at)
      totalDiff.add(moment.duration(end.diff(start)))
    })
    console.log("hello",totalDiff.asHours())
    return totalDiff.asHours()
  });
}

export default {
  addTimeSpent,
  getTimeSpent,
  getCourseTotalTimeSpent
};
