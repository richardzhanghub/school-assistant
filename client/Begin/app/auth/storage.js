import * as SecureStore from "expo-secure-store";
import jwtDecoder from "jwt-decode";
const key = "authToken";
const storeToken = async (authToken) => {
  try {
    await SecureStore.setItemAsync(key, authToken);
  } catch (error) {
    console.log("Error", error);
  }
};

const getToken = async () => {
  try {
    return await SecureStore.getItemAsync(key);
  } catch (error) {
    console.log("Error getting the auth token ", error);
  }
};

const getUser = async () => {
  const token = await getToken();

  if (token) {
    return jwtDecoder(token);
  } else {
    return null;
  }
};

const removeToken = async () => {
  try {
    return await SecureStore.deleteItemAsync(key);
  } catch (error) {
    console.log("Error removing the auth token ", error);
  }
};

export default { getToken, getUser, removeToken, storeToken };
