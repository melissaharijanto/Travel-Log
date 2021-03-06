import React from 'react';
import {Image, View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Back from 'react-native-vector-icons/Feather';
import DeleteIcon from 'react-native-vector-icons/Feather';
import Logo from '../../../assets/images/logo3.png';

export const HeaderWithoutDeleteIcon = ({onPress, flexValue, text}) => {
  return (
    <View style={styles.header} testID="header container">
      <Back
        size={35}
        name="chevron-left"
        color="#808080"
        onPress={onPress}
        style={{
          flex: 1,
          paddingTop: 2,
        }}
      />
      <Text style={[styles.headerText, {flex: flexValue}]}>{text}</Text>
    </View>
  );
};

export const HeaderWithDeleteIcon = ({back, deleting, flexValue, text}) => {
  return (
    <View style={styles.header} testID="header container">
      <Back
        size={35}
        name="chevron-left"
        color="#808080"
        onPress={back}
        style={{
          flex: 1,
          paddingTop: 2,
        }}
      />
      <Text style={[styles.headerText, {flex: flexValue}]}>{text}</Text>

      <DeleteIcon
        name="trash-2"
        size={25}
        color="#808080"
        onPress={deleting}
        style={{
          paddingRight: 20,
        }}
      />
    </View>
  );
};

export const HomeHeader = ({onPress, uri, name}) => {
  return (
    <View style={styles.horizontal} testID="align">
      <View style={styles.homeHeader} testID="container">
        <Text style={styles.welcome}>Welcome back to Travel Log,</Text>
        <Text style={styles.title}>{name}!</Text>
      </View>
      <TouchableOpacity onPress={onPress}>
        <Image source={uri} style={styles.pfp} accessibilityRole="image" />
      </TouchableOpacity>
    </View>
  );
};

export const LogoOnlyHeader = ({borderBottomWidth}) => {
  return (
    <View
      style={[styles.logoHeader, {borderBottomWidth: borderBottomWidth}]}
      testID="container">
      <Image
        source={Logo}
        style={styles.logo}
        resizeMode="contain"
        accessibilityRole="image"
      />
    </View>
  );
};
const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
    height: 65,
    width: '100%',
    paddingLeft: 10,
    elevation: 15,
    shadowColor: '#70D9D3',
    shadowOpacity: 1,
  },
  headerText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 26,
    color: '#3B4949',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    paddingTop: 9,
  },
  logoHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    height: 65,
    width: '100%',
    paddingLeft: 10,
    elevation: 15,
    shadowColor: '#70D9D3',
    shadowOpacity: 1,
    borderBottomColor: '#BBC6D0',
  },
  logo: {
    width: '50%',
    maxWidth: 700,
    maxHeight: 200,
  },
  homeHeader: {
    paddingRight: 30,
  },
  horizontal: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingBottom: '3%',
    paddingHorizontal: '7%',
  },
  pfp: {
    borderRadius: 60 / 2,
    width: 60,
    height: 60,
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 26,
    color: '#3B4949',
  },
  welcome: {
    fontFamily: 'Poppins-Regular',
    fontSize: 18,
    color: '#6C6C6C',
  },
});
