import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Back from 'react-native-vector-icons/Feather';
import DeleteIcon from 'react-native-vector-icons/Feather';

export const HeaderWithoutDeleteIcon = ({onPress, flexValue, text}) => {
  return (
    <View style={styles.header}>
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
    <View style={styles.header}>
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
});
