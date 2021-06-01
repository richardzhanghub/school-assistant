import apiClient from "./client";

const register = (userInfo) => apiClient.post("/signup", userInfo);

export default { register };
