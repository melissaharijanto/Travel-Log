import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import Logo from '../../../assets/images/logo2.png';
import CustomInputField from '../../components/CustomInputField';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';

const SignInScreen = () => {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const navigation = useNavigation();

    const onLogInPressed = () => {
        navigation.navigate("Home");
    }; // to be changed once other screens are made!

    const forgotPasswordPressed = () => {
        navigation.navigate('ForgotPassword');
    }; // to be changed once other screens are made!

    const onSignUpPressed = () => {
        navigation.navigate('SignUp');
    }; // to be changed once other screens are made!

    return (
        <ScrollView>
        <View style = {styles.root}>
            <Image
                source={ Logo }
                style={ styles.logo }
                resizeMode="contain"
            />

            <CustomInputField
                placeholder = "Username"
                value = { username }
                setValue = { setUsername }
            />

            <CustomInputField
                placeholder = "Password"
                value = { password }
                setValue = { setPassword }
                secureTextEntry
            />

            <CustomButton
                text = "Log In"
                onPress = { onLogInPressed }
                type = "PRIMARY"
            />

            <CustomButton
                text = <Text style = {{
                            textDecorationLine: 'underline',
                            fontSize: 11,}}>Forgot Password?
                       </Text>
                onPress = { forgotPasswordPressed }
                type = "SECONDARY"
            />

            <CustomButton
                text = <Text style = {{ fontSize: 12, }}>Don't have an account?
                       <Text style = {{ fontSize: 12, }}> </Text>
                       <Text
                            style = {{
                            fontFamily: 'Poppins-SemiBold',
                            textDecorationLine: 'underline',
                            fontSize: 12,
                            }}>Sign Up.
                       </Text>
                       </Text>
                onPress = { onSignUpPressed }
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
});

export default SignInScreen