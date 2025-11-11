import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import MainTabs from './MainTabs';
import BreakfastScreen from '../screens/BreakfastScreen';
import LunchScreen from '../screens/LunchScreen';
import DinnerScreen from '../screens/DinnerScreen';
import BeverageScreen from '../screens/BeverageScreen';
import DessertScreen from '../screens/DessertScreen';
import MenuScreen from '../screens/MenuScreen';
import OrderTrackingScreen from '../screens/OrderTrackingScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Welcome"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Main" component={MainTabs} />
        <Stack.Screen name="Breakfast" component={BreakfastScreen} />
        <Stack.Screen name="Lunch" component={LunchScreen} />
        <Stack.Screen name="Dinner" component={DinnerScreen} />
        <Stack.Screen name="Beverage" component={BeverageScreen} />
        <Stack.Screen name="Dessert" component={DessertScreen} />
        <Stack.Screen name="Menu" component={MenuScreen} />
        <Stack.Screen name="OrderTracking" component={OrderTrackingScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}