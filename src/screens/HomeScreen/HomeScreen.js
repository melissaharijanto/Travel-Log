import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {

    const navigation = useNavigation();

    const onGoingBack = () => {
        navigation.goBack();
    }
    return (
        <ScrollView>
        <View style = { styles.root }>
        <Text style = { styles.text }> Next Page is WIP ;) </Text>
        <Text style = { styles.text }> Thanks for helping us test this! </Text>

        <Pressable onPress = { onGoingBack }>
            <Text style = { [styles.text, { textDecorationLine: 'underline' }] }>
            Click here to go back.
            </Text>
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
        fontSize: 18,
   },
});

export default HomeScreen;