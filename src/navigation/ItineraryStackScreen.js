import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainItineraryScreen from '../screens/MainItineraryScreen';
import NewDayScreen from '../screens/NewDayScreen';
import EditItineraryScreenFromItinerary from '../screens/EditItineraryScreenFromItinerary';
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

const ItineraryStack = createNativeStackNavigator();
const ItineraryStackScreen = () => {
  return (
    <ItineraryStack.Navigator screenOptions={{headerShown: false}}>
      <ItineraryStack.Screen
        name="MainItinerary"
        component={MainItineraryScreen}
      />
      <ItineraryStack.Screen name="NewDay" component={NewDayScreen} />
      <ItineraryStack.Screen
        name="EditItinerary"
        component={EditItineraryScreenFromItinerary}
      />
      <ItineraryStack.Screen
        name="OpenItinerary"
        component={OpeningItineraryScreen}
      />

      <ItineraryStack.Screen
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
      <ItineraryStack.Screen name="AddActivity" component={AddActivityScreen} />
      <ItineraryStack.Screen
        name="AddTransport"
        component={AddTransportScreen}
      />
      <ItineraryStack.Screen
        name="ViewAccommodation"
        component={ViewAccommodationScreen}
      />
      <ItineraryStack.Screen
        name="ViewActivity"
        component={ViewActivityScreen}
      />
      <ItineraryStack.Screen
        name="ViewTransport"
        component={ViewTransportScreen}
      />
      <ItineraryStack.Screen
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
      <ItineraryStack.Screen
        name="MapsEditAccommodation"
        component={MapsForEditingAccommodation}
      />
      <ItineraryStack.Screen
        name="ViewMap"
        component={ViewMap}
        initialParams={{
          location: {
            longitude: 0,
            latitude: 0,
          },
        }}
      />
      <ItineraryStack.Screen
        name="Maps"
        component={MapsForAddingAccommodation}
      />
      <ItineraryStack.Screen
        name="EditActivity"
        component={EditActivityScreen}
      />
      <ItineraryStack.Screen
        name="NewAccommodation"
        component={NewAccommodationScreen}
      />
      <ItineraryStack.Screen
        name="EditTransport"
        component={EditTransportScreen}
      />
    </ItineraryStack.Navigator>
  );
};

export default ItineraryStackScreen;
