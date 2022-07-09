import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import FeaturedScreen from '../screens/FeaturedScreen/FeaturedScreen';
import NewDayScreen from '../screens/NewDayScreen';
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
import TopBarNavigator from './TopBarNavigator';

const FeaturedStack = createNativeStackNavigator();
const FeaturedStackScreen = () => {
  return (
    <FeaturedStack.Navigator screenOptions={{headerShown: false}}>
      <FeaturedStack.Screen name="FeaturedScreen" component={FeaturedScreen} />
      <FeaturedStack.Screen
        name="OpenItinerary"
        component={OpeningItineraryScreen}
      />
      <FeaturedStack.Screen
        name="EditItinerary"
        component={EditItineraryScreen}
      />
      <FeaturedStack.Screen name="NewDay" component={NewDayScreen} />
      <FeaturedStack.Screen
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
      <FeaturedStack.Screen
        name="Maps"
        component={MapsForAddingAccommodation}
      />
      <FeaturedStack.Screen name="AddActivity" component={AddActivityScreen} />
      <FeaturedStack.Screen
        name="AddTransport"
        component={AddTransportScreen}
      />
      <FeaturedStack.Screen
        name="ViewAccommodation"
        component={ViewAccommodationScreen}
      />
      <FeaturedStack.Screen
        name="ViewActivity"
        component={ViewActivityScreen}
      />
      <FeaturedStack.Screen
        name="ViewTransport"
        component={ViewTransportScreen}
      />
      <FeaturedStack.Screen
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

      <FeaturedStack.Screen
        name="ViewMap"
        component={ViewMap}
        initialParams={{
          location: {
            longitude: 0,
            latitude: 0,
          },
        }}
      />
      <FeaturedStack.Screen
        name="MapsEditAccommodation"
        component={MapsForEditingAccommodation}
      />

      <FeaturedStack.Screen
        name="EditActivity"
        component={EditActivityScreen}
      />
      <FeaturedStack.Screen
        name="NewAccommodation"
        component={NewAccommodationScreen}
      />
      <FeaturedStack.Screen
        name="EditTransport"
        component={EditTransportScreen}
      />
      <FeaturedStack.Screen
        name="Recommendations"
        component={TopBarNavigator}
        options={{
          headerShown: true,
        }}
      />
    </FeaturedStack.Navigator>
  );
};

export default FeaturedStackScreen;
