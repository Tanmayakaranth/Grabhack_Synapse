import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';

// Import all screens
import HomeScreen from './src/screens/HomeScreen';
import RecipientUnavailableScreen from './src/screens/RecipientUnavailableScreen';
import OverloadedRestaurantScreen from './src/screens/OverloadedRestaurantScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';

// Recipient Unavailable Feature Screens
import PreCheckAvailabilityScreen from './src/screens/RecipientUnavailable/PreCheckAvailabilityScreen';
import TrustedHandoverScreen from './src/screens/RecipientUnavailable/TrustedHandoverScreen';
import SmartReroutingScreen from './src/screens/RecipientUnavailable/SmartReroutingScreen';
import AutoRescheduleScreen from './src/screens/RecipientUnavailable/AutoRescheduleScreen';
import AIVoiceConnectScreen from './src/screens/RecipientUnavailable/AIVoiceConnectScreen';

// Overloaded Restaurant Feature Screens
import PreOrderScreen from './src/screens/OverloadedRestaurant/PreOrderScreen';
import AtCheckoutScreen from './src/screens/OverloadedRestaurant/AtCheckoutScreen';
import OrderPlacedScreen from './src/screens/OverloadedRestaurant/OrderPlacedScreen';
import PostOrderScreen from './src/screens/OverloadedRestaurant/PostOrderScreen';
import ChatbotScreen from './src/screens/OverloadedRestaurant/ChatbotScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator 
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#f59e0b',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        {/* Authentication Screens */}
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ title: 'Login', headerShown: false }}
        />
        <Stack.Screen 
          name="Signup" 
          component={SignupScreen} 
          options={{ title: 'Sign Up', headerShown: false }}
        />

        {/* Main Navigation */}
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'Smart Delivery Solutions' }}
        />
        <Stack.Screen 
          name="RecipientUnavailable" 
          component={RecipientUnavailableScreen} 
          options={{ title: 'Recipient Unavailable' }}
        />
        <Stack.Screen 
          name="OverloadedRestaurant" 
          component={OverloadedRestaurantScreen} 
          options={{ title: 'Overloaded Restaurant' }}
        />

        {/* Recipient Unavailable Feature Screens */}
        <Stack.Screen 
          name="PreCheckAvailability" 
          component={PreCheckAvailabilityScreen} 
          options={{ title: 'Pre-Check Availability' }}
        />
        <Stack.Screen 
          name="TrustedHandover" 
          component={TrustedHandoverScreen} 
          options={{ title: 'Trusted Handover' }}
        />
        <Stack.Screen 
          name="SmartRerouting" 
          component={SmartReroutingScreen} 
          options={{ title: 'Smart Re-routing' }}
        />
        <Stack.Screen 
          name="AutoReschedule" 
          component={AutoRescheduleScreen} 
          options={{ title: 'Auto Reschedule' }}
        />
        <Stack.Screen 
          name="AIVoiceConnect" 
          component={AIVoiceConnectScreen} 
          options={{ title: 'AI Voice Connect' }}
        />

        {/* Overloaded Restaurant Feature Screens */}
        <Stack.Screen 
          name="PreOrder" 
          component={PreOrderScreen} 
          options={{ title: 'Pre-Order (Precaution)' }}
        />
        <Stack.Screen 
          name="AtCheckout" 
          component={AtCheckoutScreen} 
          options={{ title: 'At Checkout' }}
        />
        <Stack.Screen 
          name="OrderPlaced" 
          component={OrderPlacedScreen} 
          options={{ title: 'Order Placed' }}
        />
        <Stack.Screen 
          name="PostOrder" 
          component={PostOrderScreen} 
          options={{ title: 'Post-Order' }}
        />
        <Stack.Screen 
          name="Chatbot" 
          component={ChatbotScreen} 
          options={{ title: 'Chatbot Assistant' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}