import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import LandingScreen from '../screens/LandingScreen';
import auth from '@react-native-firebase/auth';
import AuthNavigator from './Stack';
import LoggedInNavigator from './LoggedInStack';

const Navigation = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) {
      setInitializing(false);
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) {
    return <LandingScreen />;
  }

  return (
    <NavigationContainer>
      {user ? <LoggedInNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default Navigation;
