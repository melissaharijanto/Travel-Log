import React, {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import AccommodationRecs from '../screens/RecommendationScreens/AccommodationRecs';
import ActivitiesRecs from '../screens/RecommendationScreens/ActivitiesRecs';
import RestaurantRecs from '../screens/RecommendationScreens/RestaurantRecs';

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
        component={AccommodationRecs}
        initialParams={{id: route.params.id}}
      />
      <Tab.Screen
        name="Restaurants"
        component={RestaurantRecs}
        initialParams={{id: route.params.id}}
      />
      <Tab.Screen
        name="Activities"
        component={ActivitiesRecs}
        initialParams={{id: route.params.id}}
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
