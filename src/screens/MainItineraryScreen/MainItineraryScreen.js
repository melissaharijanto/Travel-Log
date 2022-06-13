import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const MainItineraryScreen = () => {

    const navigation = useNavigation();

    const onGoingBack = () => {
        navigation.goBack();
    }

    const navigateToNewDay = () => {
        navigation.navigate("NewDay");
    }

    return (
        <ScrollView>
        <View style = { styles.root }>
        <Text style = { styles.text }> Placeholder Page for Main Itinerary Tab </Text>
        <Pressable onPress={ navigateToNewDay }>
            <Text style={[styles.text, {textDecorationLine: 'underline'}]}>New Day Screen</Text>
        </Pressable>
        </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        paddingHorizontal: '10%',
        paddingTop: '55%',
   },

   text: {
        fontFamily: 'Poppins-SemiBold',
   },
});

export default MainItineraryScreen;