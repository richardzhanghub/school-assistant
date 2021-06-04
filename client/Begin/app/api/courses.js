import helper from "../utility/helper";
import client from "./client";

const endpoint = "/user";

const getCourses = () => {
  //   console.log("hey");
  return client.get(endpoint);
};

const addCourse = (newCourse) => {
  getCourses().then((courses) => {
    console.log("newCourse", newCourse);

    // Parse data to JS structure
    const deserializedUserInfo = helper.deserializeGetUserResponse(
      courses.data
    );
    // console.log("Hey", deserializedUserInfo);
    const newData = helper.addCourse(deserializedUserInfo, newCourse);

    // Serialize data to match BE endpoint
    const serializedUserInfo = helper.serializePutUserRequestData(newData);

    console.log("FINAL", serializedUserInfo);

    return client.put(endpoint, serializedUserInfo);
  });
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
