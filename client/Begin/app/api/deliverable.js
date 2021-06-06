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

  return client.post(endpoint, data);
};

const editDeliverable = (course_id, changedDeliverable) => {
  const data = {
    completed: changedDeliverable.completed,
    deliverable_id: changedDeliverable.deliverable_id,
    deliverable_name: changedDeliverable.deliverable_name,
    due_at: util.convertDateToString(changedDeliverable.due_at),
    grade: changedDeliverable.grade,
    weight: changedDeliverable.weight,
  }
  const endpoint = `/course/${course_id}/deliverable/${data.deliverable_id}`;
  return client.put(endpoint, data)
}

export default {
  addDeliverable,
  editDeliverable
};
