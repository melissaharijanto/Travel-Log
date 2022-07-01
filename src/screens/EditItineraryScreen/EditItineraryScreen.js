import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Alert, ActivityIndicator} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import InputFieldAfterLogIn from '../../components/InputFieldAfterLogIn';
import CustomButton from '../../components/CustomButton';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {firebase} from '@react-native-firebase/firestore';
import KeyboardAvoidingWrapper from '../../components/KeyboardAvoidingWrapper/KeyboardAvoidingWrapper';
import {HeaderWithDeleteIcon} from '../../components/Headers/Headers';
import {UploadImages} from '../../components/ButtonsAfterLogin/ButtonsAfterLogin';

/**
 * Anonymous class that renders EditItineraryScreen.
 * This page will be accessed from the Home Stack.
 *
 * @param {*} route Argument that carries over the parameters passed from the previous screen.
 * @returns Render of EditItineraryScreen.
 */
const EditItineraryScreen = ({route}) => {
  /**
   * Navigation object.
   */
  const navigation = useNavigation();

  /**
   * Route parameters passed from the previous screen.
   */
  const {itinerary} = route.params;

  /**
   * State for title name input field.
   */
  const [title, setTitle] = useState(itinerary.title);

  /**
   * State for additional notes input field.
   */
  const [notes, setNotes] = useState(itinerary.notes);

  /**
   * State for itinerary cover image.
   */
  const [image, setImage] = useState(null);

  /**
   * State to show activity indicator when editing.
   */
  const [editing, setEditing] = useState(false);

  /**
   * State to show activity indicator when deleting.
   */
  const [deleting, setDeleting] = useState(false);

  /**
   * State to show whether an itinerary image has been chosen.
   * If false, will show default itinerary image from database.
   */
  const [isImageChosen, setChosen] = useState(null);

  /**
   * Navigation to go back to the previous screen on the stack.
   */
  const goBack = () => {
    navigation.goBack();
  };

  /**
   * Updates isImageChosen state to true if itinerary.coverImage is not null
   * upon change of the itinerary (route parameter).
   */
  useEffect(() => {
    let unmounted = false;
    itinerary.coverImage == undefined ? setChosen(false) : setChosen(true);
    return () => {
      unmounted = true;
    };
  }, [itinerary]);

  /**
   * Function to show alert confirming itinerary deletion.
   */
  const confirmDelete = () => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this itinerary?',
      [
        {
          text: 'Cancel',
          onPress: () => {
            navigation.navigate('EditItinerary', {
              itinerary: itinerary,
            });
            console.log('User decided not to log out');
          },
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            handleDelete();
            console.log('Deleted.');
          },
        },
      ],
    );
  };

  /**
   * Deletes the itinerary from Firestore database.
   * Will redirect to Home Page when done.
   *
   * @returns Clean-up function.
   */
  const handleDelete = async () => {
    // Clean-up variable.
    let unmounted = false;

    // Shows activity indicator.
    setDeleting(true);

    // Decrement the user's itinerary count
    var docRef = firestore().collection('users').doc(auth().currentUser.uid);

    docRef.update({
      itineraries: firebase.firestore.FieldValue.increment(-1),
    });

    await firestore()
      .collection('users')
      .doc(auth().currentUser.uid)
      .collection('itineraries')
      .doc(itinerary.id)
      .delete()
      .then(() => console.log('Unbinded from user.'))
      .catch(e => {
        console.log(e);
      });

    await firestore()
      .collection('itineraries')
      .doc(itinerary.id)
      .delete()
      .then(() => {
        console.log('Deleted.');
        setDeleting(false);
        navigation.navigate('HomeScreen');
      })
      .catch(e => {
        console.log(e);
      });

    // Returns the clean-up function.
    return () => {
      unmounted = true;
    };
  };

  /**
   * Chooses image from phone gallery via ImagePicker.
   */
  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 500,
      height: 500 / 2,
      cropping: true,
    })
      .then(image => {
        console.log(image);
        const imageUri = image.path;
        setImage(imageUri);
        setChosen(true);
      })
      .catch(error => {
        console.log('User cancelled image selection!');
      });
  };

  /**
   * Uploads image to Firebase Storage.
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

    const storageRef = storage().ref(`photos/${filename}`);
    const task = storageRef.putFile(uploadUri);

    try {
      await task;
      const url = await storageRef.getDownloadURL();

      setImage(null);

      return url;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  /**
   * Function to edit itinerary in the backend.
   *
   * @returns Clean-up function.
   */
  const editItinerary = async () => {
    // Clean-up variable.
    let unmounted = false;

    // Shows activity indicator.
    setEditing(true);

    let imgUrl = await uploadImage();

    // If there is an image uploaded before and user does not upload a new one,
    // the old url will be used.
    if (imgUrl == null && itinerary.coverImage) {
      imgUrl = itinerary.coverImage;
    }

    await firestore()
      .collection('itineraries')
      .doc(itinerary.id)
      .update({
        title: title,
        coverImage: imgUrl,
        notes: notes,
      })
      .then(() => {
        console.log('Itinerary updated!');
      });

    // Hides activity indicator.
    setEditing(false);

    navigation.navigate('OpenItinerary', {
      itinerary: {
        id: itinerary.id,
        coverImage: imgUrl,
        title: title,
        createdAt: itinerary.createdAt,
        days: itinerary.days,
        endDate: itinerary.endDate,
        notes: notes,
        owner: itinerary.owner,
        startDate: itinerary.startDate,
      },
    });

    // Returns clean-up function.
    return () => {
      unmounted = true;
    };
  };

  return (
    <KeyboardAvoidingWrapper backgroundColor="#FFFFFF">
      <View style={styles.root}>
        <HeaderWithDeleteIcon
          back={goBack}
          deleting={confirmDelete}
          text="Edit Itinerary"
          flexValue={2.2}
        />

        <Text />

        <View
          style={[
            styles.root,
            {
              paddingHorizontal: '8%',
              backgroundColor: 'white',
            },
          ]}>
          <Text style={styles.text}>Title</Text>

          <InputFieldAfterLogIn
            placeholder="Title"
            value={title}
            setValue={setTitle}
            style={styles.textBox}
          />

          <Text style={styles.text}>Cover Image</Text>

          <View style={styles.horizontal}>
            <UploadImages onPress={choosePhotoFromLibrary} />
            {isImageChosen ? (
              <Text style={[styles.setText, {paddingLeft: 20}]}>
                Image uploaded.
              </Text>
            ) : null}
          </View>

          <Text style={styles.text}>Start Date</Text>
          <Text style={styles.permanent}>
            {itinerary.startDate.toDate().toLocaleDateString()}
          </Text>

          <Text style={styles.text}>End Date</Text>
          <Text style={styles.permanent}>
            {itinerary.endDate.toDate().toLocaleDateString()}
          </Text>

          <Text style={styles.text}>Additional Notes</Text>

          <InputFieldAfterLogIn
            placeholder="Notes"
            value={notes}
            setValue={setNotes}
          />

          <Text>{'\n'}</Text>

          {editing || deleting ? (
            <View
              style={{
                paddingTop: 19,
                paddingBottom: 30,
                alignSelf: 'center',
              }}>
              <ActivityIndicator size="large" color="#000000" />
            </View>
          ) : (
            <Text>
              {'\n'}
              {'\n'}
              {'\n'}
              {'\n'}
            </Text>
          )}

          <CustomButton text="Cancel" type="QUATERNARY" onPress={goBack} />

          <CustomButton text="Update" type="TERTIARY" onPress={editItinerary} />
        </View>
      </View>
    </KeyboardAvoidingWrapper>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'flex-start',
    backgroundColor: 'white',
    width: '100%',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  setText: {
    fontFamily: 'Poppins-Italic',
    color: '#333333',
    paddingTop: 2,
  },
  text: {
    fontFamily: 'Poppins-Medium',
    color: '#333333',
    paddingTop: 2,
  },
  permanent: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 15,
    color: 'black',
    alignSelf: 'flex-start',
    paddingLeft: '8%',
    paddingVertical: '6%',
  },
});

export default EditItineraryScreen;
