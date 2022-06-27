import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import Back from 'react-native-vector-icons/Feather';
import Document from 'react-native-vector-icons/Ionicons';
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

/**
 * Anonymous class that renders AddTransportScreen.
 *
 * @param {*} route Argument that carries over the parameters passed from the previous screen.
 * @returns Render of AddTransportScreen.
 */
const AddTransportScreen = ({route}) => {
  /**
   * Navigation object.
   */
  const navigation = useNavigation();

  /**
   * Route parameters passed from the previous screen.
   */
  const {id, dayLabel, date, owner} = route.params;

  /**
   * State for accommodation name input field; default state is ''.
   */
  const [name, setName] = useState('');

  /**
   * State for starting point input field; default state is ''.
   */
  const [startingPoint, setStartingPoint] = useState('');

  /**
   * State for destination name input field; default state is ''.
   */
  const [destination, setDestination] = useState('');

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
   * State to show activity indicator when adding transport.
   */
  const [adding, setAdding] = useState(false);

  /**
   * State to show the start-time time picker.
   */
  const [isStartVisible, setStartVisible] = useState(false);

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
   * Function to add activity to Firestore database.
   */
  const add = async () => {
    // Variable for clean-up function.
    let unmounted = false;

    // State to show Activity Indicator.
    setAdding(true);

    // Error handling.
    if (name === '') {
      setNameError('Mode of transport is still empty.');
      setShowNameError(true);
      setAdding(false);
      return;
    } else if (startingPoint === '') {
      setPointError('Starting point is still empty.');
      setShowPointError(true);
      setShowNameError(false);
      setAdding(false);
      return;
    } else if (destination === '') {
      setDestError('Destination is still empty.');
      setShowDestError(true);
      setShowPointError(false);
      setShowNameError(false);
      setAdding(false);
      return;
    } else if (!isTimeChosen) {
      setStartError('Please pick a start time.');
      setShowStartError(true);
      setShowDestError(false);
      setShowPointError(false);
      setShowNameError(false);
      setAdding(false);
      return;
    }

    let fileUrl = await uploadFile();

    let itemId = Math.random().toString(36).slice(2);

    await firestore()
      .collection('itineraries')
      .doc(id)
      .collection('days')
      .doc(dayLabel)
      .collection('plans')
      .doc(itemId)
      .set({
        name: name,
        startingPoint: startingPoint,
        destination: destination,
        type: 'transport',
        id: itemId,
        time: startTime,
        notes: fileUrl,
      });

    // State to show Activity Indicator.
    setAdding(false);
    navigation.navigate('NewDay', {
      id: id,
      dayLabel: dayLabel,
      date: date,
      owner: owner,
    });

    // Returns clean-up function.
    return () => {
      unmounted = true;
    };
  };

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
        {/* Header */}
        <View style={styles.header}>
          <Back
            size={35}
            name="chevron-left"
            color="#808080"
            onPress={() =>
              navigation.navigate('NewDay', {
                id: id,
                dayLabel: dayLabel,
                date: date,
                owner: owner,
              })
            }
            style={{
              flex: 1,
              paddingTop: 2,
            }}
          />
          <Text style={styles.headerText}>Transport</Text>
        </View>

        {/* Empty space so shadow can be visible */}
        <Text />

        {/* Body */}
        <View
          style={[
            styles.root,
            {
              paddingHorizontal: '8%',
            },
          ]}>
          {/* Field to input transport name. */}
          <Text style={styles.text}>Mode of Transport</Text>

          <InputFieldAfterLogIn
            placeholder="Mode of Transport"
            value={name}
            setValue={setName}
          />

          {showNameError ? <Text style={styles.error}>{nameError}</Text> : null}

          {/* Field to input starting point */}
          <Text style={styles.text}>Starting Point</Text>

          <InputFieldAfterLogIn
            placeholder="Starting Point"
            value={startingPoint}
            setValue={setStartingPoint}
          />

          {showPointError ? (
            <Text style={styles.error}>{pointError}</Text>
          ) : null}

          {/* Field to input destination*/}
          <Text style={styles.text}>Destination</Text>

          <InputFieldAfterLogIn
            placeholder="Destination"
            value={destination}
            setValue={setDestination}
          />

          {showDestError ? <Text style={styles.error}>{destError}</Text> : null}

          <Text style={styles.text}>Start Time</Text>
          <View style={styles.horizontal}>
            {/* Button to set start time */}
            <Pressable onPress={showStartDatePicker} style={styles.button}>
              <Text style={styles.buttonText}>Pick Start Time</Text>
            </Pressable>
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
          <Text style={styles.text}>Additional Notes</Text>
          <View style={styles.horizontal}>
            {/* Button to pick a document */}
            <Pressable onPress={chooseFile} style={styles.button}>
              <Document
                name="document-outline"
                size={20}
                color="white"
                style={{
                  paddingLeft: '1%',
                }}
              />

              <Text style={styles.buttonText}>Upload Files</Text>
            </Pressable>
            {isDocChosen ? (
              <Text style={[styles.setText, {paddingLeft: 20}]}>
                {fileName}
              </Text>
            ) : null}
          </View>
          <Text style={styles.acceptedFiles}>
            Accepted file formats: .pdf, .docx, .jpeg, .png
          </Text>

          {/* Line breaks */}
          <Text>{'\n'}</Text>
          <Text>{'\n'}</Text>

          <CustomButton text="Add" onPress={add} type="TERTIARY" />

          {adding ? (
            <View
              style={{
                paddingTop: 20,
                alignSelf: 'center',
              }}>
              <ActivityIndicator size="large" color="#000000" />
            </View>
          ) : null}
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
  error: {
    color: '#a3160b',
    fontFamily: 'Poppins-Italic',
    fontSize: 12,
    paddingLeft: 10,
  },
  acceptedFiles: {
    fontFamily: 'Poppins-Italic',
    fontSize: 12,
    color: '#333333',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
    height: 65,
    width: '100%',
    paddingLeft: 10,
    elevation: 15,
    shadowColor: '#70D9D3',
    shadowOpacity: 1,
  },
  headerText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 26,
    color: '#3B4949',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    paddingTop: 9,
    flex: 1.95,
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 5,
    backgroundColor: '#70DAD3',
    borderRadius: 4,
    marginTop: 10,
    marginBottom: 8,
  },
  buttonText: {
    fontFamily: 'Poppins-Medium',
    color: 'white',
    paddingHorizontal: '2%',
    paddingTop: '1%',
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
});
export default AddTransportScreen;
