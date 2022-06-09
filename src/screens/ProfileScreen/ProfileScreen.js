import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    ScrollView,
    Pressable,
    ImageBackground,
    Dimensions
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import Background from '../../../assets/images/profile-background.png';
import DefaultProfilePicture from '../../../assets/images/defaultUser.png';
import EditIcon from 'react-native-vector-icons/AntDesign';
import CustomButton from '../../components/CustomButton';
import firestore from '@react-native-firebase/firestore';


const ProfileScreen = () => {

    const user = auth().currentUser;
    const navigation = useNavigation();
    const [userData, setUserData] = useState(null);
    const defaultImage = 'https://firebasestorage.googleapis.com/v0/b/travellog-d79e2.appspot.com/o/defaultUser.png?alt=media&token=d56ef526-4058-4152-933b-b98cd0668392'

    const getUser = async () => {
        await firestore()
            .collection('users')
            .doc(user.uid)
            .onSnapshot((documentSnapshot) => {
                if( documentSnapshot.exists ) {
                    console.log('User Data', documentSnapshot.data());
                    setUserData(documentSnapshot.data());
                }
            })
    }

    useEffect(() => {
        getUser();
      }, []);

    const onSigningOut = () => {
        auth()
          .signOut()
          .then(() => console.log('User signed out!'));
    }

    const editIconPressed = () => {
        navigation.navigate("EditProfile");
    }

    return (
        <View style = { styles.root }>
            <ImageBackground source={Background}
                resizeMode="stretch"
                style={styles.background}>
            <Image source={{ uri: userData
                ? userData.userImg || defaultImage
                : defaultImage }} style={styles.pfp}/>
            <Text style = { styles.name }>{ userData
                ? userData.name === null
                    ? ''
                    : userData.name
                : '' }</Text>

            <Text style = { [styles.text, { paddingTop: '35%' } ]}>Name</Text>

            <View style = { styles.horizontal }>
                <Text style = { styles.userInfo }>{ userData
                    ? userData.name || ''
                    : '' }  </Text>
                <EditIcon
                    size={20}
                    name="edit"
                    onPress = { editIconPressed }
                />
            </View>

            <Text style = { styles.text }>Email</Text>

            <View style = { styles.horizontal }>
            <Text style = { styles.userInfo }>{userData
                ? userData.email || ''
                : ''}  </Text>
            </View>

            <Text>
                {'\n'}
                {'\n'}
            </Text>


            <CustomButton
                text = "Log Out"
                onPress = { onSigningOut }
                type = "TERTIARY"
            />

            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        paddingHorizontal: '10%',
   },

    background: {
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
        alignItems: 'center',
        paddingHorizontal: '10%',
    },

    pfp: {
        borderRadius: 150/2 ,
        width: 150,
        height: 150,
        borderWidth: 2,
        borderColor: "#70D9D3",
        top: '12%',
    },

    name: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 26,
        top: '13%',
        color: 'black',
        alignSelf: 'center',

    },
    text: {
        fontFamily: 'Poppins-Regular',
        fontSize: 15,
        color: 'black',
        alignSelf: 'flex-start',
        paddingVertical: '1%',
    },

   userInfo: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 15,
        color: 'black',
        alignSelf: 'flex-start',
        paddingLeft: '8%',
        paddingVertical: '1%',
   },
   horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignSelf: 'flex-start'
   }

});

export default ProfileScreen;