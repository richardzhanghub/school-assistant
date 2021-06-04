import helper from "../utility/helper";
import client from "./client";

const endpoint = "/user";

const getCourses = () => {
  //   console.log("hey");
  return client.get(endpoint);
};

/*
    @ params:
        - course_id: String
        - newTimeSpent: 
            Object {
                ended_at: "2000-01-23T04:56:07Z",           // call helper.convertDateToString(Date date)
                notes: "notes1",
                started_at: "2000-01-23T04:56:07Z",         // call helper.convertDateToString(Date date)
            }
        - Example: addTimeSpent() in ListingsScreen.js 
*/
const addTimeSpent = (course_id, newTimeSpent) => {
  getCourses().then((courses) => {
    // Parse data to JS structure
    const deserializedUserInfo = helper.deserializeGetUserResponse(
      courses.data
    );

    // console.log("deserializedUserInfo", deserializedUserInfo);
    const newData = helper.addTimeSpent(
      deserializedUserInfo,
      course_id,
      newTimeSpent
    );

    // Serialize data to match BE endpoint
    const serializedUserInfo = helper.serializePutUserRequestData(newData);

    // console.log("FINAL", serializedUserInfo);

    return client.put(endpoint, serializedUserInfo);
  });
};

export default {
  addTimeSpent,
};
