import * as React from "react";
import {
  NavigationContainer,
  createNavigationContainerRef,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../Screen/Login/Login";
import DashboardScreen from "../Screen/Dashboard/DashboardScreen";
import Splashscreen from "../Screen/SplashScreen/SplashScreen";

const Navigation = () => {
  const Stack = createNativeStackNavigator();
  const navigationRef = createNavigationContainerRef();
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName='Splashscreen'
      >
        <Stack.Screen name='Splashscreen' component={Splashscreen} />
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='DashboardScreen' component={DashboardScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
