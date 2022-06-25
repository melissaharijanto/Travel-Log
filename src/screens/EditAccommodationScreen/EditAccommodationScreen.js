import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Pressable,
  Alert,
} from 'react-native';
import Back from 'react-native-vector-icons/Feather';
import CustomButton from '../../components/CustomButton';
import {firebase} from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import InputFieldAfterLogIn from '../../components/InputFieldAfterLogIn';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Document from 'react-native-vector-icons/Ionicons';
import DocumentPicker, {
  isInProgress,
  types,
} from 'react-native-document-picker';
import storage from '@react-native-firebase/storage';
import DeleteIcon from 'react-native-vector-icons/Feather';
import KeyboardAvoidingWrapper from '../../components/KeyboardAvoidingWrapper/KeyboardAvoidingWrapper';

const EditAccommodationScreen = ({route}) => {
  const {id, itemId, itineraryStart, itineraryEnd, owner} = route.params;

  const navigation = useNavigation();

  // Set initial states of each field to be empty.
  const [name, setName] = useState('');

  // Date picker states.
  const [endDate, setEndDate] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date());

  // Neater dates to be displayed.
  const [startDateString, setStartDateString] = useState('');
  const [endDateString, setEndDateString] = useState('');

  /*
        Once the date has been decided, the state will turn true
        and the selected dates will be displayed.
    */
  const [isStartVisible, setStartVisible] = useState(false);
  const [isEndVisible, setEndVisible] = useState(false);

  // Shows whether document for additional notes has been uploaded or not.
  const [isDocChosen, setChosen] = useState(false);

  //States for file uploading
  const [fileUri, setFileUri] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [file, setFile] = useState(null);

  // Updating state
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // Error Messages
  const [nameError, setNameError] = useState('');
  const [showNameError, setShowNameError] = useState(false);

  const [startError, setStartError] = useState('');
  const [showStartError, setShowStartError] = useState(false);

  const [endError, setEndError] = useState('');
  const [showEndError, setShowEndError] = useState(false);

  const [error, setError] = useState('');
  const [showError, setShowError] = useState('');

  // Date picker function to show the date picker for the check-in date.
  const showStartDatePicker = () => {
    setStartVisible(true);
    setEndVisible(false);
  };

  // Date picker function to show the date picker for the check-out date.
  const showEndDatePicker = () => {
    setStartVisible(false);
    setEndVisible(true);
  };

  // Hides date-picker once a date has been selected and confirmed.
  const hideDatePicker = () => {
    setStartVisible(false);
    setEndVisible(false);
  };

  // Sets check-in date once it has been confirmed by the user.
  const handleConfirm = date => {
    console.log('A start date has been picked: ', date);
    setStartDate(date);
    setStartDateString(date.toLocaleDateString());
    setStartError(false);
    hideDatePicker();
  };

  // Sets check-out date once it has been confirmed by the user.
  const handleEndConfirm = date => {
    console.log('An end date has been picked: ', date);
    setEndDate(date);
    setEndDateString(date.toLocaleDateString());
    setEndError(false);
    hideDatePicker();
  };

  //Choose which file to upload.
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

  // Uploading file to Firebase Storage
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

  const update = async () => {
    let unmounted = false;

    const difference = endDate.getTime() - startDate.getTime();

    if (name === '') {
      setNameError('Accommodation name is still empty.');
      setShowNameError(true);
      setUpdating(false);
      return () => {
        unmounted = true;
      };
    } else if (startDateString === '') {
      setShowNameError(false);
      setStartError('Check in date is still empty.');
      setShowStartError(true);
      setUpdating(false);
      return () => {
        unmounted = true;
      };
    } else if (endDateString === '') {
      setShowStartError(false);
      setShowNameError(false);
      setEndError('Check out date is still empty.');
      setShowEndError(true);
      setUpdating(false);
      return () => {
        unmounted = true;
      };
    } else if (difference < 0) {
      setShowStartError(false);
      setShowNameError(false);
      setShowEndError(false);
      setError('Number of days should not be negative.');
      setShowError(true);
      setUpdating(false);
      return () => {
        unmounted = true;
      };
    }

    setUpdating(true);

    let fileUrl = await uploadFile();

    if (fileUrl == null && fileUri) {
      fileUrl = fileUri;
    }

    await firestore()
      .collection('itineraries')
      .doc(id)
      .collection('accommodation')
      .doc(itemId)
      .update({
        name: name,
        checkInDate: startDate,
        checkOutDate: endDate,
        notes: fileUrl,
      });

    setUpdating(false);

    navigation.navigate('ViewAccommodation', {
      id: id,
      itemId: itemId,
      itineraryStart: itineraryStart,
      itineraryEnd: itineraryEnd,
      owner: owner,
    });

    return () => {
      unmounted = true;
    };
  };

  const confirmDelete = () => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this accommodation?',
      [
        {
          text: 'Cancel',
          onPress: () => {
            navigation.navigate('EditAccommodation', {
              id: id,
              itemId: itemId,
              itineraryStart: itineraryStart,
              itineraryEnd: itineraryEnd,
              owner: owner,
            });
          },
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: async () => {
            await handleDelete();
            console.log('Deleted.');
          },
        },
      ],
    );
  };

  // c: implement this
  const handleDelete = async () => {
    let unmounted = false;
    setDeleting(true);
    await firestore()
      .collection('itineraries')
      .doc(id)
      .collection('accommodation')
      .doc(itemId)
      .delete()
      .then(() => {
        console.log('Accommodation deleted.');
        setDeleting(false);
        navigation.navigate('NewAccommodation', {
          id: id,
          itineraryStart: itineraryStart,
          itineraryEnd: itineraryEnd,
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

  const getData = () => {
    let unmounted = false;
    firestore()
      .collection('itineraries')
      .doc(id)
      .collection('accommodation')
      .doc(itemId)
      .onSnapshot(documentSnapshot => {
        if (documentSnapshot.exists) {
          setName(documentSnapshot.data().name);
          setStartDate(documentSnapshot.data().checkInDate.toDate());
          setEndDate(documentSnapshot.data().checkOutDate.toDate());
          setStartDateString(
            documentSnapshot.data().checkInDate.toDate().toLocaleDateString(),
          );
          setEndDateString(
            documentSnapshot.data().checkOutDate.toDate().toLocaleDateString(),
          );
          setFileUri(documentSnapshot.data().notes);
        }
      });

    return () => {
      unmounted = true;
    };
  };

  const getFileName = () => {
    let unmounted = false;
    if (fileUri != null) {
      setChosen(true);
    }

    return () => {
      unmounted = true;
    };
  };

  useEffect(() => {
    setShowNameError(false);
  }, [name]);
  useEffect(() => {
    let unmounted = false;
    getData();
    return () => {
      unmounted = true;
    };
  }, [route]);

  useEffect(() => {
    let unmounted = false;
    getFileName();
    return () => {
      unmounted = true;
    };
  }, [fileUri]);

  return (
    <KeyboardAvoidingWrapper backgroundColor="#FFFFFF">
      <View style={styles.root}>
        {/* header */}
        <View style={styles.header}>
          <Back
            size={35}
            name="chevron-left"
            color="#808080"
            onPress={() =>
              navigation.navigate('ViewAccommodation', {
                id: id,
                itemId: itemId,
                itineraryStart: itineraryStart,
                itineraryEnd: itineraryEnd,
                owner: owner,
              })
            }
            style={{
              flex: 1,
              paddingTop: 2,
            }}
          />
          <Text style={styles.headerText}>Accommodation</Text>

          <DeleteIcon
            name="trash-2"
            size={25}
            onPress={confirmDelete}
            style={{
              paddingRight: 20,
            }}
          />
        </View>

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
          {/* Field to input accommodation name. */}
          <Text style={styles.field}>Accommodation Name</Text>

          <InputFieldAfterLogIn
            placeholder="Accommodation Name"
            value={name}
            setValue={setName}
          />

          {showNameError ? <Text style={styles.error}>{nameError}</Text> : null}

          {/* Field to input check-in date. */}
          <Text style={styles.field}>Check In Date</Text>

          <View style={styles.horizontal}>
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

          {/* Field to input check-out date. */}
          <Text style={styles.field}>Check Out Date</Text>

          <View style={styles.horizontal}>
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
          <Text style={styles.field}>Additional Notes</Text>
          <View style={styles.horizontal}>
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
                File uploaded.
              </Text>
            ) : null}
          </View>

          {/* Line breaks */}
          <Text>{'\n'}</Text>
          <Text>{'\n'}</Text>
          <Text>{'\n'}</Text>
          <Text>{'\n'}</Text>
          <Text>{'\n'}</Text>
          <Text>{'\n'}</Text>

          <CustomButton text="Update" onPress={update} type="TERTIARY" />

          {showError ? <Text style={styles.error}>{error}</Text> : null}

          {updating || deleting ? (
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
  error: {
    color: '#a3160b',
    fontFamily: 'Poppins-Italic',
    fontSize: 12,
    paddingLeft: 10,
  },
  setText: {
    fontFamily: 'Poppins-Italic',
    color: '#333333',
    paddingTop: 2,
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
    flex: 3.5,
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  field: {
    fontFamily: 'Poppins-Regular',
    color: '#333333',
    paddingTop: 2,
  },
  text: {
    paddingVertical: 18,
    fontFamily: 'Poppins-Medium',
    color: '#333333',
  },
});
export default EditAccommodationScreen;
