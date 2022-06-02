import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
const ProfileScreen = () => {

    const navigation = useNavigation();

    const onGoingBack = () => {
        navigation.goBack();
    }
    return (
        <ScrollView>
        <View style = { styles.root }>
        <Text style = { styles.text }> Placeholder Page for Profile Tab </Text>
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

export default ProfileScreen;