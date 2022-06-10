import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Pressable } from 'react-native';
import Logo from '../../../assets/images/logo2.png';
import CustomInputField from '../../components/CustomInputField';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';

const SetNewPasswordScreen = () => {
    const [password, setPassword] = useState();
    const [confirmPassword, confirmNewPassword] = useState();

    const navigation = useNavigation();

    const onBackToLogInPressed = () => {
        navigation.navigate("SignIn");
    }; // to be changed once other screens are made!

    const onSubmitPressed= () => {
        console.warn("Your password has been reset!")
        navigation.navigate("SignIn");
    }; // to be changed once other screens are made!

    return (
        <ScrollView>
        <View style = { styles.root }>
            <Image
                source={ Logo }
                style={ styles.logo }
                resizeMode="contain"
            />

            <Text style = { styles.text }>Reset Your Password</Text>



            <CustomInputField
                placeholder = "Enter your new password"
                value = { password }
                setValue = { setPassword }
                secureTextEntry
            />

            <CustomInputField
                placeholder = "Confirm your password"
                value = { confirmPassword }
                setValue = { confirmNewPassword }
                secureTextEntry
            />

            <CustomButton
                text = "Submit"
                onPress = { onSubmitPressed }
                type = "PRIMARY"
            />

            <CustomButton
                text = {
                    <Text style = {{
                        textDecorationLine: 'underline',
                        fontSize: 11,}}>Back to Log In
                    </Text>
                }
                onPress = { onBackToLogInPressed }
                type = "SECONDARY"
            />


        </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        paddingHorizontal: '10%',
        paddingTop: '50%',
        backgroundColor: '#70DAD3'
    },
    logo: {
        width: '75%',
        maxWidth: 600,
        maxHeight: 140,
    },
    text: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 16,
        marginBottom: 5
    },
});

export default SetNewPasswordScreen;