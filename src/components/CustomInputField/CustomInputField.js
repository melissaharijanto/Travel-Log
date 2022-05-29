import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const CustomInputField = ({ value, setValue, placeholder, secureTextEntry }) => {
    return (
        <View style={ styles.container }>
            <TextInput
                value = { value }
                onChangeText = { setValue }
                placeholder = { placeholder }
                style = { styles.input }
                secureTextEntry = { secureTextEntry } // for passwords
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#E8F3F4',
        width: '100%',
        borderRadius: 10,
        paddingHorizontal: 15,
        marginVertical: 5,
    },
    input: {
        fontFamily: 'Poppins-Regular',
        color: '#3B4949',
    },
});

export default CustomInputField;