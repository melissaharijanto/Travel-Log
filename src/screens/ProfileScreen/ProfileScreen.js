import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

const ProfileScreen = () => {

    const navigation = useNavigation();

    const onSigningOut = () => {
        auth()
          .signOut()
          .then(() => console.log('User signed out!'));
    }
    return (
        <ScrollView>
        <View style = { styles.root }>
        <Text style = { styles.text }> Placeholder Page for Profile Tab </Text>
        <Pressable onPress = { onSigningOut }>
                    <Text style = { [styles.text, { textDecorationLine: 'underline' }] }>
                    SignOut
                    </Text>
        </Pressable>
        </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        paddingHorizontal: '10%',
        paddingTop: '55%',
   },

   text: {
        fontFamily: 'Poppins-SemiBold',
   },
});

export default ProfileScreen;