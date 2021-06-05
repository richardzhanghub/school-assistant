import helper from "../utility/helper";
import client from "./client";
const endpoint = "/schedule";

const getSchedule = (newSchedule) => {
  const data = helper.serializeScheduleData(newSchedule);

  return client.post(endpoint, data);
};

export default {
  getSchedule,
};
