// TODO: BE config goes here
// const firebaseConfig = {
//   apiKey: "***",
//   authDomain: "***",
//   databaseURL: "***",
//   projectId: "***",
//   storageBucket: "***",
//   messagingSenderId: "***",
//   appId: "***",
//   measurementId: "***"
// };
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { Component } from 'react';
import LandingScreen from './components/auth/Landing';
import LogInScreen from './components/auth/Login';
import RegisterScreen from './components/auth/Register';

const Stack = createStackNavigator();


export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    }
  }

  // componentDidMount() {
  //   // firebase.auth().onAuthStateChanged((user) => {
  //     // if (!user) {
  //     //   this.setState({
  //     //     loggedIn: false,
  //     //     loaded: true,
  //     //   })
  //     // } else {
  //     //   this.setState({
  //     //     loggedIn: true,
  //     //     loaded: true,
  //     //   })
  //     // }
  //   // })
  // }
  render() {
    const { loggedIn, loaded } = this.state;
    // if (!loaded) {
    //   return (
    //     <View style={{ flex: 1, justifyContent: 'center' }}>
    //       <Text>Loading</Text>
    //     </View>
    //   )
    // }

    // if (!loggedIn) {
    //   return (
    //     <NavigationContainer>
    //       <Stack.Navigator initialRouteName="Landing">
    //         <Stack.Screen name="Landing" component={LandingScreen} options={{ headerShown: false }} />
    //         <Stack.Screen name="Register" component={RegisterScreen} />
    //       </Stack.Navigator>
    //     </NavigationContainer>
    //   );
    // }

    // return (
    //   <View style={{ flex: 1, justifyContent: 'center' }}>
    //     <Text>User is logged in</Text>
    //   </View>
    // )

    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Landing">
          <Stack.Screen name="Landing" component={LandingScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Login" component={LogInScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App