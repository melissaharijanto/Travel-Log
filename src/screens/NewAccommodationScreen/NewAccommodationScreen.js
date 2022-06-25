import React, {useEffect, useState} from 'react';
import {View, Text, Image, StyleSheet, FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Back from 'react-native-vector-icons/Feather';
import AccommodationTab from '../../components/AccommodationTab';
import ActionButton from 'react-native-action-button-warnings-fixed';
import Accommodation from '../../../assets/images/Accommodation.png';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const NewAccommodationScreen = ({route}) => {
  const navigation = useNavigation();

  const [accommodation, setAccommodation] = useState(null);

  const {id, itineraryStart, itineraryEnd, owner} = route.params;

  const [itineraryOwner, isOwner] = useState();

  const viewOnly = () => {};

  const placeholder = () => {};

  const getAccommodation = async () => {
    let unmounted = false;
    const accommodationList = [];
    firestore()
      .collection('itineraries')
      .doc(id)
      .collection('accommodation')
      .orderBy('checkInDate')
      .onSnapshot(querySnapshot => {
        if (querySnapshot.empty) {
          return;
        }

        querySnapshot.forEach(doc => {
          const {name, checkInDate, checkOutDate, notes, id, type} = doc.data();

          accommodationList.push({
            name: name,
            checkInDate: checkInDate,
            checkOutDate: checkOutDate,
            notes: notes,
            type: type,
            id: id,
          });
          setAccommodation(accommodationList);
        });
      });
    return () => {
      unmounted = true;
    };
  };

  useEffect(() => {
    let unmounted = false;

    if (auth().currentUser.uid === owner) {
      isOwner(true);
      console.log('Is owner!');
    } else {
      isOwner(false);
      console.log('Not owner!');
    }

    return () => {
      unmounted = true;
    };
  }, [route]);

  useEffect(() => {
    let unmounted = false;
    getAccommodation();
    return () => {
      unmounted = true;
    };
  }, [route]);

  return (
    <View style={styles.root}>
      {/* header */}
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

      <Text />
      <View style={styles.content}>
        <FlatList
          data={accommodation}
          numColumns={1}
          renderItem={({item}) => (
            <AccommodationTab
              onPress={() => {
                if (itineraryOwner) {
                  navigation.navigate('ViewAccommodation', {
                    id: id,
                    itineraryStart: itineraryStart,
                    itineraryEnd: itineraryEnd,
                    itemId: item.id,
                    owner: owner,
                  });
                } else {
                  viewOnly();
                }
              }}
              text={item.name}
              subtext={`${item.checkInDate
                .toDate()
                .toLocaleDateString()} - ${item.checkOutDate
                .toDate()
                .toLocaleDateString()}`}
            />
          )}
          keyExtractor={(contact, index) => String(index)}
          ItemSeparatorComponent={() => <View style={{marginBottom: 5}} />}
        />
      </View>

      {/* Edit action button onPress later */}
      {itineraryOwner ? (
        <ActionButton
          shadowStyle={styles.shadow}
          buttonColor="#70D9D3"
          size={65}
          spacing={15}>
          <ActionButton.Item
            size={55}
            buttonColor="#70D9D3"
            title="Accommodation"
            onPress={() =>
              navigation.navigate('AddAccommodation', {
                id: id,
                itineraryStart: itineraryStart,
                itineraryEnd: itineraryEnd,
                owner: owner,
              })
            }
            textStyle={styles.buttonText}
            shadowStyle={styles.shadow}>
            <Image source={Accommodation} style={{width: 55, height: 55}} />
          </ActionButton.Item>
        </ActionButton>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'flex-start',
    backgroundColor: 'white',
    width: '100%',
  },
  content: {
    width: '100%',
    paddingHorizontal: '5%',
    flex: 1,
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
  text: {
    fontFamily: 'Poppins-Medium',
    color: '#333333',
    paddingTop: 2,
  },
  buttonText: {
    fontFamily: 'Poppins-Regular',
    color: '#70D9D3',
  },
  shadow: {
    shadowOpacity: 1,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 10,
    elevation: 8,
  },
});

export default NewAccommodationScreen;
