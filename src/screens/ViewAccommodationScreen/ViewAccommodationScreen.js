import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import CustomButton from '../../components/CustomButton';
import {firebase} from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import * as OpenAnything from 'react-native-openanything';
import KeyboardAvoidingWrapper from '../../components/KeyboardAvoidingWrapper/KeyboardAvoidingWrapper';
import {HeaderWithoutDeleteIcon} from '../../components/Headers/Headers';
import {
  ReusableButton,
  ViewFiles,
} from '../../components/ButtonsAfterLogin/ButtonsAfterLogin';
import {
  FourLineBreak,
  SmallLineBreak,
} from '../../components/LineBreaks/LineBreaks';

const ViewAccommodationScreen = ({route}) => {
  const {id, itineraryStart, itineraryEnd, itemId, owner} = route.params;

  const navigation = useNavigation();

  // Set initial states of each field to be empty.
  const [name, setName] = useState('');

  // Date picker states.
  const [endDate, setEndDate] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date());

  // Neater dates to be displayed.
  const [startDateString, setStartDateString] = useState('');
  const [endDateString, setEndDateString] = useState('');

  // Google maps region.
  const [region, setRegion] = useState();

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

  const getData = async () => {
    let unmounted = false;
    firestore()
      .collection('itineraries')
      .doc(id)
      .collection('accommodation')
      .doc(itemId)
      .onSnapshot(documentSnapshot => {
        if (documentSnapshot.exists) {
          setName(documentSnapshot.data().name);
          setStartDate(documentSnapshot.data().checkInDate);
          setEndDate(documentSnapshot.data().checkOutDate);
          setStartDateString(
            documentSnapshot.data().checkInDate.toDate().toLocaleDateString(),
          );
          setEndDateString(
            documentSnapshot.data().checkOutDate.toDate().toLocaleDateString(),
          );
          setRegion(documentSnapshot.data().region);
          setFileUri(documentSnapshot.data().notes);
        }
      });

    return () => {
      unmounted = true;
    };
  };

  const getFileName = async () => {
    let unmounted = false;

    if (fileUri != null) {
      setChosen(true);
      const fileNotes = firebase.storage().refFromURL(fileUri).name;
      setFileName(fileNotes);
    }

    return () => {
      unmounted = true;
    };
  };

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
        <HeaderWithoutDeleteIcon
          onPress={() =>
            navigation.navigate('NewAccommodation', {
              id: id,
              itineraryStart: itineraryStart,
              itineraryEnd: itineraryEnd,
              owner: owner,
            })
          }
          text="Accommodation"
          flexValue={3.5}
        />

        <SmallLineBreak />

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

          <Text style={[styles.text, {paddingLeft: 20}]}>{name}</Text>

          <View style={{width: '33%'}}>
            <ReusableButton
              text="View in Maps"
              onPress={() =>
                navigation.navigate('ViewMap', {
                  location: region,
                })
              }
            />
          </View>

          {/* Field to input check-in date. */}
          <Text style={styles.field}>Check In Date</Text>

          <Text style={[styles.text, {paddingLeft: 20}]}>
            {startDateString}
          </Text>

          {/* Field to input check-out date. */}
          <Text style={styles.field}>Check Out Date</Text>

          <Text style={[styles.text, {paddingLeft: 20}]}>{endDateString}</Text>

          {/* Upload additional files */}
          <Text style={styles.field}>Additional Notes</Text>
          {fileUri != null ? (
            <Text style={[styles.text, {paddingLeft: 20}]}>{fileName}</Text>
          ) : (
            <Text style={[styles.text, {paddingLeft: 20}]}>-</Text>
          )}

          {fileUri != null ? (
            <ViewFiles onPress={() => OpenAnything.Web(fileUri)} />
          ) : null}

          {/* Line breaks */}
          {fileUri != null ? null : (
            <Text>
              {'\n'}
              {'\n'}
            </Text>
          )}

          <FourLineBreak />

          <CustomButton
            text="Edit"
            onPress={() => {
              navigation.navigate('EditAccommodation', {
                id: id,
                itemId: itemId,
                itineraryStart: itineraryStart,
                itineraryEnd: itineraryEnd,
                owner: owner,
                address: name,
                location: region,
              });
            }}
            type="TERTIARY"
          />
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
export default ViewAccommodationScreen;
