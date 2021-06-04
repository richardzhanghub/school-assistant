import apiClient from "./client";

const login = (username, password) => {
  return apiClient.post(
    "/login",
    { username, password },
    {
      headers: { "Content-Type": "application/json" },
    }
  );
};

export default {
  login,
};
