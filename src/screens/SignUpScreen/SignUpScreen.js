import React, { useState, useContext } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Alert } from 'react-native';
import Logo from '../../../assets/images/logo2.png';
import CustomInputField from '../../components/CustomInputField';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import DefaultProfilePicture from '../../../assets/images/defaultUser.png';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore'

const SignUpScreen = () => {
    const [name, setName] = useState();
    const [password, setPassword] = useState();
    const [email, setEmail] = useState();

    const navigation = useNavigation();

    const onSignUpPressed = async () => {
        await auth()
          .createUserWithEmailAndPassword(email, password)
          .then( async () => {
            await firestore().collection('users').doc(auth().currentUser.uid).set({
                name: name,
                email: email,
                createdAt: firestore.Timestamp.fromDate(new Date()),
                userImg: null,
                itineraries: 0,
            });
            console.log('User account created & signed in!');
            })
          .catch(error => {
            if (error.code === 'auth/user-not-found') {
              console.log('There is no existing user record corresponding to the provided identifier.');
            }

            if (error.code === 'auth/invalid-email') {
              console.log('That email address is invalid!');
            }

            Alert.alert(
                error.code,
                error.message,
                [
                    {
                        text: "OK",
                        onPress: () => console.log("OK Pressed"),
                        style: "OK",
                    },
                ],
                {
                    cancelable: true,
                    onDismiss: () =>
                    console.log(
                        "This alert was dismissed by tapping outside of the alert dialog."
                    ),
                }
            );

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
                        maxLength = { 20 }
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
                        text = {
                            <Text style = {{ fontSize: 12, }}>Have an existing account?
                            <Text style = {{ fontSize: 12, }}> </Text>
                            <Text
                                style = {{
                                fontFamily: 'Poppins-SemiBold',
                                textDecorationLine: 'underline',
                                fontSize: 12,
                                }}>Log in.
                            </Text>
                            </Text>
                        }
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
        backgroundColor: '#70DAD3'
    },
    logo: {
        width: '75%',
        maxWidth: 600,
        maxHeight: 140,
    },
});

export default SignUpScreen