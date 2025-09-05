import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "./src/screens/LoginScreen";
import DeliveryDashboard from "./src/screens/DeliveryDashboard";
import SignupScreen from "./src/screens/SignupScreen";
// import RescheduleScreen from "./src/screens/RescheduleScreen";
import RestaurantDashboard from "./src/screens/RestaurantDashboard";
import SmartAlerts from "./src/screens/SmartAlerts";
import ChatbotScreen from "./src/screens/ChatbotScreen";
import HomeScreen from "./src/screens/HomeScreen";
// import ProfileScreen from "./src/screens/ProfileScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        {/* <Stack.Screen name="Reschedule" component={RescheduleScreen} /> */}
        <Stack.Screen name="Restaurant" component={RestaurantDashboard} />
        <Stack.Screen name="Alerts" component={SmartAlerts} />
        <Stack.Screen name="Chatbot" component={ChatbotScreen} />
        {/* <Stack.Screen name="Profile" component={ProfileScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
