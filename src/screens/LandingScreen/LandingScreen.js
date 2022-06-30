import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import Logo from '../../../assets/images/logo2.png';

/**
 * Anonymous class that renders Landing Screen,
 * Will appear when the app is first initialized
 * and user authentication is ongoing.
 *
 * @returns Render of the Landing Screen.
 */
const LandingScreen = () => {
  return (
    <View style={styles.root}>
      <Image source={Logo} style={styles.logo} resizeMode="contain" />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    paddingHorizontal: '10%',
    paddingTop: '70%',
    backgroundColor: '#70DAD3',
  },
  logo: {
    width: '80%',
    maxWidth: 700,
    maxHeight: 200,
  },
});

export default LandingScreen;
