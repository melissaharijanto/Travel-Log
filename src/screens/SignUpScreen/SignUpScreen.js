import React, { useState, useContext } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import Logo from '../../../assets/images/logo2.png';
import CustomInputField from '../../components/CustomInputField';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';


const SignUpScreen = () => {
    const [name, setName] = useState();
    const [password, setPassword] = useState();
    const [email, setEmail] = useState();

    const navigation = useNavigation();

    const onSignUpPressed = () => {
        auth()
          .createUserWithEmailAndPassword(email, password)
          .then( async () => {
            const update = {
              displayName: name,
              photoURL: null, // profile picture
            };
            await auth().currentUser.updateProfile(update);
            await console.log('User account created & signed in!');
            navigation.navigate("HomeWithBottomTab");
            })
          .catch(error => {
            if (error.code === 'auth/user-not-found') {
              console.log('There is no existing user record corresponding to the provided identifier.');
            }

            if (error.code === 'auth/invalid-email') {
              console.log('That email address is invalid!');
            }

            console.error(error);
          });
    };

    const onLogInPressed = () => {
        navigation.navigate("SignIn");
    };

    return (
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
    );
}

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        paddingHorizontal: '10%',
        paddingTop: '50%',
        paddingTop: '48%',
        backgroundColor: '#70DAD3'
    },
    logo: {
        width: '75%',
        maxWidth: 600,
        maxHeight: 140,
    },
});

export default SignUpScreen