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

export default {
  addTimeSpent,
};
