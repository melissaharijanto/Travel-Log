import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
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

const ViewTransportScreen = ({route, navigation}) => {
  const {id, itemId, dayLabel, date, owner} = route.params;

  // Set initial states of each field to be empty.
  const [name, setName] = useState();
  const [startingPoint, setStartingPoint] = useState();
  const [destination, setDestination] = useState();

  // Shows whether document for additional notes has been uploaded or not.
  const [isDocChosen, setChosen] = useState(false);

  //States for file uploading
  const [fileUri, setFileUri] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [file, setFile] = useState(null);

  const getData = () => {
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
          setFileUri(documentSnapshot.data().notes);
        }
      });
  };

  const getFileName = () => {
    if (fileUri != null) {
      setChosen(true);
      const fileNotes = firebase.storage().refFromURL(fileUri).name;
      setFileName(fileNotes);
    }
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
          text="Transport"
          flexValue={1.95}
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
          <Text style={styles.field}>Mode of Transport</Text>

          <Text style={[styles.text, {paddingLeft: 20}]}>{name}</Text>

          {/* Field to input check-in date. */}
          <Text style={styles.field}>Starting Point</Text>

          <Text style={[styles.text, {paddingLeft: 20}]}>{startingPoint}</Text>

          <Text style={styles.field}>Destination</Text>

          <Text style={[styles.text, {paddingLeft: 20}]}>{destination}</Text>

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
              navigation.navigate('EditTransport', {
                id: id,
                dayLabel: dayLabel,
                itemId: itemId,
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
export default ViewTransportScreen;
