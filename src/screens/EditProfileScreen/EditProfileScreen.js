import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    ImageBackground,
    Dimensions,
    ActivityIndicator,
    Alert,
    TouchableOpacity
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import Background from '../../../assets/images/profile-background.png';
import CustomButton from '../../components/CustomButton';
import InputFieldAfterLogIn from '../../components/InputFieldAfterLogIn';
import ImagePicker from 'react-native-image-crop-picker';
import EditProfilePicture from '../../../assets/images/EditProfilePicture.png'
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';

const EditProfileScreen = () => {

    const user = auth().currentUser;
    const [name, setName] = useState(userData
        ? userData.name === null
            ? ''
            : userData.name
        : '');
    const [email, setEmail] = useState(userData
        ? userData.email === null
            ? ''
            : userData.email
        : '');
    // change the image uri
    const [image, setImage] = useState(userData
        ? userData.userImg === null
            ? defaultImage
            : userData.userImg
        : defaultImage);
    const [transferred, setTransferred] = useState(0);
    const [uploading, setUploading] = useState(false);
    const [userData, setUserData] = useState(null);

     const getUser = async () => {
         const currentUser = await firestore()
         .collection('users')
         .doc(user.uid)
         .get()
         .then((documentSnapshot) => {
             if( documentSnapshot.exists ) {
                 console.log('User Data', documentSnapshot.data());
                 setUserData(documentSnapshot.data());
                 setEmail(documentSnapshot.data().email);
                 setName(documentSnapshot.data().name);
             }
         })
     }

     useEffect(() => {
         getUser();
       }, []);

    const navigation = useNavigation();
    const defaultImage = 'https://firebasestorage.googleapis.com/v0/b/travellog-d79e2.appspot.com/o/defaultUser.png?alt=media&token=d56ef526-4058-4152-933b-b98cd0668392'

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
        })
        .catch((error => {
            console.log('User cancelled image selection!')
        }));
    };

    //possble unhandled promise rejection
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



    const saveChanges = async () => {
        let imgUrl = await uploadImage();

        if ( imgUrl == null && userData.userImg ) {
            imgUrl = userData.userImg;
        }

        firestore()
            .collection('users')
            .doc(user.uid)
            .update({
                name: name ,
                email: email,
                userImg: imgUrl,
            })
            .then(() => {
                console.log('User updated!');
            });

            const update = {
                displayName: name,
                photoURL: null, // profile picture
            };

            user.updateProfile(update);

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
            {
                // Edit source of image to uri
            }
            <Image source={{ uri: image
                    ? image
                        : userData
                        ? userData.userImg || defaultImage
                    : defaultImage
                }}
                    style={styles.pfp}/>

            <TouchableOpacity
                onPress = {choosePhotoFromLibrary}
                style={ styles.editPfp }>
            <Image source= {EditProfilePicture}
                style={styles.editPfp}
            />
            </TouchableOpacity>

            <Text style = { styles.name }>{ name }</Text>

            <Text style = { [styles.text, { paddingTop: '20%' } ]}>Name</Text>

            <InputFieldAfterLogIn
                placeholder = "Enter your new name here."
                value = { name }
                setValue = { setName  }
                maxLength = { 20 }
            />

            <Text style = { styles.text }>Email</Text>

            <Text style = { styles.userInfo }>{ email }</Text>

            <Text>
                {'\n'}
                {'\n'}
                {'\n'}
                {'\n'}
                {'\n'}
            </Text>

            <CustomButton
                text = "Cancel"
                onPress = { onCanceling }
                type = "QUATERNARY"
            />

            <CustomButton
                text = "Save Changes"
                onPress = { saveChanges }
                type = "TERTIARY"
            />

            <Text>
                {'\n'}
            </Text>

            { uploading 
            ? ( 
            <View style={{ justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator size="small" color='#000000'/> 
                <Text style = {styles.text}> {transferred}% completed</Text>
            </View>
            )
            : <View></View>
            }

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
        top: '8%',
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