import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Back from 'react-native-vector-icons/Feather';
import CustomButton from '../../components/CustomButton';
import {firebase} from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import * as OpenAnything from 'react-native-openanything';
import KeyboardAvoidingWrapper from '../../components/KeyboardAvoidingWrapper';
import {HeaderWithoutDeleteIcon} from '../../components/Headers/Headers';
import {ViewFiles} from '../../components/ButtonsAfterLogin/ButtonsAfterLogin';
import {
  FourLineBreak,
  SmallLineBreak,
} from '../../components/LineBreaks/LineBreaks';

const ViewActivityScreen = ({route}) => {
  const {id, itemId, dayLabel, date, owner} = route.params;

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

  const navigation = useNavigation();

  // Set initial states of each field to be empty.
  const [name, setName] = useState(null);
  const [location, setLocation] = useState(null);
  const [startTime, setStartTime] = useState(new Date());

  // Shows whether document for additional notes has been uploaded or not.
  const [isDocChosen, setChosen] = useState(false);

  //States for file uploading
  const [fileUri, setFileUri] = useState(null);
  const [fileName, setFileName] = useState(null);

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
            navigation.navigate('NewDay', {
              id: id,
              dayLabel: dayLabel,
              date: date,
              owner: owner,
            })
          }
          text="Activity"
          flexValue={1.8}
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
          {/* Displays accommodation name. */}
          <Text style={styles.field}>Activity Name</Text>

          <Text style={[styles.text, {paddingLeft: 20}]}>{name}</Text>

          {/* Displays Location. */}
          <Text style={styles.field}>Location</Text>

          <Text style={[styles.text, {paddingLeft: 20}]}>{location}</Text>

          {/* Displays start time. */}
          <Text style={styles.field}>Start Time</Text>

          <Text style={[styles.text, {paddingLeft: 20}]}>
            {getTime(startTime)}
          </Text>

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

          <FourLineBreak />

          {fileUri != null ? null : (
            <Text style={{paddingTop: 10}}>{'\n'}</Text>
          )}

          <CustomButton
            text="Edit"
            onPress={() => {
              navigation.navigate('EditActivity', {
                id: id,
                itemId: itemId,
                dayLabel: dayLabel,
                date: date,
                owner: owner,
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
export default ViewActivityScreen;
