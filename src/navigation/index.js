import React from 'react';
import { View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import ConfirmCodeScreen from '../screens/ConfirmCodeScreen';
import SetNewPasswordScreen from '../screens/SetNewPasswordScreen';
import HomeScreen from '../screens/HomeScreen';
import MainItineraryScreen from '../screens/MainItineraryScreen';
import ProfileScreen from '../screens/ProfileScreen';
import BottomTabNavigator from './BottomTabNavigator';
const Stack = createNativeStackNavigator();

const Navigation = () => {
    return (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name = "SignIn"
                component={SignInScreen}
            />
            <Stack.Screen name = "SignUp"
                component={SignUpScreen}
            />
            <Stack.Screen name = "ForgotPassword"
                component={ForgotPasswordScreen}
            />
            <Stack.Screen name = "ConfirmCode"
                component={ConfirmCodeScreen}
            />
            <Stack.Screen name = "SetNewPassword"
                component={SetNewPasswordScreen}
            />
            <Stack.Screen name = "HomeWithBottomTab"
                component={BottomTabNavigator}
            />


        </Stack.Navigator>
    </NavigationContainer>
    )
}

export default Navigation;