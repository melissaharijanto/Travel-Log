import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

const CustomButton = ({ onPress, text, type }) => {
    return (
        <Pressable onPress= { onPress } style={ [styles.container , styles[`container_${type}`]] }>
            <Text style = { [styles.text, styles[`text_${type}`]] }>
            { text }
            </Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        borderRadius: 50,
        padding: 12,
        marginVertical: 5,
        alignItems: 'center',
    },

    container_PRIMARY: { // container for the log in/sign up button
        backgroundColor: '#17A8A0',
    },

    container_SECONDARY: {}, // container for forget password button

    container_TERTIARY: { // container for everything aft the log in button
        backgroundColor: '#70D9D3',
    },

    text_SECONDARY: {
        color: '#3B4949',
        fontFamily: 'Poppins-Regular',
        marginVertical: 5,
    },

    text_PRIMARY: {
        color: 'white',
        fontFamily: 'Poppins-SemiBold',
    },

    text_TERTIARY: {
            color: 'white',
            fontFamily: 'Poppins-SemiBold',
    },

});

export default CustomButton;