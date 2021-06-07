import helper from "../utility/helper";
import client from "./client";
const endpoint = "/user";
const courseEndpoint = "/course";
const getCourses = () => {
  return client.get(endpoint);
};

const addCourse = (newCourse) => {
  const data = helper.cleanNewCourseDate(newCourse);

  return client.post(courseEndpoint, data);
};

const editCourse = (changedCourse) => {
  const data = helper.cleanEditCourseDate(changedCourse);
  const endpoint = `/course/${data.course_id}`;
  return client.put(endpoint, data);
};

export default {
  getCourses,
  addCourse,
  editCourse,
};
