import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ImageBackground,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import Background from '../../../assets/images/profile-background.png';
import CustomButton from '../../components/CustomButton';
import InputFieldAfterLogIn from '../../components/InputFieldAfterLogIn';
import ImagePicker from 'react-native-image-crop-picker';
import EditProfilePicture from '../../../assets/images/EditProfilePicture.png';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import KeyboardAvoidingWrapper from '../../components/KeyboardAvoidingWrapper';

/**
 * Anonymous class that renders EditProfileScreen.
 *
 * @returns Render of EditProfileScreen
 */
const EditProfileScreen = () => {
  /**
   * Fetches data of the current user logged into the app.
   */
  const user = auth().currentUser;

  /**
   * Navigation object.
   */
  const navigation = useNavigation();

  /**
   * State for user's name. Default state is the user's
   * display name that they set.
   */
  const [name, setName] = useState(
    userData ? (userData.name === null ? '' : userData.name) : '',
  );

  /**
   * State for user's email. Default state is the user's email
   * that they set when they first signed up.
   */
  const [email, setEmail] = useState(
    userData ? (userData.email === null ? '' : userData.email) : '',
  );

  /**
   * State for user's profile picture. If a user has not set their profile
   * picture, it will be set into the default image that is taken from Firebase Storage.
   */
  const [image, setImage] = useState(
    userData
      ? userData.userImg === null
        ? defaultImage
        : userData.userImg
      : defaultImage,
  );

  /**
   * Default profile picture that is used if userData.userImg is null.
   */
  const defaultImage =
    'https://firebasestorage.googleapis.com/v0/b/travellog-d79e2.appspot.com/o/defaultUser.png?alt=media&token=d56ef526-4058-4152-933b-b98cd0668392';

  /**
   * State to show the upload progress of the profile picture
   * to Firebase storage.
   */
  const [transferred, setTransferred] = useState(0);

  /**
   * State to show activity indicator when uploading.
   */
  const [uploading, setUploading] = useState(false);

  /**
   * State to store a user's user data after fetching it
   * from the database.
   */
  const [userData, setUserData] = useState(null);

  /**
   * Function to fetch user data from Firestore database.
   */
  const getUser = async () => {
    await firestore()
      .collection('users')
      .doc(user.uid)
      .get()
      .then(documentSnapshot => {
        if (documentSnapshot.exists) {
          console.log('User Data', documentSnapshot.data());
          setUserData(documentSnapshot.data());
          setEmail(documentSnapshot.data().email);
          setName(documentSnapshot.data().name);
        }
      });
  };

  /**
   * Function to choose an image from phone gallery via ImagePicker package.
   */
  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 500,
      height: 500,
      cropping: true,
    })
      .then(image => {
        console.log(image);
        const imageUri = image.path;
        setImage(imageUri);
      })
      .catch(error => {
        console.log('User cancelled image selection!');
      });
  };

  /**
   * Function to upload user's profile picture
   * into Firebase storage.
   *
   * @returns File Uri.
   */
  const uploadImage = async () => {
    if (image == null) {
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
    task.on('state_changed', taskSnapshot => {
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

      return url;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  /**
   * Function to save changes that the user made to their
   * profile and store it to the backend.
   *
   * @returns Clean-up function.
   */
  const saveChanges = async () => {
    let unmounted = false;
    let imgUrl = await uploadImage();

    if (imgUrl == null && userData.userImg) {
      imgUrl = userData.userImg;
    }

    await firestore()
      .collection('users')
      .doc(user.uid)
      .update({
        name: name,
        email: email,
        userImg: imgUrl,
      })
      .then(() => {
        console.log('User updated!');
      });

    const update = {
      displayName: name,
      photoURL: null,
    };

    user.updateProfile(update);

    navigation.goBack();

    return () => {
      unmounted = true;
    };
  };

  /**
   * Function to go back to the previous
   * screen on the stack.
   */
  const onCanceling = () => {
    navigation.goBack();
  };

  /**
   * React hook to fetch user data upon accessing the page.
   */
  useEffect(() => {
    let unmounted = false;
    getUser();
    return () => {
      unmounted = true;
    };
  }, []);

  return (
    <KeyboardAvoidingWrapper>
      <View style={styles.root}>
        <ImageBackground
          source={Background}
          resizeMode="stretch"
          style={styles.background}>
          {
            // Edit source of image to uri
          }
          <Image
            source={{
              uri: image
                ? image
                : userData
                ? userData.userImg || defaultImage
                : defaultImage,
            }}
            style={styles.pfp}
          />

          <TouchableOpacity
            onPress={choosePhotoFromLibrary}
            style={styles.editPfp}>
            <Image source={EditProfilePicture} style={styles.editPfp} />
          </TouchableOpacity>

          <Text style={styles.name}>{name}</Text>

          <Text style={[styles.text, {paddingTop: '20%'}]}>Name</Text>

          <InputFieldAfterLogIn
            placeholder="Enter your new name here."
            value={name}
            setValue={setName}
            maxLength={20}
          />

          <Text style={styles.text}>Email</Text>

          <Text style={styles.userInfo}>{email}</Text>

          <Text>
            {'\n'}
            {'\n'}
            {'\n'}
            {'\n'}
            {'\n'}
          </Text>

          <CustomButton text="Cancel" onPress={onCanceling} type="QUATERNARY" />

          <CustomButton
            text="Save Changes"
            onPress={saveChanges}
            type="TERTIARY"
          />

          <Text>{'\n'}</Text>

          {uploading ? (
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <ActivityIndicator size="small" color="#000000" />
              <Text style={styles.text}> {transferred}% completed</Text>
            </View>
          ) : (
            <View />
          )}
        </ImageBackground>
      </View>
    </KeyboardAvoidingWrapper>
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
    borderRadius: 150 / 2,
    width: 150,
    height: 150,
    borderWidth: 2,
    borderColor: '#70D9D3',
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
    alignSelf: 'flex-start',
  },
});

export default EditProfileScreen;
