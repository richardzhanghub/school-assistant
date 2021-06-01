import { NavigationContainer } from "@react-navigation/native";
import { AppLoading } from "expo";
import React, { useState } from "react";
import AuthContext from "./app/auth/context";
import authStorage from "./app/auth/storage";
import OfflineNotice from "./app/components/OfflineNotice";
import AppNavigator from "./app/navigation/AppNavigator";
import AuthNavigator from "./app/navigation/AuthNavigator";
import navigationTheme from "./app/navigation/navigationTheme";
export default function App() {
  const [user, setUser] = useState();
  const [isReady, setIsReady] = useState(false); // Splash screen handling

  const restoreUser = async () => {
    const user = await authStorage.getUser();
    if (user) setUser(user);
  };

  if (!isReady) {
    return (
      // startAsync is a function we call when the app starts
      // onFinish will be called when startAsync finished
      <AppLoading startAsync={restoreUser} onFinish={() => setIsReady(true)} />
    );
  }
  return (
    // use Context here, so all the components under AuthContext.Provider can access user object, but can't modify it
    // So we pass an object containing two props, user and setUser
    <AuthContext.Provider value={{ user, setUser }}>
      <OfflineNotice />

      <NavigationContainer theme={navigationTheme}>
        {user ? <AppNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
