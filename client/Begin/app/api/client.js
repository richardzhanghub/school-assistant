import { create } from "apisauce";
import authStorage from "../auth/storage";
import cache from "../utility/cache";

const apiClient = create({
  baseURL: "http://10.0.0.103:8080/api/v1/", //Barry's
  //baseURL: "http://192.168.2.12:8080/api/v1/", Teresa's

  // baseURL: "http://localhost:8080/api/v1",
});

apiClient.addAsyncRequestTransform(async (request) => {
  const authToken = await authStorage.getToken();
  console.log("request is: ", request);
  console.log("token is: " + authToken);
  if (!authToken) return;

  userToken = "Bearer " + authToken;
  request.headers["Authorization"] = userToken;
});

const get = apiClient.get;
apiClient.get = async (url, params, axiosConfig) => {
  const response = await get(url, params, axiosConfig);

  if (response.ok) {
    cache.store(url, response.data);
    return response;
  }

  const data = await cache.get(url);
  return data ? { ok: true, data } : response;
};

const post = apiClient.post;
apiClient.post = async (url, data, axiosConfig) => {
  const response = await post(url, data, axiosConfig);

  if (response.ok) {
    return response;
  }
  console.log(response);
};

export default apiClient;
