import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import BottomTabNavigator from './BottomTabNavigator';
import LandingScreen from '../screens/LandingScreen';
import auth from '@react-native-firebase/auth'
import Navigator from './Stack';


const Navigation = () => {
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();

      // Handle user state changes
      function onAuthStateChanged(user) {
        setUser(user);
        if (initializing) setInitializing(false);
      }

      useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
      }, []);

      if (initializing) return <LandingScreen />;

      return (
      <NavigationContainer>
        { user ? <BottomTabNavigator/> : <Navigator/> }
      </NavigationContainer>
      );
}

export default Navigation;