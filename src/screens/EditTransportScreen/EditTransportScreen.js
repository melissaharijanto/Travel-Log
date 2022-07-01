import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ActivityIndicator, Alert} from 'react-native';
import InputFieldAfterLogIn from '../../components/InputFieldAfterLogIn';
import CustomButton from '../../components/CustomButton';
import DocumentPicker, {
  isInProgress,
  types,
} from 'react-native-document-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import KeyboardAvoidingWrapper from '../../components/KeyboardAvoidingWrapper/KeyboardAvoidingWrapper';
import {
  ReusableButton,
  UploadFiles,
} from '../../components/ButtonsAfterLogin/ButtonsAfterLogin';
import {HeaderWithDeleteIcon} from '../../components/Headers/Headers';

/**
 * Anonymous class that renders EditTransportScreen.
 *
 * @param {*} route Argument that carries over the parameters passed from the previous screen.
 * @returns Render of EditTransportScreen.
 */
const EditTransportScreen = ({route}) => {
  /**
   * Navigation object.
   */
  const navigation = useNavigation();

  /**
   * Route parameters passed from the previous screen.
   */
  const {id, dayLabel, date, itemId, owner} = route.params;

  /**
   * State for accommodation name input field; default state is ''.
   */
  const [name, setName] = useState();

  /**
   * State for starting point input field; default state is ''.
   */
  const [startingPoint, setStartingPoint] = useState();

  /**
   * State for destination name input field; default state is ''.
   */
  const [destination, setDestination] = useState();

  /**
   * State to set the start time of the transport.
   */
  const [startTime, setStartTime] = useState();

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
   * State to show activity indicator when updating transport.
   */
  const [updating, setUpdating] = useState(false);

  /**
   * State to show activity indicator when deleting transport.
   */
  const [deleting, setDeleting] = useState(false);

  /**
   * Error message that will show if
   * mode of transport (transport name) is left as empty.
   */
  const [nameError, setNameError] = useState('');

  /**
   * State that will show the error message for the
   * transport name if left empty. If true, the
   * message will show.
   */
  const [showNameError, setShowNameError] = useState(false);

  /**
   * Error message that will show if
   * starting point name is left as empty.
   */
  const [pointError, setPointError] = useState('');

  /**
   * State that will show the error message for the
   * starting point name if left empty. If true, the
   * message will show.
   */
  const [showPointError, setShowPointError] = useState(false);

  /**
   * Error message that will show if
   * destination name is left as empty.
   */
  const [destError, setDestError] = useState('');

  /**
   * State that will show the error message for the
   * destination name if left empty. If true, the
   * message will show.
   */
  const [showDestError, setShowDestError] = useState(false);

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
  const [showStartError, setShowStartError] = useState(false);

  /**
   * State to show the start-time time picker.
   */
  const [isStartVisible, setStartVisible] = useState(false);

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
          setStartingPoint(documentSnapshot.data().startingPoint);
          setDestination(documentSnapshot.data().destination);
          setStartTime(documentSnapshot.data().time.toDate());
          setFileUri(documentSnapshot.data().notes);
          setTimeChosen(true);
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
   * Function to update transport to Firestore database.
   *
   * @returns Clean-up function.
   */
  const update = async () => {
    // Clean-up variable.
    let unmounted = false;

    // State to show activity indicator.
    setUpdating(true);

    // Error Handling.
    if (name === '') {
      setNameError('Mode of transport is still empty.');
      setShowNameError(true);
      setUpdating(false);
      return;
    } else if (startingPoint === '') {
      setPointError('Starting point is still empty.');
      setShowPointError(true);
      setShowNameError(false);
      setUpdating(false);
      return;
    } else if (destination === '') {
      setDestError('Destination is still empty.');
      setShowDestError(true);
      setShowPointError(false);
      setShowNameError(false);
      setUpdating(false);
      return;
    } else if (!isTimeChosen) {
      setStartError('Please pick a start time.');
      setShowStartError(true);
      setShowDestError(false);
      setShowPointError(false);
      setShowNameError(false);
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
        startingPoint: startingPoint,
        destination: destination,
        type: 'transport',
        id: itemId,
        time: startTime,
        notes: fileUrl,
      });

    // Hide activity indicator.
    setUpdating(false);
    navigation.navigate('ViewTransport', {
      id: id,
      dayLabel: dayLabel,
      date: date,
      owner: owner,
      itemId: itemId,
    });

    // Return clean-up function.
    return () => {
      unmounted = true;
    };
  };

  /**
   * Shows alert to confirm deletion of transport.
   */
  const confirmDelete = () => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this transport?',
      [
        {
          text: 'Cancel',
          onPress: () => {
            navigation.navigate('EditTransport', {
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
    // Clean-up variable.
    let unmounted = false;

    // Show activity indicator
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
        console.log('Transport deleted.');
        // Hide activity indicator.
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

    // Return clean-up function.
    return () => {
      unmounted = true;
    };
  };

  /**
   * Go back to View Transport Screen.
   */
  const goBack = () => {
    navigation.goBack();
  };

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

  /**
   * The state of setShowNameError will be false once a
   * character is inputted into the name field.
   */
  useEffect(() => {
    let unmounted = false;
    setShowNameError(false);
    return () => (unmounted = true);
  }, [name]);

  /**
   * The state of setShowPointError will be false once a
   * character is inputted into the starting point field.
   */
  useEffect(() => {
    let unmounted = false;
    setShowPointError(false);
    return () => (unmounted = true);
  }, [startingPoint]);

  /**
   * The state of setShowDestError will be false once a
   * character is inputted into the destination field.
   */
  useEffect(() => {
    let unmounted = false;
    setShowDestError(false);
    return () => (unmounted = true);
  }, [destination]);

  return (
    <KeyboardAvoidingWrapper backgroundColor="#FFFFFF">
      <View style={styles.root}>
        {/* header */}
        <HeaderWithDeleteIcon
          back={goBack}
          deleting={confirmDelete}
          text="Transport"
          flexValue={1.95}
        />

        {/* empty space so shadow can be visible */}
        <Text />

        {/* body */}
        <View
          style={[
            styles.root,
            {
              paddingHorizontal: '8%',
            },
          ]}>
          {/* Field to input transport name. */}
          <Text style={styles.field}>Mode of Transport</Text>

          <InputFieldAfterLogIn
            placeholder="Mode of Transport"
            value={name}
            setValue={setName}
          />

          {showNameError ? <Text style={styles.error}>{nameError}</Text> : null}

          {/* Field to input start location */}
          <Text style={styles.field}>Starting Point</Text>

          <InputFieldAfterLogIn
            placeholder="Starting Point"
            value={startingPoint}
            setValue={setStartingPoint}
          />

          {showPointError ? (
            <Text style={styles.error}>{pointError}</Text>
          ) : null}

          {/* Field to input destination*/}
          <Text style={styles.field}>Destination</Text>

          <InputFieldAfterLogIn
            placeholder="Destination"
            value={destination}
            setValue={setDestination}
          />

          {showDestError ? <Text style={styles.error}>{destError}</Text> : null}

          <Text style={styles.field}>Start Time</Text>
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

          {showStartError ? (
            <Text style={styles.error}>{startError}</Text>
          ) : null}

          {/* Upload additional files */}
          <Text style={styles.field}>Additional Notes</Text>
          <View style={styles.horizontal}>
            <UploadFiles onPress={chooseFile} />
            {isDocChosen ? (
              <Text style={[styles.setText, {paddingLeft: 20}]}>
                File Uploaded.
              </Text>
            ) : null}
          </View>
          <Text style={styles.acceptedFiles}>
            Accepted file formats: .pdf, .docx, .jpeg, .png
          </Text>

          {/* Line breaks */}
          <Text>{'\n'}</Text>
          <Text>{'\n'}</Text>

          <CustomButton text="Update" onPress={update} type="TERTIARY" />

          {updating || deleting ? (
            <View
              style={{
                paddingTop: 20,
                alignSelf: 'center',
              }}>
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
  error: {
    color: '#a3160b',
    fontFamily: 'Poppins-Italic',
    fontSize: 12,
    paddingLeft: 10,
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
    fontSize: 12,
  },
  field: {
    fontFamily: 'Poppins-Medium',
    color: '#333333',
    paddingTop: 2,
  },
});
export default EditTransportScreen;
