import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import AccommodationRecs from '../screens/RecommendationScreens/AccommodationRecs';
import ActivitiesRecs from '../screens/RecommendationScreens/ActivitiesRecs';
import RestaurantRecs from '../screens/RecommendationScreens/RestaurantRecs';

const Tab = createMaterialTopTabNavigator();
const TopBarNavigator = () => {
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
      }}>
      <Tab.Screen name="Accommodation" component={AccommodationRecs} />
      <Tab.Screen name="Restaurants" component={RestaurantRecs} />
      <Tab.Screen name="Activities" component={ActivitiesRecs} />
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
