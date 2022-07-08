import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ActivityIndicator, Alert} from 'react-native';
import CustomButton from '../../components/CustomButton';
import firestore from '@react-native-firebase/firestore';
import InputFieldAfterLogIn from '../../components/InputFieldAfterLogIn';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import DocumentPicker, {
  isInProgress,
  types,
} from 'react-native-document-picker';
import storage from '@react-native-firebase/storage';
import KeyboardAvoidingWrapper from '../../components/KeyboardAvoidingWrapper/KeyboardAvoidingWrapper';
import {
  ReusableButton,
  UploadFiles,
} from '../../components/ButtonsAfterLogin/ButtonsAfterLogin';
import {HeaderWithDeleteIcon} from '../../components/Headers/Headers';
import {
  FourLineBreak,
  SmallLineBreak,
} from '../../components/LineBreaks/LineBreaks';
import {
  ErrorMessage,
  FieldName,
} from '../../components/CustomTextStyles/CustomTextStyles';

/**
 * Anonymous class that renders EditActivityScreen.
 *
 * @param {*} route Argument that carries over the parameters passed from the previous screen.
 * @param {*} navigation Navigation prop.
 * @returns Render of EditActivityScreen.
 */
const EditActivityScreen = ({route, navigation}) => {
  /**
   * Route parameters passed from the previous screen.
   */
  const {id, itemId, dayLabel, date, owner} = route.params;

  /**
   * Function that takes in time and returns it in a custom string format.
   *
   * @param {Date} time The start time that has been picked by the user.
   * @returns {String} Time in hh:mm format.
   */
  const getTime = time => {
    let minutes = time.getMinutes();
    let hours = time.getHours();
    if (hours < 10) {
      hours = `0${hours}`;
    }
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    return `${hours}:${minutes}`;
  };

  /**
   * State for activity name input field; default state is ''.
   */
  const [name, setName] = useState('');

  /**
   * State for location name input field; default state is ''.
   */
  const [location, setLocation] = useState('');

  /**
   * State to set the start time of the activity.
   */
  const [startTime, setStartTime] = useState(new Date());

  /**
   * State to show whether a document for additional file field has
   * been chosen or not; if true, a file has been chosen, and vice versa.
   */
  const [isDocChosen, setChosen] = useState(false);

  /**
   * State to show whether the start time has been chosen
   * or not; if true, a start time has been chosen, and vice versa.
   */
  const [isTimeChosen, setTimeChosen] = useState(false);

  /**
   * State that will store the file uri when the
   * file is uploaded.
   */
  const [fileUri, setFileUri] = useState(null);

  /**
   * State that will store the file name when the
   * file is uploaded.
   */
  const [fileName, setFileName] = useState(null);

  /**
   * State that will store the file that is picked
   * through the document picker.
   */
  const [file, setFile] = useState(null);

  /**
   * State to show activity indicator when updating activity.
   */
  const [updating, setUpdating] = useState(false);

  /**
   * State to show activity indicator when deleting activity.
   */
  const [deleting, setDeleting] = useState(false);

  /**
   * State to show the start-time time picker.
   */
  const [isStartVisible, setStartVisible] = useState(false);

  /**
   * Error message that will show if
   * activity name is left as empty.
   */
  const [nameError, setNameError] = useState('');

  /**
   * State that will show the error message for the
   * activity name if left empty. If true, the
   * message will show.
   */
  const [showNameError, setShowNameError] = useState(false);

  /**
   * Error message that will show if
   * location name is left as empty.
   */
  const [locationError, setLocationError] = useState('');

  /**
   * State that will show the error message for the
   * location name if left empty. If true, the
   * message will show.
   */
  const [showLocationError, setShowLocationError] = useState(false);

  /**
   * Error message that will show if
   * start time is not picked.
   */
  const [startError, setStartError] = useState('');

  /**
   * State that will show the error message for the
   * start time if not picked. If true, the
   * message will show.
   */
  const [showStartError, setShowStartError] = useState('');

  /**
   * Function to show the start time picker.
   */
  const showStartDatePicker = () => {
    setStartVisible(true);
    console.log(date);
  };

  /**
   * Function to hide the start time picker.
   */
  const hideDatePicker = () => {
    setStartVisible(false);
  };

  /**
   * Function to save the start time that has been picked by the user.
   *
   * @param {Date} time The start time that has been picked by the user.
   */
  const handleConfirm = time => {
    console.log('A start time has been picked: ', time);
    setStartTime(time);
    setTimeChosen(true);
    setShowStartError(false);
    hideDatePicker();
  };

  /**
   * Function to choose a file via react-native-document-picker.
   */
  const chooseFile = async () => {
    try {
      const pickerResult = await DocumentPicker.pickSingle({
        presentationStyle: 'fullScreen',
        copyTo: 'cachesDirectory',
        type: [types.doc, types.docx, types.pdf, types.images],
      });
      setFile(pickerResult);
      setFileUri(pickerResult.fileCopyUri);
      console.log(pickerResult);
      setFileName(pickerResult.name);
      setChosen(true);
    } catch (e) {
      if (DocumentPicker.isCancel(e)) {
        console.log('cancelled');
        // User cancelled the picker, exit any dialogs or menus and move on
      } else if (isInProgress(e)) {
        console.log(
          'multiple pickers were opened, only the last will be considered',
        );
      } else {
        console.log(e);
      }
    }
  };

  /**
   * Function to upload file to Firebase storage.
   *
   * @returns File uri.
   */
  const uploadFile = async () => {
    if (file == null) {
      return null;
    }

    const uploadUri = fileUri;
    let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

    // Add timestamp to File Name
    const extension = filename.split('.').pop();
    const name = filename.split('.').slice(0, -1).join('.');
    filename = name + Date.now() + '.' + extension;

    // Referencing firebase storage.
    const storageRef = storage().ref(`files/${filename}`);
    const task = storageRef.putFile(uploadUri);

    try {
      await task;
      const url = await storageRef.getDownloadURL();

      setFile(null);

      return url;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  /**
   * Function to update activity to Firestore database.
   *
   * @returns Clean-up function.
   */
  const update = async () => {
    // Clean-up variable
    let unmounted = false;

    // State to show Activity Indicator.
    setUpdating(true);

    // Error handling.
    if (name === '') {
      setNameError('Activity name is still empty.');
      setShowNameError(true);
      setUpdating(false);
      return;
    } else if (location === '') {
      setLocationError('Location is still empty.');
      setShowLocationError(true);
      setShowNameError(false);
      setUpdating(false);
      return;
    } else if (!isTimeChosen) {
      setStartError('Please pick a start time.');
      setShowStartError(true);
      setShowNameError(false);
      setShowLocationError(false);
      setUpdating(false);
      return;
    }

    let fileUrl = await uploadFile();

    // If current is empty and user uploaded a file previously, it will be displayed.
    if (fileUrl == null && fileUri) {
      fileUrl = fileUri;
    }

    await firestore()
      .collection('itineraries')
      .doc(id)
      .collection('days')
      .doc(dayLabel)
      .collection('plans')
      .doc(itemId)
      .update({
        name: name,
        location: location,
        notes: fileUrl,
        type: 'activity',
        id: itemId,
        time: startTime,
      });

    setUpdating(false);
    navigation.navigate('ViewActivity', {
      id: id,
      dayLabel: dayLabel,
      date: date,
      itemId: itemId,
      owner: owner,
    });

    // Returns the clean-up function.
    return () => {
      unmounted = true;
    };
  };

  /**
   * Shows alert to confirm deletion of activity.
   */
  const confirmDelete = () => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this activity?',
      [
        {
          text: 'Cancel',
          onPress: () => {
            navigation.navigate('EditActivity', {
              id: id,
              dayLabel: dayLabel,
              date: date,
              itemId: itemId,
              owner: owner,
            });
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
   * Function to delete the document from Firestore Database.
   *
   * @returns Clean-up function.
   */
  const handleDelete = async () => {
    let unmounted = false;
    setDeleting(true);
    await firestore()
      .collection('itineraries')
      .doc(id)
      .collection('days')
      .doc(dayLabel)
      .collection('plans')
      .doc(itemId)
      .delete()
      .then(() => {
        console.log('Activity deleted.');
        setDeleting(false);
        navigation.navigate('NewDay', {
          id: id,
          dayLabel: dayLabel,
          date: date,
          owner: owner,
        });
      })
      .catch(error => {
        console.log(error);
      });

    return () => {
      unmounted = true;
    };
  };

  /**
   * Go back to View Activity Screen.
   */
  const goBack = () => {
    navigation.navigate('ViewActivity', {
      id: id,
      dayLabel: dayLabel,
      date: date,
      itemId: itemId,
      owner: owner,
    });
  };

  /**
   * Fetches data from the database.
   *
   * @returns Clean-up function.
   */
  const getData = () => {
    let unmounted = false;
    firestore()
      .collection('itineraries')
      .doc(id)
      .collection('days')
      .doc(dayLabel)
      .collection('plans')
      .doc(itemId)
      .onSnapshot(documentSnapshot => {
        if (documentSnapshot.exists) {
          setName(documentSnapshot.data().name);
          setLocation(documentSnapshot.data().location);
          setStartTime(documentSnapshot.data().time.toDate());
          setTimeChosen(true);
          setFileUri(documentSnapshot.data().notes);
        }
      });

    return () => {
      unmounted = true;
    };
  };

  /**
   * Fetches file name if a user uploads it to additional notes.
   *
   * @returns Clean-up function.
   */
  const getFile = () => {
    let unmounted = false;
    if (fileUri != null) {
      setChosen(true);
    }

    return () => {
      unmounted = true;
    };
  };

  /**
   * The state of setShowNameError will be false once a
   * character is inputted into the name field.
   */
  useEffect(() => {
    setShowNameError(false);
  }, [name]);

  /**
   * The state of setShowLocationError will be false once a
   * character is inputted into the name field.
   */
  useEffect(() => {
    setShowLocationError(false);
  }, [location]);

  /**
   * Fetches data from database upon change of the route variable.
   */
  useEffect(() => {
    let unmounted = false;
    getData();
    return () => {
      unmounted = true;
    };
  }, [route]);

  /**
   * Fetches file from database if the fileUri is not null.
   */
  useEffect(() => {
    let unmounted = false;
    getFile();
    return () => {
      unmounted = true;
    };
  }, [fileUri]);

  return (
    <KeyboardAvoidingWrapper backgroundColor="#FFFFFF">
      <View style={styles.root}>
        {/* Header */}
        <HeaderWithDeleteIcon
          back={goBack}
          deleting={confirmDelete}
          text="Activity"
          flexValue={1.5}
        />

        <SmallLineBreak />

        <View style={[styles.root, {paddingHorizontal: '8%'}]}>
          <FieldName text="Activity Name" />

          <InputFieldAfterLogIn
            placeholder="Activity Name"
            value={name}
            setValue={setName}
          />

          {showNameError ? <ErrorMessage text={nameError} /> : null}

          <FieldName text="Location" />

          <InputFieldAfterLogIn
            placeholder="Location"
            value={location}
            setValue={setLocation}
          />

          {showLocationError ? <ErrorMessage text={locationError} /> : null}

          <FieldName text="Start Time" />

          <View style={styles.horizontal}>
            <ReusableButton
              onPress={showStartDatePicker}
              text="Pick Start Time"
            />
            {isTimeChosen ? (
              <Text style={[styles.setText, {paddingLeft: 20}]}>
                {getTime(startTime)}
              </Text>
            ) : null}
          </View>
          <DateTimePickerModal
            isVisible={isStartVisible}
            mode="time"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
            date={date.toDate()}
          />

          {showStartError ? <ErrorMessage text={startError} /> : null}

          <FieldName text="Additional Notes" />
          <View style={styles.horizontal}>
            <UploadFiles onPress={chooseFile} />
            {isDocChosen ? (
              <Text style={[styles.setText, {paddingLeft: 20}]}>
                File uploaded.
              </Text>
            ) : null}
          </View>
          <Text style={styles.acceptedFiles}>
            Accepted file formats: .pdf, .docx, .jpeg, .png
          </Text>

          {/* Line breaks */}
          <FourLineBreak />

          <CustomButton text="Update" onPress={update} type="TERTIARY" />

          {updating || deleting ? (
            <View style={{paddingTop: 20, alignSelf: 'center'}}>
              <ActivityIndicator size="large" color="#000000" />
            </View>
          ) : (
            <Text style={{marginTop: 75}} />
          )}
        </View>
      </View>
    </KeyboardAvoidingWrapper>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  acceptedFiles: {
    fontFamily: 'Poppins-Italic',
    fontSize: 12,
    color: '#333333',
  },
  setText: {
    fontFamily: 'Poppins-Italic',
    color: '#333333',
    paddingTop: 2,
    fontSize: 12,
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});
export default EditActivityScreen;
