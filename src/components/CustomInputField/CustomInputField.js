import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';

const CustomInputField = ({
  value,
  setValue,
  placeholder,
  secureTextEntry,
  maxLength,
  error,
  onBlur,
}) => {
  return (
    <View style={{width: '100%'}}>
      <View style={styles.container} testID="container">
        <TextInput
          value={value}
          onChangeText={setValue}
          placeholder={placeholder}
          placeholderTextColor="#808080"
          style={styles.input}
          secureTextEntry={secureTextEntry} // for passwords
          maxLength={maxLength}
          onBlur={onBlur}
          testID="text input"
        />
      </View>
      {error ? (
        <View>
          <Text style={styles.error} testID="error">
            {error}
          </Text>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E8F3F4',
    width: '100%',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginVertical: 5,
  },
  error: {
    color: '#a3160b',
    fontFamily: 'Poppins-Italic',
    fontSize: 12,
    paddingLeft: 10,
  },
  input: {
    fontFamily: 'Poppins-Regular',
    color: '#3B4949',
  },
});

export default CustomInputField;
