import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Pressable } from 'react-native';
import Logo from '../../../assets/images/logo2.png';
import CustomInputField from '../../components/CustomInputField';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';

const ConfirmCodeScreen = () => {
    const [code, setCode] = useState();
    const [newPassword, setNewPassword] = useState();

    const navigation = useNavigation();

    const onSendCodePressed = () => {
        console.warn('A code has been resent to your email.');
    }; // to be changed once other screens are made!

    const onBackToLogInPressed = () => {
        navigation.navigate("SignIn");
    }; // to be changed once other screens are made!

    const onSubmitPressed= () => {
        navigation.navigate("SetNewPassword");
    }; // to be changed once other screens are made!

    return (
        <ScrollView>
        <View style = { styles.root }>
            <Image
                source={ Logo }
                style={ styles.logo }
                resizeMode="contain"
            />

            <Text style = {
                [styles.text,
                { marginBottom: 3 }]
            }>A code has been sent to your email.</Text>

            <CustomInputField
                placeholder = "Enter the code here."
                value = { code }
                setValue = { setCode }
            />

            <CustomButton
                text = "Submit"
                onPress = { onSubmitPressed }
                type = "PRIMARY"
            />

            <Pressable onPress = { onSendCodePressed }>
                <Text style = { [ styles.text, {
                    fontFamily: 'Poppins-SemiBold',
                    marginTop: 15, }]
                }>
                Didn't receive the code?
                <Text> </Text>
                <Text style = {{ textDecorationLine: 'underline' }}>
                Click here to resend.
                </Text>
                </Text>
            </Pressable>

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
        fontFamily: 'Poppins-Regular',
        fontSize: 12,

    },
});

export default ConfirmCodeScreen;