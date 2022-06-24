import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import KeyboardAvoidingWrapper from '../../components/KeyboardAvoidingWrapper/KeyboardAvoidingWrapper';

const MainItineraryScreen = () => {

    const navigation = useNavigation();

    const onGoingBack = () => {
        navigation.goBack();
    }

    const navigateToNewDay = () => {
        navigation.navigate("NewDay");
    }

    return (
        <KeyboardAvoidingWrapper backgroundColor='#FFFFFF'>
            <View style = { styles.root }>
                <Text style = { styles.text }> Placeholder Page for Main Itinerary Tab </Text>
            </View>
        </KeyboardAvoidingWrapper>
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