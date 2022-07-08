import React, {useEffect, useState} from 'react';
import {View, Text, Image, StyleSheet, FlatList} from 'react-native';
import AccommodationTab from '../../components/AccommodationTab';
import ActionButton from 'react-native-action-button-warnings-fixed';
import Accommodation from '../../../assets/images/Accommodation.png';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {HeaderWithoutDeleteIcon} from '../../components/Headers/Headers';
import {SmallLineBreak} from '../../components/LineBreaks/LineBreaks';
import NewDaySkeleton from '../../components/NewDaySkeleton';

/**
 * Anonymous class that renders NewAccommodationScreen.
 * NewAccommodationScreen shows the list of accommodations that
 * the user is staying at in one specific trip.
 *
 * This page is made specifically to cater to users who like to
 * travel and switch accommodations after a few days; users are able
 * to input as many accommodations as they like within the start and
 * end date of the itinerary that they have specified when they
 * first made it.
 *
 * @param {*} route Argument that carries over the parameters passed from the previous screen.
 * @param {*} navigation Navigation prop.
 * @returns Render of NewAccommodationScreen.
 */
const NewAccommodationScreen = ({route, navigation}) => {
  /**
   * State for accommodation list.
   * Once initialized, it will be an array to store the
   * accommodation data that is fetched from Firestore.
   */
  const [accommodation, setAccommodation] = useState(null);

  /**
   * Route parameters that are passed on from the previous screen.
   */
  const {id, itineraryStart, itineraryEnd, owner} = route.params;

  /**
   * State to see whether the accommodation list is loading while fetching
   * the list from the database.
   */
  const [loading, setLoading] = useState(true);

  /**
   * State that can be true, or false. This state is used to facilitate the
   * 'View a friend's itinerary' feature. Can be true or false.
   */
  const [itineraryOwner, isOwner] = useState();

  /**
   * An empty function. This is used if itineraryOwner is false; users won't be
   * able to navigate to ViewAccommodationScreen.
   */
  const viewOnly = () => {};

  /**
   * Fetches accommodation data from Firestore database.
   *
   * @returns Clean-up function.
   */
  const getAccommodation = () => {
    let unmounted = false;
    const accommodationList = [];
    firestore()
      .collection('itineraries')
      .doc(id)
      .collection('accommodation')
      .orderBy('checkInDate')
      .onSnapshot(querySnapshot => {
        if (querySnapshot.empty) {
          if (loading) {
            setLoading(false);
          }
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
        if (loading) {
          setLoading(false);
        }
      });
    return () => {
      unmounted = true;
    };
  };

  /**
   * Hook to determine whether the user accessing the itinerary
   * is the owner upon change of route.
   */
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

  /**
   * Hook to run getAccommodation upon change of route.
   */
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
      <HeaderWithoutDeleteIcon
        onPress={() => navigation.goBack()}
        text="Accommodation"
        flexValue={3.5}
      />

      <SmallLineBreak />

      {loading ? (
        <NewDaySkeleton />
      ) : (
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
      )}

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
    alignItems: 'center',
    backgroundColor: 'white',
    width: '100%',
  },
  content: {
    width: '100%',
    paddingHorizontal: '5%',
    flex: 1,
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
