import React, { useState } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    ScrollView,
    Pressable,
    ImageBackground,
    Dimensions,
    ActivityIndicator,
    Alert,
    TouchableOpacity
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import Background from '../../../assets/images/profile-background.png';
import DefaultProfilePicture from '../../../assets/images/defaultUser.png';
import EditIcon from 'react-native-vector-icons/AntDesign';
import CustomButton from '../../components/CustomButton';
import InputFieldAfterLogIn from '../../components/InputFieldAfterLogIn';
import ImagePicker from 'react-native-image-crop-picker';
import EditProfilePicture from '../../../assets/images/EditProfilePicture.png'
import storage from '@react-native-firebase/storage';

const EditProfileScreen = () => {

    const currentUser = auth().currentUser;
    const [image, setImage] = useState();
    const [name, setName] = useState(currentUser.displayName);
    const [email, setEmail] = useState(currentUser.email);
    const [transferred, setTransferred] = useState(0);
    const [upload, setUploading] = useState(false);

    const navigation = useNavigation();

    const takePhotoFromCamera = () => {
            ImagePicker.openCamera({
            width: 500,
            height: 500,
            cropping: true,
        }).then((image) => {
            console.log(image);
            const imageUri = image.path;
            setImage(imageUri);
        });
    };

    const choosePhotoFromLibrary = () => {
        ImagePicker.openPicker({
          width: 500,
          height: 500,
          cropping: true,
        }).then((image) => {
          console.log(image);
          const imageUri = image.path;
          setImage(imageUri);
        });
      };

    const uploadImage = async () => {
        if( image == null ) {
            return null;
        }

        const uploadUri = image;
        let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

                // Add timestamp to File Name
                const extension = filename.split('.').pop();
                const name = filename.split('.').slice(0, -1).join('.');
                filename = name + Date.now() + '.' + extension;

            setUploading(true);
            setTransferred(0);

            const storageRef = storage().ref(`photos/${filename}`);
            const task = storageRef.putFile(uploadUri);

            // Set transferred state
            task.on('state_changed', (taskSnapshot) => {
              console.log(
                `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
              );

              setTransferred(
                Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
                  100,
              );
            });

            try {
              await task;
              const url = await storageRef.getDownloadURL();

              setUploading(false);
              setImage(null);

              // Alert.alert(
              //   'Image uploaded!',
              //   'Your image has been uploaded to the Firebase Cloud Storage Successfully!',
              // );
              return url;
            } catch (e) {
              console.log(e);
              return null;
            }
          };



    const saveChanges = () => {
        const update = {
            displayName: name,
            photoURL: null, // profile picture
        };
        currentUser.updateEmail(email);
        currentUser.updateProfile(update);
        navigation.goBack();
    }

    const onCanceling = () => {
        navigation.goBack();
    }

    return (
        <View style = { styles.root }>
            <ImageBackground source={Background}
                resizeMode="stretch"
                style={styles.background}>
            <Image source={ currentUser.photoURL === null
                    ? DefaultProfilePicture
                    : currentUser.photoURL }
                    style={styles.pfp}/>

            <TouchableOpacity
                onPress = {choosePhotoFromLibrary}
                style={ styles.editPfp }>
            <Image source= {EditProfilePicture}
                style={styles.editPfp}
                />
            </TouchableOpacity>

            <Text style = { styles.name }>{`${currentUser.displayName}`}</Text>


            <Text style = { [styles.text, { paddingTop: '30%' } ]}>Name</Text>

            <InputFieldAfterLogIn
                placeholder = "Enter your new name here."
                value = { name }
                setValue = { setName  }
            />

            <Text style = { styles.text }>Email</Text>

            <InputFieldAfterLogIn
                placeholder = "Enter your new email here."
                value = { email }
                setValue = { setEmail }
            />

            <Text>
                {'\n'}
                {'\n'}
                {'\n'}
                {'\n'}
                {'\n'}
                {'\n'}
                {'\n'}
            </Text>



            <CustomButton
                text = "Cancel"
                onPress = { onCanceling }
                type = "QUARTERNARY"
            />

            <CustomButton
                text = "Save Changes"
                onPress = { saveChanges }
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

    editPfp: {
        width: 40,
        height: 40,
        top: 30,
        right: 28,
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