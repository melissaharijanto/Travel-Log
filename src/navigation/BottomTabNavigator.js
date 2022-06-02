import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import MainItineraryScreen from '../screens/MainItineraryScreen';
import ProfileScreen from '../screens/ProfileScreen';
import HomeIcon from 'react-native-vector-icons/Entypo';
import ItineraryIcon from 'react-native-vector-icons/MaterialIcons';
import ProfileIcon from 'react-native-vector-icons/FontAwesome';

const Tab = createBottomTabNavigator();



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
                component = {HomeScreen}
                options = {{
                    tabBarIcon: ({focused}) => (
                        <View style={ styles.root }>
                            <HomeIcon
                                size={20}
                                name="home"
                                color= { focused ? "#3B4949" : "#94C2C6" }
                            />
                            <Text style={ styles.text }>Home</Text>
                        </View>
                    )
                }}
            />

            <Tab.Screen
                name = "Itinerary"
                component = {MainItineraryScreen}
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