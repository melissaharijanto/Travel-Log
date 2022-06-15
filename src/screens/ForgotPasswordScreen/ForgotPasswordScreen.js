import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Alert } from 'react-native';
import Logo from '../../../assets/images/logo2.png';
import CustomInputField from '../../components/CustomInputField';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { sendPasswordResetEmail, firebase } from '@react-native-firebase/auth';


const ForgotPasswordScreen = () => {
    const [email, setEmail] = useState('');
    const navigation = useNavigation();


    const onBackToLogInPressed = () => {
        navigation.navigate("SignIn");
    };

    return (
        <View style = { styles.root }>
            <Image
                source={ Logo }
                style={ styles.logo }
                resizeMode="contain"
            />

            <Text style = { styles.text }>Reset Your Password!</Text>

            <CustomInputField
                placeholder = "Your Account Email"
                value = { email }
                setValue = { setEmail }
            />

            <CustomButton
                text = "Send Password Reset Email"
                onPress = { async () => {
                    if (email == null || email === '') {
                        Alert.alert('Email field empty', 'Please enter your email.');
                    } else {
                    await firebase.auth().sendPasswordResetEmail(email)
                        .then(() => {
                            Alert.alert('Success!', 'A password reset email has been sent.');
                            navigation.goBack();
                        })
                        .catch(error => {
                            Alert.alert("Error", error.message)
                        })
                }}}
                type = "PRIMARY"
            />

            <CustomButton
                text= {
                <Text style = {{
                    textDecorationLine: 'underline',
                    fontSize: 11,}}>Back to Log In
                </Text>
                }
                onPress = { onBackToLogInPressed }
                type = "SECONDARY"
            />


        </View>
    );
};

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        paddingHorizontal: '10%',
        paddingTop: '55%',
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

export default ForgotPasswordScreen;