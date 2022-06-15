import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import SetNewPasswordScreen from '../screens/SetNewPasswordScreen';

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
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

            <Stack.Screen name = "SetNewPassword"
                component={SetNewPasswordScreen}
            />

        </Stack.Navigator>

    )
}

export default AuthNavigator;