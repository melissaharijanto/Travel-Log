import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import CustomButton from '../../components/CustomButton';
import ItineraryTab from '../../components/ItineraryTab';
import InputFieldAfterLogin from '../../components/InputFieldAfterLogIn';
import KeyboardAvoidingWrapper from '../../components/KeyboardAvoidingWrapper/KeyboardAvoidingWrapper';
import {useFocusEffect} from '@react-navigation/native';
import {
  HomeUserSkeleton,
  LatestItinerarySkeleton,
  PastItinerariesSkeleton,
} from '../../components/HomeSkeleton/HomeSkeleton';

const HomeScreen = () => {
  /**
   * Gets authentication data of the current user logged in.
   */
  const user = auth().currentUser;

  /**
   * Navigation object.
   */
  const navigation = useNavigation();

  /**
   * Navigates to a page to create new itinerary.
   */
  const addNewItinerary = () => {
    navigation.navigate('NewItinerary');
  };

  /**
   * State to initialize user data fetched from Firestore.
   */
  const [userData, setUserData] = useState(null);

  /**
   * State to initialize user's display name fetched from Firestore.
   */
  const [name, setName] = useState(null);
  /**
   * Error message for 'View others' itineraries' feature.
   * If code is invalid, this will be the error message.
   */
  const [errorMessage, setErrorMessage] = useState(null);

  /**
   * State to show the error message. If true, the error message
   * will show, else it will not show.
   */
  const [showError, setShowError] = useState(false);

  /**
   * State for 'View a friend's itinerary' field.
   * Should consist of an itinerary's unique code.
   */
  const [code, setCode] = useState();

  /**
   * State for user's itinerary count. Default state is 0.
   */
  const [itineraryCount, setItineraryCount] = useState(0);

  /**
   * State for user's latest itinerary object.
   */
  const [latestItinerary, setLatestItinerary] = useState(null);

  /**
   * State for user's latest itinerary title.
   */
  const [latestItineraryTitle, setLatestItineraryTitle] = useState(null);

  /**
   * State for user's latest itinerary's cover image.
   */
  const [latestItineraryImage, setLatestItineraryImage] = useState(null);

  /**
   * State for user's past itineraries' object.
   */
  const [pastItineraries, setPastItineraries] = useState(null);

  const [loadingUser, setLoadUser] = useState(true);

  const [loadingLatestItinerary, setLoadLatestItinerary] = useState(true);

  const [loadingPastItineraries, setLoadPastItineraries] = useState(true);

  /**
   * Function to query for the itinerary with the code
   * that the user inputted.
   *
   * @returns Clean-up function.
   */
  const viewItinerary = async () => {
    let unmounted = false;
    await firestore()
      .collection('itineraries')
      .doc(code)
      .get()
      .then(documentSnapshot => {
        if (documentSnapshot.exists) {
          navigation.navigate('OpenItinerary', {
            itinerary: documentSnapshot.data(),
          });
        } else {
          setErrorMessage('Invalid Code: Itinerary not found.');
          setShowError(true);
          setTimeout(() => setShowError(false), 5000);
          console.log('wait over');
        }
      })
      .catch(e => {
        console.log('Itinerary not found!');
      });
    return () => {
      unmounted = true;
    };
  };

  /**
   * Redirects to profile when clicking the icon on the top right.
   */
  const onClickProfile = () => {
    navigation.navigate('Profile');
  };

  /**
   * If user's profile picture is null, this will be the placeholder icon.
   * Link is the file uri from Firebase storage.
   */
  const defaultImage =
    'https://firebasestorage.googleapis.com/v0/b/travellog-d79e2.appspot.com/o/defaultUser.png?alt=media&token=d56ef526-4058-4152-933b-b98cd0668392';

  /**
   * Function to initialize user data from Firestore database.
   *
   * @returns Clean-up function.
   */
  const getUser = () => {
    let unmounted = false;
    firestore()
      .collection('users')
      .doc(user.uid)
      .onSnapshot(documentSnapshot => {
        if (documentSnapshot.exists) {
          if (unmounted) {
            return;
          }
          console.log('User Data', documentSnapshot.data());
          setUserData(documentSnapshot.data());
          setName(documentSnapshot.data().name);
          setItineraryCount(documentSnapshot.data().itineraries);
        }

        if (loadingUser) {
          setLoadUser(false);
        }
      });

    console.log(loadingUser);

    return () => {
      unmounted = true;
    };
  };

  /**
   * Function to initialize latest itinerary from Firestore database.
   *
   * @returns Clean-up function.
   */
  const getLatestItinerary = () => {
    let unmounted = false;
    if (itineraryCount > 0) {
      firestore()
        .collection('users')
        .doc(user.uid)
        .collection('itineraries')
        .orderBy('createdAt', 'desc')
        .limit(1)
        .onSnapshot(querySnapshot => {
          if (querySnapshot.empty) {
            console.log('No itineraries have been made yet.');
            return;
          }

          querySnapshot.forEach(doc => {
            if (doc.exists) {
              firestore()
                .collection('itineraries')
                .doc(doc.id)
                .onSnapshot(documentSnapshot => {
                  if (documentSnapshot.exists && !unmounted) {
                    if (unmounted) {
                      return;
                    }
                    setLatestItinerary(documentSnapshot.data());
                    setLatestItineraryTitle(documentSnapshot.data().title);
                    setLatestItineraryImage(documentSnapshot.data().coverImage);
                  }
                });
            }
          });

          if (loadingLatestItinerary) {
            setLoadLatestItinerary(false);
          }
        });
    }

    console.log(loadingLatestItinerary);

    return () => {
      unmounted = true;
    };
  };

  /**
   * Function to initialize the user's 5 most recent itineraries prior to the latest one.
   * If less than 5, will return all the itineraries prior to the latest one.
   *
   * @returns Clean-up function.
   */
  const getPastItineraries = () => {
    let unmounted = false;
    const itinerariesList = [];
    if (latestItinerary != undefined && itineraryCount > 1) {
      firestore()
        .collection('users')
        .doc(user.uid)
        .collection('itineraries')
        .where('createdAt', '<', latestItinerary.createdAt)
        .orderBy('createdAt', 'desc')
        .limit(5)
        .onSnapshot(querySnapshot => {
          if (querySnapshot.empty) {
            console.log('No more than one itinerary has been made yet.');
            return;
          }

          querySnapshot.forEach(doc => {
            if (doc.exists) {
              const {id} = doc.data();

              firestore()
                .collection('itineraries')
                .where('id', '==', doc.id)
                .onSnapshot(querySnapshot => {
                  querySnapshot.forEach(doc => {
                    if (doc.exists) {
                      const {
                        id,
                        coverImage,
                        createdAt,
                        days,
                        endDate,
                        notes,
                        owner,
                        startDate,
                        title,
                      } = doc.data();

                      itinerariesList.push({
                        id: id,
                        coverImage: coverImage,
                        createdAt: createdAt,
                        days: days,
                        endDate: endDate,
                        notes: notes,
                        owner: owner,
                        startDate: startDate,
                        title: title,
                      });
                    }
                  });
                  itinerariesList.sort(function (a, b) {
                    return (
                      new Date(b.createdAt.toDate()) -
                      new Date(a.createdAt.toDate())
                    );
                  });
                  setPastItineraries(itinerariesList);
                });
            }
            if (loadingPastItineraries) {
              setLoadPastItineraries(false);
            }
          });
        });
    }

    console.log(loadingPastItineraries);

    return () => {
      unmounted = true;
    };
  };

  /**
   * Calls getUser when the page is in focus.
   */
  useFocusEffect(
    React.useCallback(() => {
      let unmounted = false;
      getUser();
      return () => {
        unmounted = true;
      };
    }, []),
  );

  /**
   * Calls getLatestItinerary upon change to user's itinerary count.
   */
  useEffect(() => {
    let unmounted = false;
    getLatestItinerary();
    return () => {
      unmounted = true;
    };
  }, [itineraryCount]);

  /**
   * Calls getPastItineraries upon change to itinerary variable
   * or latest itinerary title variable.
   */
  useEffect(() => {
    let unmounted = false;
    getPastItineraries();
    return () => {
      unmounted = true;
    };
  }, [itineraryCount, latestItineraryTitle]);

  return (
    <KeyboardAvoidingWrapper backgroundColor="#FFFFFF">
      <View style={styles.root}>
        {/* header */}

        {loadingUser ? (
          <HomeUserSkeleton />
        ) : (
          <View style={{width: '100%'}}>
            <View style={styles.horizontal}>
              <View style={styles.header}>
                <Text style={styles.welcome}>Welcome back to Travel Log,</Text>
                <Text style={styles.title}>{name}!</Text>
              </View>
              <TouchableOpacity onPress={onClickProfile}>
                <Image
                  source={{
                    uri: userData
                      ? userData.userImg || defaultImage
                      : defaultImage,
                  }}
                  style={styles.pfp}
                />
              </TouchableOpacity>
            </View>

            <Text style={styles.subtitle}>Get started on a new itinerary!</Text>
            <CustomButton
              text="+ New Itinerary"
              onPress={addNewItinerary}
              type="QUINARY"
            />

            <Text style={[styles.subtitle, {paddingTop: '3%'}]}>
              View a friend's itinerary
            </Text>
            <InputFieldAfterLogin
              placeholder="Enter the code here..."
              value={code}
              setValue={setCode}
            />

            {showError ? (
              <Text style={styles.error}>{errorMessage}</Text>
            ) : null}

            <CustomButton text="View" onPress={viewItinerary} type="QUINARY" />
          </View>
        )}

        {/* block for latest itinerary; will only show if user has at least 1 itinerary. */}
        {itineraryCount >= 1 ? (
          loadingLatestItinerary ? (
            <LatestItinerarySkeleton />
          ) : (
            <View style={{width: '100%'}}>
              <Text style={[styles.subtitle, {paddingTop: '5%'}]}>
                Your latest itinerary
              </Text>

              <ItineraryTab
                onPress={() => {
                  navigation.navigate('OpenItinerary', {
                    itinerary: latestItinerary,
                  });
                }}
                text={latestItineraryTitle}
                image={latestItineraryImage}
              />
            </View>
          )
        ) : null}

        {/* block for past itineraries; will only show if user has more than 1 itinerary. */}
        {itineraryCount > 1 ? (
          loadingPastItineraries ? (
            <PastItinerariesSkeleton />
          ) : (
            <View>
              <Text style={styles.subtitle}>Revisit your past itineraries</Text>
              <View>
                <FlatList
                  data={pastItineraries}
                  horizontal
                  numColumns={1}
                  renderItem={({item}) => (
                    <ItineraryTab
                      text={item.title}
                      image={item.coverImage}
                      onPress={() => {
                        navigation.navigate('OpenItinerary', {
                          itinerary: item,
                        });
                      }}
                    />
                  )}
                  ItemSeparatorComponent={() => (
                    <View style={{marginRight: 10}} />
                  )}
                  keyExtractor={(contact, index) => String(index)}
                />
              </View>
            </View>
          )
        ) : null}
      </View>
    </KeyboardAvoidingWrapper>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'flex-start',
    paddingHorizontal: '7%',
    paddingTop: '10%',
  },
  error: {
    color: '#a3160b',
    fontFamily: 'Poppins-Italic',
    fontSize: 12,
    paddingLeft: 10,
  },
  header: {
    paddingRight: 30,
  },
  horizontal: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingBottom: '3%',
    paddingHorizontal: '7%',
  },
  horizontalScrollContainers: {
    width:
      Dimensions.get('window').width -
      2 * 0.07 * Dimensions.get('window').width,
    marginRight: 10,
  },
  pfp: {
    borderRadius: 60 / 2,
    width: 60,
    height: 60,
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 26,
    color: '#3B4949',
  },
  subtitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
    color: '#000000',
    paddingBottom: '1%',
  },
  welcome: {
    fontFamily: 'Poppins-Regular',
    fontSize: 18,
    color: '#6C6C6C',
  },
});

export default HomeScreen;
