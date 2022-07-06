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
import {MapsForAddingAccommodation} from '../screens/MapsScreen/MapsForAddingAccommodation';
import {MapsForEditingAccommodation} from '../screens/MapsScreen/MapsForEditingAccommodation';
import {ViewMap} from '../screens/MapsScreen/ViewMap';

const HomeStack = createNativeStackNavigator();
const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator screenOptions={{headerShown: false}}>
      <HomeStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        initialParams={{status: 'Updated!'}}
      />
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
        initialParams={{
          address: '',
          location: {
            longitude: 0,
            latitude: 0,
          },
        }}
      />
      <HomeStack.Screen name="Maps" component={MapsForAddingAccommodation} />
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
        initialParams={{
          address: '',
          location: {
            longitude: 0,
            latitude: 0,
          },
        }}
      />

      <HomeStack.Screen
        name="ViewMap"
        component={ViewMap}
        initialParams={{
          location: {
            longitude: 0,
            latitude: 0,
          },
        }}
      />
      <HomeStack.Screen
        name="MapsEditAccommodation"
        component={MapsForEditingAccommodation}
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
