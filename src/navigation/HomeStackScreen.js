import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import NewDayScreen from '../screens/NewDayScreen';
import NewItineraryScreen from '../screens/NewItineraryScreen';
import EditItineraryScreen from '../screens/EditItineraryScreen/EditItineraryScreen';
import OpeningItineraryScreen from '../screens/OpeningItineraryScreen';
import AddAccommodationScreen from '../screens/AddAccommodationScreen';
import AddActivityScreen from '../screens/AddActivityScreen';
import AddTransportScreen from '../screens/AddTransportScreen';
import ViewAccommodationScreen from '../screens/ViewAccommodationScreen/ViewAccommodationScreen';
import ViewActivityScreen from '../screens/ViewActivityScreen';
import ViewTransportScreen from '../screens/ViewTransportScreen';
import EditAccommodationScreen from '../screens/EditAccommodationScreen';
import EditActivityScreen from '../screens/EditActivityScreen';
import NewAccommodationScreen from '../screens/NewAccommodationScreen';
import EditTransportScreen from '../screens/EditTransportScreen';

const HomeStack = createNativeStackNavigator();
const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator screenOptions={{headerShown: false}}>
      <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
      <HomeStack.Screen name="NewItinerary" component={NewItineraryScreen} />
      <HomeStack.Screen
        name="OpenItinerary"
        component={OpeningItineraryScreen}
      />
      <HomeStack.Screen name="EditItinerary" component={EditItineraryScreen} />
      <HomeStack.Screen name="NewDay" component={NewDayScreen} />
      <HomeStack.Screen
        name="AddAccommodation"
        component={AddAccommodationScreen}
      />
      <HomeStack.Screen name="AddActivity" component={AddActivityScreen} />
      <HomeStack.Screen name="AddTransport" component={AddTransportScreen} />
      <HomeStack.Screen
        name="ViewAccommodation"
        component={ViewAccommodationScreen}
      />
      <HomeStack.Screen name="ViewActivity" component={ViewActivityScreen} />
      <HomeStack.Screen name="ViewTransport" component={ViewTransportScreen} />
      <HomeStack.Screen
        name="EditAccommodation"
        component={EditAccommodationScreen}
      />
      <HomeStack.Screen name="EditActivity" component={EditActivityScreen} />
      <HomeStack.Screen
        name="NewAccommodation"
        component={NewAccommodationScreen}
      />
      <HomeStack.Screen name="EditTransport" component={EditTransportScreen} />
    </HomeStack.Navigator>
  );
};

export default HomeStackScreen;
