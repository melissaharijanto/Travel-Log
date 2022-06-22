import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const CustomInputField = ({ value, setValue, placeholder, secureTextEntry, maxLength, error, onBlur }) => {
    return (
        <View style={{width:'100%'}}>
            <View style={ styles.container }>
                <TextInput
                    value = { value }
                    onChangeText = { setValue }
                    placeholder = { placeholder }
                    style = { styles.input }
                    secureTextEntry = { secureTextEntry } // for passwords
                    maxLength = { maxLength }
                    onBlur = { onBlur }
                />
            </View>
            { error ?
                <View>
                    <Text style={styles.error}>{error}</Text>
                </View>
            : null
            }
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