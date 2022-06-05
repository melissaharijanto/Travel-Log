import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';


const HomeScreen = () => {

    const user = auth().currentUser;
    const navigation = useNavigation();

    const onGoingBack = () => {
        navigation.navigate("LogIn");
    }

    return (
        <ScrollView>
        <View style = { styles.root }>
        <Text style = { styles.text }> Hi {
            user
            ? user.displayName === null
                ? ''
                : user.displayName
            : '' }!</Text>
        <Text style = { styles.text }> Next Page is WIP ;) </Text>
        <Text style = { styles.text }> Thanks for helping us test this!</Text>

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
        fontSize: 18,
   },
});

export default HomeScreen;