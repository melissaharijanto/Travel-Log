import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import MainItineraryScreen from '../screens/MainItineraryScreen';
import NewDayScreen from '../screens/NewDayScreen';
import NewItineraryScreen from '../screens/NewItineraryScreen';
import ProfileScreen from '../screens/ProfileScreen';
import EditItineraryScreen from '../screens/EditItineraryScreen/EditItineraryScreen';
import HomeIcon from 'react-native-vector-icons/Entypo';
import ItineraryIcon from 'react-native-vector-icons/MaterialIcons';
import ProfileIcon from 'react-native-vector-icons/FontAwesome';

const Tab = createBottomTabNavigator();

const HomeStack = createNativeStackNavigator();
const HomeStackScreen = () => {
    return (
    <HomeStack.Navigator screenOptions={{headerShown: false}}>
        <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
        <HomeStack.Screen name="NewItinerary" component={NewItineraryScreen} />
    </HomeStack.Navigator>
    );
}

const ItineraryStack = createNativeStackNavigator();
const ItineraryStackScreen = () => {
    return (
    <ItineraryStack.Navigator screenOptions={{headerShown: false}}>
        <ItineraryStack.Screen name="MainItinerary" component={MainItineraryScreen} />
        <ItineraryStack.Screen name="NewDay" component={NewDayScreen} />
        <ItineraryStack.Screen name="EditItinerary" component={EditItineraryScreen} />
    </ItineraryStack.Navigator>
    );
}

const BottomTabNavigator = () => {
    return(
        <Tab.Navigator
            screenOptions = {{
                tabBarShowLabel: false,
                headerShown: false,
                style: {
                    position: 'absolute',
                    height: 75,
                }
            }}
        >
            <Tab.Screen name = "Home"
                component = {HomeStackScreen}
                options = {{
                    tabBarIcon: ({focused}) => (
                        <View style={ styles.root }>
                            <HomeIcon
                                size={20}
                                name="home"
                                color= { focused ? "#3B4949" : "#94C2C6" }
                            />
                            <Text
                                style={[styles.text, {
                                color: focused ? "#3B4949" : "#94C2C6"
                            }]}>Home</Text>
                        </View>
                    )
                }}
            />

            <Tab.Screen
                name = "Itinerary"
                component = {ItineraryStackScreen}
                options = {{
                    tabBarIcon: ({focused}) => (
                        <View style={ styles.root }>
                            <ItineraryIcon
                                size={20}
                                name="assignment"
                                color= { focused ? "#3B4949" : "#94C2C6" }
                            />
                            <Text
                                style={[styles.text, {
                                color: focused ? "#3B4949" : "#94C2C6"
                            }]}>Itinerary</Text>
                        </View>
                    )
                }}
            />
            <Tab.Screen
                name = "Profile"
                component = {ProfileScreen}
                options = {{
                    tabBarIcon: ({focused}) => (
                        <View style={ styles.root }>
                            <ProfileIcon
                                size={20}
                                name="user"
                                color= { focused ? "#3B4949" : "#94C2C6" }
                            />
                            <Text
                                style={[styles.text, {
                                color: focused ? "#3B4949" : "#94C2C6"
                            }]}>Profile</Text>
                        </View>
                    )
                }}/>
        </Tab.Navigator>

    )
}

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
    },
    text: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 11,
    },
})

export default BottomTabNavigator;