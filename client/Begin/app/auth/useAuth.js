import jwtDecoder from "jwt-decode";
import { useContext } from "react";
import AuthContext from "./context";
import authStorage from "./storage";

export default useAuth = () => {
  const { user, setUser } = useContext(AuthContext);

  const logout = () => {
    setUser(null);
    authStorage.removeToken();
  };

  const login = (authToken) => {
    const user = jwtDecoder(authToken);

    // Upon successful calling Login BE API, set User globally
    setUser(user);

    // Ensure user reload the app, still logged in
    authStorage.storeToken(authToken);
  };

  return { user, login, logout };
};
