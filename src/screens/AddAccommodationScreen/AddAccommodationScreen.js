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
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import CustomButton from '../../components/CustomButton';
import DocumentPicker, {
  isInProgress,
  types,
} from 'react-native-document-picker';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import KeyboardAvoidingWrapper from '../../components/KeyboardAvoidingWrapper/KeyboardAvoidingWrapper';

/**
 * Anonymous class that renders AddAccommodationScreen.
 *
 * @param {*} route Argument that carries over the parameters passed from the previous screen.
 * @returns Render of AddAccommodationScreen.
 */
const AddAccommodationScreen = ({route}) => {
  /**
   * Route parameters passed from the previous screen.
   */
  const {id, itineraryStart, itineraryEnd, owner} = route.params;

  /**
   * Navigation object.
   */
  const navigation = useNavigation();

  /**
   * State for accommodation name input field; default state is ''.
   */
  const [name, setName] = useState('');

  /**
   * State for check-out date input field; default state is current date.
   */
  const [endDate, setEndDate] = useState(new Date());

  /**
   * State for the check-in date input field; default state is current date.
   */
  const [startDate, setStartDate] = useState(new Date());

  /**
   * Date string that will be displayed when the check-in date is picked.
   * Will be displayed in form of mm/dd/yy.
   */
  const [startDateString, setStartDateString] = useState('');

  /**
   * Date string that will be displayed when the check-out date is picked.
   * Will be displayed in form of mm/dd/yy.
   */
  const [endDateString, setEndDateString] = useState('');

  /**
   * State to display the date picker for the check-in date.
   * If true, date picker will show; if false, the date picker will be closed.
   */
  const [isStartVisible, setStartVisible] = useState(false);

  /**
   * State to display the date picker for the check-out date.
   * If true, date picker will show; if false, the date picker will be closed.
   */
  const [isEndVisible, setEndVisible] = useState(false);

  /**
   * Error message that will show if
   * accommodation name is left as empty.
   */
  const [nameError, setNameError] = useState('');

  /**
   * State that will show the error message for the
   * accommodation name if left empty. If true, the
   * message will show.
   */
  const [showNameError, setShowNameError] = useState(false);

  /**
   * Error message that will show if
   * check-in date is not picked.
   */
  const [startError, setStartError] = useState('');

  /**
   * State that will show the error message for the
   * check-in date if not picked. If true, the
   * message will show.
   */
  const [showStartError, setShowStartError] = useState(false);

  /**
   * Error message that will show if
   * check-out date is not picked.
   */
  const [endError, setEndError] = useState('');

  /**
   * State that will show the error message for the
   * check-out date if not picked. If true, the
   * message will show.
   */
  const [showEndError, setShowEndError] = useState(false);

  /**
   * State that will show the error message if the
   * check-out date < check-in date (number of days is negative).
   */
  const [error, setError] = useState('');

  /**
   * State that will show the error message if the
   * number of days is negative. If true, the
   * message will show.
   */
  const [showError, setShowError] = useState('');

  /**
   * State that will show whether file for the additional
   * notes has been picked or not.
   */
  const [isDocChosen, setChosen] = useState(false);

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
   * State to show activity indicator when adding accommodation.
   */
  const [adding, setAdding] = useState(false);

  /**
   * Function to show the check-in date picker.
   */
  const showStartDatePicker = () => {
    setStartVisible(true);
    setEndVisible(false);
  };

  /**
   * Function to show the check-out date picker.
   */
  const showEndDatePicker = () => {
    setStartVisible(false);
    setEndVisible(true);
  };

  /**
   * Function to hide the check-in or check-out date picker.
   */
  const hideDatePicker = () => {
    setStartVisible(false);
    setEndVisible(false);
  };

  /**
   * Function to save the check-in date that has been picked by the user.
   *
   * @param {Date} date The check-in date that has been picked by the user.
   */
  const handleConfirm = date => {
    console.log('A start date has been picked: ', date);
    setStartDate(date);
    setStartDateString(date.toLocaleDateString());
    setStartError(false);
    hideDatePicker();
  };

  /**
   * Function to save the check-out date that has been picked by the user.
   *
   * @param {Date} date The check-out date that has been picked by the user.
   */
  const handleEndConfirm = date => {
    console.log('An end date has been picked: ', date);
    setEndDate(date);
    setEndDateString(date.toLocaleDateString());
    setEndError(false);
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
   * Function to upload file to Firebase Storage.
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
   * Function to add the document in Firestore Database.
   *
   * @returns Clean-up function.
   */
  const add = async () => {
    // Variable for clean-up function.
    let unmounted = false;

    // State to show Activity Indicator.
    setAdding(true);

    // Randomizer for unique item id.
    let itemId = Math.random().toString(36).slice(2);

    // Difference of days between the check-out date and check-in date.
    const difference = endDate.getTime() - startDate.getTime();

    // Error handling.
    if (name === '') {
      setNameError('Accommodation name is still empty.');
      setShowNameError(true);
      setAdding(false);
      return () => {
        unmounted = true;
      };
    } else if (startDateString === '') {
      setShowNameError(false);
      setStartError('Check in date is still empty.');
      setShowStartError(true);
      setAdding(false);
      return () => {
        unmounted = true;
      };
    } else if (endDateString === '') {
      setShowStartError(false);
      setShowNameError(false);
      setEndError('Check out date is still empty.');
      setShowEndError(true);
      setAdding(false);
      return () => {
        unmounted = true;
      };
    } else if (difference < 0) {
      setShowStartError(false);
      setShowNameError(false);
      setShowEndError(false);
      setError('Number of days should not be negative.');
      setShowError(true);
      setAdding(false);
      return () => {
        unmounted = true;
      };
    }

    let fileUrl = await uploadFile();

    firestore()
      .collection('itineraries')
      .doc(id)
      .collection('accommodation')
      .doc(itemId)
      .onSnapshot(documentSnapshot => {
        if (documentSnapshot.exists) {
          itemId = Math.random().toString(36).slice(2);
        }
      });

    await firestore()
      .collection('itineraries')
      .doc(id)
      .collection('accommodation')
      .doc(itemId)
      .set({
        name: name,
        checkInDate: startDate,
        checkOutDate: endDate,
        notes: fileUrl,
        type: 'accommodation',
        id: itemId,
      });

    // State to hide Activity Indicator.
    setAdding(false);
    navigation.navigate('NewAccommodation', {
      id: id,
      itineraryStart: itineraryStart,
      itineraryEnd: itineraryEnd,
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
    setShowNameError(false);
  }, [name]);

  return (
    <KeyboardAvoidingWrapper backgroundColor="#FFFFFF">
      <View style={styles.root}>
        {/* Header */}
        <View style={styles.header}>
          <Back
            size={35}
            name="chevron-left"
            color="#808080"
            onPress={() => navigation.goBack()}
            style={{
              flex: 1,
              paddingTop: 2,
            }}
          />
          <Text style={styles.headerText}>Accommodation</Text>
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
          {/* Field to input accommodation name. */}
          <Text style={styles.text}>Accommodation Name</Text>

          <InputFieldAfterLogIn
            placeholder="Accommodation Name"
            value={name}
            setValue={setName}
          />

          {showNameError ? <Text style={styles.error}>{nameError}</Text> : null}

          {/* Field to input check-in date. */}
          <Text style={styles.text}>Check In Date</Text>
          <View style={styles.horizontal}>
            {/* Button to pick check-in date */}
            <Pressable onPress={showStartDatePicker} style={styles.button}>
              <Text style={styles.buttonText}>Pick Check In Date</Text>
            </Pressable>
            <Text style={[styles.setText, {paddingLeft: 20}]}>
              {startDateString}
            </Text>
          </View>
          <DateTimePickerModal
            isVisible={isStartVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
            minimumDate={itineraryStart.toDate()}
            maximumDate={itineraryEnd.toDate()}
          />

          {showStartError ? (
            <Text style={styles.error}>{startError}</Text>
          ) : null}

          {/* Field to input check-out date */}
          <Text style={styles.text}>Check Out Date</Text>

          <View style={styles.horizontal}>
            {/* Button to pick check-out date */}
            <Pressable onPress={showEndDatePicker} style={styles.button}>
              <Text style={styles.buttonText}>Pick Check Out Date</Text>
            </Pressable>
            <Text style={[styles.setText, {paddingLeft: 20}]}>
              {endDateString}
            </Text>
          </View>
          <DateTimePickerModal
            isVisible={isEndVisible}
            mode="date"
            onConfirm={handleEndConfirm}
            onCancel={hideDatePicker}
            minimumDate={startDate}
            maximumDate={itineraryEnd.toDate()}
          />

          {showEndError ? <Text style={styles.error}>{endError}</Text> : null}

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
          <Text>{'\n'}</Text>
          <Text>{'\n'}</Text>

          <CustomButton text="Add" onPress={add} type="TERTIARY" />

          {showError ? <Text style={styles.error}>{error}</Text> : null}

          {adding ? (
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
    flex: 3.8,
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
export default AddAccommodationScreen;
