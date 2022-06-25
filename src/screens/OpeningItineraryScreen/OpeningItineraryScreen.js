import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
  FlatList,
  Alert,
} from 'react-native';
import EditIcon from 'react-native-vector-icons/AntDesign';
import CopyIcon from 'react-native-vector-icons/MaterialIcons';
import Back from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import DayTab from '../../components/DayTab';
import Clipboard from '@react-native-community/clipboard';
import firestore from '@react-native-firebase/firestore';
import AccommodationMainTab from '../../components/AccommodationMainTab';
import auth from '@react-native-firebase/auth';

const OpeningItineraryScreen = ({route}) => {
  // Initializing parameters passed by previous route.
  const {itinerary} = route.params;

  // Navigation object.
  const navigation = useNavigation();

  /*
        Custom date string; will return date in the format as shown in the
        following example: Wednesday, 15 June 2022.
    */
  const dateString = date => {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    const days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    return `${days[date.getDay()]}, ${date.getDate()} ${
      months[date.getMonth()]
    } ${date.getFullYear()}`;
  };

  // Navigates to EditItineraryScreen.
  const editItinerary = () => {
    navigation.navigate('EditItinerary', {
      itinerary: itinerary,
    });
  };

  const notOwner = () => {
    Alert.alert('Unable to edit', 'You are not the owner of this itinerary.');
  };
  /*
        Initializing the days from the database; data will be used
        for the FlatList in the return statement.
    */
  const [days, setDays] = useState(null);

  /*
        Getting the data for the days from the database and initializing
        the 'days' state as an array of data.
    */
  const getDays = () => {
    let unmounted = false;
    try {
      const daysList = [];
      firestore()
        .collection('itineraries')
        .doc(itinerary.id)
        .collection('days')
        .orderBy('id')
        .onSnapshot(querySnapshot => {
          if (querySnapshot.empty) {
            console.log('Query is empty.');
            return;
          }
          querySnapshot.forEach(doc => {
            const {date, id, label, from} = doc.data();

            daysList.push({
              id: id,
              date: date,
              label: label,
              from: from,
            });

            setDays(daysList);
          });
        });
    } catch (e) {
      console.log(e);
    }

    return () => {
      unmounted = true;
    };
  };

  // Navigation function to go back to the previous screen.
  const goBack = () => {
    navigation.goBack();
  };

  // getDays() will run upon navigating to this page.
  useEffect(() => {
    let unmounted = false;
    getDays();
    return () => {
      unmounted = true;
    };
  }, []);

  // getDays() will run upon change of route.
  useEffect(() => {
    let unmounted = false;
    getDays();
    return () => {
      unmounted = true;
    };
  }, [route]);

  return (
    <View style={styles.view}>
      {/* Displaying the cover image */}
      <ImageBackground
        source={{uri: itinerary.coverImage}}
        style={styles.coverImage}>
        <View style={styles.overlay} />
        <Back
          size={35}
          name="chevron-left"
          color="#FFFFFF"
          onPress={goBack}
          style={{
            flex: 1,
            paddingTop: 20,
            paddingLeft: 15,
          }}
        />

        <Text style={styles.imageSubtitle}>You are opening</Text>

        <View style={styles.horizontal}>
          <Text style={styles.imageHeader}>{itinerary.title} </Text>
          <EditIcon
            size={25}
            name="edit"
            color="#FFFFFF"
            onPress={
              itinerary.owner === auth().currentUser.uid
                ? editItinerary
                : notOwner
            }
          />
        </View>
        <View style={styles.horizontal}>
          <Text style={styles.imageText}>Invite Code: {itinerary.id} </Text>
          <CopyIcon
            size={15}
            name="content-copy"
            color="#FFFFFF"
            onPress={() => {
              Clipboard.setString(itinerary.id);
              Alert.alert(
                'Success!',
                'Invite code has been copied to clipboard.',
              );
            }}
            style={{
              flex: 1,
              paddingTop: 5,
            }}
          />
        </View>
      </ImageBackground>

      <View style={{paddingHorizontal: '4%', marginTop: 5, marginBottom: 10}}>
        <AccommodationMainTab
          onPress={() => {
            navigation.navigate('NewAccommodation', {
              id: itinerary.id,
              itineraryStart: itinerary.startDate,
              itineraryEnd: itinerary.endDate,
              owner: itinerary.owner,
            });
          }}
        />
      </View>

      <View
        style={{
          borderBottomColor: '#70D9D3',
          borderBottomWidth: StyleSheet.hairlineWidth,
        }}
      />

      {/* Container for the DayTabs */}
      <View style={styles.content}>
        <FlatList
          data={days}
          numColumns={1}
          renderItem={({item}) => (
            <DayTab
              text={item.label}
              subtext={dateString(item.date.toDate())}
              onPress={() => {
                navigation.navigate('NewDay', {
                  id: itinerary.id,
                  dayLabel: item.label,
                  owner: itinerary.owner,
                  date: item.date,
                });
              }}
            />
          )}
          ItemSeparatorComponent={() => <View style={{marginBottom: 5}} />}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  content: {
    paddingHorizontal: '4%',
    paddingTop: 10,
    flex: 1,
    paddingBottom: 10,
  },
  coverImage: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width / 2,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#00000050',
  },
  horizontal: {
    flexDirection: 'row',
  },
  imageHeader: {
    fontFamily: 'Poppins-Bold',
    color: '#FFFFFF',
    fontSize: 26,
    elevation: 10,
    shadowOpacity: 1,
    shadowRadius: 1,
    paddingLeft: 20,
    lineHeight: 30,
  },
  imageSubtitle: {
    fontFamily: 'Poppins-Regular',
    color: '#FFFFFF',
    fontSize: 18,
    elevation: 10,
    shadowOpacity: 1,
    shadowRadius: 1,
    paddingLeft: 20,
    lineHeight: 30,
  },
  imageText: {
    fontFamily: 'Poppins-Regular',
    color: '#FFFFFF',
    fontSize: 12,
    elevation: 10,
    shadowOpacity: 1,
    shadowRadius: 1,
    paddingLeft: 20,
    lineHeight: 30,
    paddingBottom: 5,
  },
  view: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default OpeningItineraryScreen;
