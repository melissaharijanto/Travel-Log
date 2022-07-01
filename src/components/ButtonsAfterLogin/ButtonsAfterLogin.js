import React from 'react';
import {Text, StyleSheet, Pressable} from 'react-native';
import Document from 'react-native-vector-icons/Ionicons';
import ImageIcon from 'react-native-vector-icons/FontAwesome';

export const ReusableButton = ({onPress, text}) => {
  return (
    <Pressable onPress={onPress} style={styles.button}>
      <Text style={styles.buttonText}>{text}</Text>
    </Pressable>
  );
};

export const UploadFiles = ({onPress}) => {
  return (
    <Pressable onPress={onPress} style={styles.button}>
      <Document
        name="document-outline"
        size={20}
        color="white"
        style={{
          paddingLeft: '1%',
        }}
      />
      <Text style={styles.buttonText}>Upload Files</Text>
    </Pressable>
  );
};

export const UploadImages = ({onPress}) => {
  return (
    <Pressable onPress={onPress} style={styles.button}>
      <ImageIcon
        name="image"
        size={18}
        color="white"
        style={{
          paddingHorizontal: '1%',
        }}
      />

      <Text style={styles.buttonText}>Upload Image</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 5,
    backgroundColor: '#70DAD3',
    borderRadius: 4,
    marginTop: 10,
    marginBottom: 8,
  },
  buttonText: {
    fontFamily: 'Poppins-Medium',
    color: 'white',
    paddingHorizontal: '2%',
    paddingTop: '1%',
  },
});
