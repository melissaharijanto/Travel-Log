import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const AccommodationMainTab = ({onPress}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.container}
      testID="button">
      <View style={{paddingLeft: 13}}>
        <Text style={styles.text}>Accommodation</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    width: '100%',
    height: 70,
    padding: 8,
    marginTop: 10,
    marginBottom: 5,
    borderColor: '#70D9D350',
    borderWidth: 2,
  },
  text: {
    fontFamily: 'Poppins-ExtraBold',
    color: '#3B4949',
    fontSize: 24,
    paddingTop: 5,
  },
});
export default AccommodationMainTab;
