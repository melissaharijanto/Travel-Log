import React from 'react';
import {Text, Pressable, StyleSheet} from 'react-native';

const CustomButton = ({onPress, text, type}) => {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.container, styles[`container_${type}`]]}
      testID="button">
      <Text style={[styles.text, styles[`text_${type}`]]}>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 50,
    padding: 12,
    marginVertical: 5,
    alignItems: 'center',
  },
  container_PRIMARY: {
    // container for the log in/sign up button
    backgroundColor: '#17A8A0',
  },
  container_SECONDARY: {}, // container for forget password button
  container_TERTIARY: {
    // container for everything aft the log in button
    backgroundColor: '#70D9D3',
    elevation: 4,
    elevation: 10,
    shadowColor: '#70D9D3',
    shadowOffset: {
      width: 0,
      height: 0,
      shadowOpacity: 1.0,
    },
  },
  container_QUATERNARY: {
    // container for everything aft the log in button
    backgroundColor: 'white',
    borderColor: '#70D9D3',
    borderWidth: 1,
    elevation: 10,
    shadowColor: '#70D9D3',
    shadowOffset: {
      width: 0,
      height: 0,
      shadowOpacity: 1.0,
    },
  },
  container_QUINARY: {
    backgroundColor: '#94C2C6',
    borderRadius: 11,
  },
  text: {},
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
  text_QUATERNARY: {
    // container for everything aft the log in button
    color: '#70D9D3',
    fontFamily: 'Poppins-Regular',
  },
  text_QUINARY: {
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
    color: 'white',
  },
});

export default CustomButton;
