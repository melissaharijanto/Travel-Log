import React from 'react';
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

const EditProfileScreen = () => {

    const currentUser = auth().currentUser;
    const navigation = useNavigation();

    const onSigningOut = () => {
        auth()
          .signOut()
          .then(() => console.log('User signed out!'));
    }
    return (
        <View style = { styles.root }>
            <ImageBackground source={Background}
                resizeMode="stretch"
                style={styles.background}>
            <Image source={ currentUser.photoURL === null
                    ? DefaultProfilePicture
                    : currentUser.photoURL } style={styles.pfp}/>
            <Text style = { styles.name }>{`${currentUser.displayName}`}</Text>


            <Text style = { [styles.text, { paddingTop: '30%' } ]}>Name</Text>

            <View style = { styles.horizontal }>
                <Text style = { styles.userInfo }>{`${currentUser.displayName}`}  </Text>
                <EditIcon
                    size={20}
                    name="edit"
                />
            </View>

            <Text style = { styles.text }>Email</Text>

            <View style = { styles.horizontal }>
            <Text style = { styles.userInfo }>{`${currentUser.email}`}  </Text>
            <EditIcon
                size={20}
                name="edit"
            />
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

export default EditProfileScreen;