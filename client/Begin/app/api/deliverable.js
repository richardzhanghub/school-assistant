import util from "../utility/helper";
import client from "./client";
/*
    @ params:
        - course_id: String
        - newDeliverable: 
            Object{
                completed: boolean,
                deliverable_id: String,
                deliverable_name: String,
                due_at: Date,
                grade: Integer,
                weight: Integer,
            }
            ## Example:
                const newDeliverable = {
                    completed: true,
                    deliverable_id: "ECE406",
                    deliverable_name: "Lab 2",
                    due_at: new Date(),
                    grade: 14,
                    weight: 60,
                };
        - Example: addDeliverable() in ListingsScreen.js 
*/
const addDeliverable = (course_id, newDeliverable) => {
  const endpoint = `/course/${course_id}/deliverable`;

  const data = {
    completed: newDeliverable.completed,
    deliverable_id: newDeliverable.deliverable_id,
    deliverable_name: newDeliverable.deliverable_name,
    due_at: util.convertDateToString(newDeliverable.due_at),
    grade: newDeliverable.grade,
    weight: newDeliverable.weight,
  };

  console.log("data", data);
  client.post(endpoint, data);
};

export default {
  addDeliverable,
};
