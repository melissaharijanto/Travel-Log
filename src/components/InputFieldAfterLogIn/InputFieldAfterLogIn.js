import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const InputFieldAfterLogIn = ({ value, setValue, placeholder, secureTextEntry, maxLength }) => {
    return (
        <View style={ styles.container }>
            <TextInput
                value = { value }
                onChangeText = { setValue }
                placeholder = { placeholder }
                style = { styles.input }
                secureTextEntry = { secureTextEntry } // for passwords
                maxLength = { maxLength }
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width: '100%',
        borderRadius: 10,
        paddingHorizontal: 15,
        marginVertical: 8,
        borderColor: '#F1F1F1',
        borderWidth: 1.5,
    },
    input: {
        fontFamily: 'Poppins-Medium',
        color: '#3B4949',
        fontSize: 15,
    },
});

export default InputFieldAfterLogIn;