import React, {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import RecommendationScreen from '../screens/RecommendationScreen';

const Tab = createMaterialTopTabNavigator();
const TopBarNavigator = ({route}) => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerBackVisible: true,
        headerTitle: '',
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: 'Poppins-SemiBold',
          textTransform: 'none',
        },
        tabBarActiveTintColor: '#3B4949',
        tabBarInactiveTintColor: '#94C2C6',
        tabBarIndicatorStyle: {
          backgroundColor: '#3B4949',
        },
      }}>
      <Tab.Screen
        name="Accommodation"
        component={RecommendationScreen}
        initialParams={{id: route.params.id, type: 'accommodations'}}
      />
      <Tab.Screen
        name="Restaurants"
        component={RecommendationScreen}
        initialParams={{id: route.params.id, type: 'restaurants'}}
      />
      <Tab.Screen
        name="Activities"
        component={RecommendationScreen}
        initialParams={{id: route.params.id, type: 'activities'}}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 11,
  },
});
export default TopBarNavigator;
