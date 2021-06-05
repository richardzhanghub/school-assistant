import helper from "../utility/helper";
import client from "./client";
const endpoint = "/user";
const addCourseEndpoint = "/course";
const getCourses = () => {
  //   console.log("hey");
  return client.get(endpoint);
};

const addCourse = (newCourse) => {
  const data = helper.cleanNewCourseDate(newCourse);

  return client.post(addCourseEndpoint, data);
};

export default {
  getCourses,
  addCourse,
};
