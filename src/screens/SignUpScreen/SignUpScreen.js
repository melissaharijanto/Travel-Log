import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import Logo from '../../../assets/images/logo2.png';
import CustomInputField from '../../components/CustomInputField';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import Auth from '@react-native-firebase/auth';

const SignUpScreen = () => {
    const [username, setUsername] = useState();
    const [name, setName] = useState();
    const [password, setPassword] = useState();
    const [email, setEmail] = useState();

    const navigation = useNavigation();

    const onSignUpPressed = () => {
        console.warn('You have successfully signed up!');
        navigation.navigate("HomeWithBottomTab");
    };

    const onLogInPressed = () => {
        navigation.navigate("SignIn");
    };

    return (
        <ScrollView>
        <View style = {styles.root}>
            <Image
                source={ Logo }
                style={ styles.logo }
                resizeMode="contain"
            />

            <CustomInputField
                placeholder = "Name"
                value = { name }
                setValue = { setName }
            />

            <CustomInputField
                placeholder = "Username"
                value = { username }
                setValue = { setUsername }
            />

            <CustomInputField
                placeholder = "Email"
                value = { email }
                setValue = { setEmail }
            />

            <CustomInputField
                placeholder = "Password"
                value = { password }
                setValue = { setPassword }
                secureTextEntry
            />

            <CustomButton
                text = "Sign Up"
                onPress = { onSignUpPressed }
                type = "PRIMARY"
            />

            <CustomButton
                text = <Text style = {{ fontSize: 12, }}>Have an existing account?
                       <Text style = {{ fontSize: 12, }}> </Text>
                       <Text
                            style = {{
                            fontFamily: 'Poppins-SemiBold',
                            textDecorationLine: 'underline',
                            fontSize: 12,
                            }}>Log in.
                       </Text>
                       </Text>
                onPress = { onLogInPressed }
                type = "SECONDARY"
            />

        </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        paddingHorizontal: '10%',
        paddingTop: '30%',
        backgroundColor: '#70DAD3'
    },
    logo: {
        width: '75%',
        maxWidth: 600,
        maxHeight: 140,
    },
});

export default SignUpScreen