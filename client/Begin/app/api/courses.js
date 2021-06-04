import helper from "../utility/helper";
import client from "./client";
const endpoint = "/user";
const addCourseEndpoint = "/course";
const getCourses = () => {
  //   console.log("hey");
  return client.get(endpoint);
};

const addCourse = (newCourse) => {
  console.log("newCourse", newCourse);
  const data = helper.cleanNewCourseDate(newCourse);
  console.log("newCourse - clean", data);

  return client.post(addCourseEndpoint, data);
};

const addDeliverable = () => {};

const addTimeSpent = (deliverable) => {
  const data = new FormData();
  data.append();
};

export default {
  //   addListing,
  getCourses,
  addCourse,
};
