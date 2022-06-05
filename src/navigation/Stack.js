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
import LandingScreen from '../screens/LandingScreen';
import BottomTabNavigator from './BottomTabNavigator';
import EditProfileScreen from '../screens/EditProfileScreen';
const Stack = createNativeStackNavigator();

const Navigator = () => {
    return (

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

        </Stack.Navigator>

    )
}

export default Navigator;