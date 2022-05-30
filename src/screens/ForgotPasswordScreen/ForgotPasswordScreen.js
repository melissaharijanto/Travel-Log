import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import Logo from '../../../assets/images/logo2.png';
import CustomInputField from '../../components/CustomInputField';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';

const ForgotPasswordScreen = () => {
    const [username, setUsername] = useState();
    const navigation = useNavigation();

    const onSendCodePressed = () => {
        console.warn('A code has been sent to your email.');
        navigation.navigate("ConfirmCode");
    }; // to be changed once other screens are made!

    const onBackToLogInPressed = () => {
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

            <Text style = { styles.text }>Reset Your Password!</Text>

            <CustomInputField
                placeholder = "Your Account Username"
                value = { username }
                setValue = { setUsername }
            />

            <CustomButton
                text = "Send Code"
                onPress = { onSendCodePressed }
                type = "PRIMARY"
            />

            <CustomButton
                text = <Text style = {{
                            textDecorationLine: 'underline',
                            fontSize: 11,}}>Back to Log In
                       </Text>
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