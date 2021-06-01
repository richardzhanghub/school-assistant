import React, { useState } from "react";
import { StyleSheet } from "react-native";
import * as Yup from "yup";
import authApi from "../api/auth";
import usersApi from "../api/users";
import useAuth from "../auth/useAuth";
import {
  ErrorMessage,
  Form,
  FormField,
  SubmitButton,
} from "../components/forms";
import Screen from "../components/Screen";
import useApi from "../hooks/useApi";

const validationSchema = Yup.object().shape({
  username: Yup.string().required().label("Username"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

function RegisterScreen() {
  const registerApi = useApi(usersApi.register);
  const loginApi = useApi(authApi.login);
  const auth = useAuth();
  const [error, setError] = useState();

  const handleSubmit = async (userInfo) => {
    const result = await registerApi.request(userInfo);
    // const result = await authAPI.login(username, password);
    console.log("result is:", result);
    if (!result.ok) {
      console.log("Sign Up NOT OK");
      if (result.data) setError(result.data.error);
      else {
        setError("An unexpected error occurred.");
        console.log(result);
      }
      return;
    }
    console.log("OK");

    try {
      console.log("username ", userInfo.username);
      console.log("password ", userInfo.password);
      const result = await loginApi.request(
        userInfo.username,
        userInfo.password
      );

      const authToken = result.data.access_token;
      auth.login(authToken);
    } catch (error) {
      console.log("LogIn Failed a", error);
    }
  };

  return (
    <>
      <Screen style={styles.container}>
        <Form
          initialValues={{ username: "", email: "", password: "" }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <ErrorMessage error={error} visible={error} />
          <FormField
            autoCorrect={false}
            icon="account"
            name="username"
            placeholder="Username"
          />
          <FormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="email"
            keyboardType="email-address"
            name="email"
            placeholder="Email"
            textContentType="emailAddress"
          />
          <FormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="lock"
            name="password"
            placeholder="Password"
            secureTextEntry
            textContentType="password"
          />
          <SubmitButton title="Register" />
        </Form>
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default RegisterScreen;
