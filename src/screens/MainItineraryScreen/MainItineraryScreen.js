import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import ItineraryTab from '../../components/ItineraryTab';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {useFocusEffect} from '@react-navigation/native';
import {SearchBar} from '@rneui/themed';
import MainItinerarySkeleton from '../../components/MainItinerarySkeleton';
import {LogoOnlyHeader} from '../../components/Headers/Headers';

/**
 * Anonymous class that renders MainItineraryScreen.
 *
 * @returns render of MainItineraryScreen.
 */
const MainItineraryScreen = ({navigation}) => {
  /**
   * Gets authentication data of the current user logged in.
   */
  const user = auth().currentUser;

  /**
   * User's itinerary count. Default value is 0.
   */
  const [itineraryCount, setItineraryCount] = useState(0);

  /**
   * User's past itineraries object. Default state is null.
   */
  const [pastItineraries, setPastItineraries] = useState(null);

  /**
   * State that shows whether an itinerary is loading.
   * If true, then it is fetching the data from the database; if
   * false, then the process is done.
   */
  const [loadingItineraries, setLoadItineraries] = useState(true);

  /**
   * Initial search state.
   */
  const [search, setSearch] = useState({
    loading: false,
    data: pastItineraries,
    error: null,
    searchValue: '',
  });

  /**
   * Search function for search bar.
   *
   * @param {String} text String that is used to search for an itinerary title.
   */
  const searchFunction = text => {
    if (text) {
      const updatedData = pastItineraries.filter(item => {
        const item_data = `${item.title.toUpperCase()})`;
        const text_data = text.toUpperCase();
        return item_data.indexOf(text_data) > -1;
      });
      setSearch({data: updatedData, searchValue: text});
    } else {
      setSearch({data: pastItineraries, searchValue: text});
    }
  };

  /**
   * Function to fetch a user's past itineraries.
   * Unlike in the HomeScreen where it only fetches 5 of the itineraries,
   * this one fetches all of the user's itineraries.
   *
   * @returns Clean-up function.
   */
  const getPastItineraries = () => {
    let unmounted = false;
    const itinerariesList = [];
    console.log('BreakPoint 0');
    firestore()
      .collection('users')
      .doc(user.uid)
      .collection('itineraries')
      .orderBy('createdAt', 'desc')
      .onSnapshot(querySnapshot => {
        if (querySnapshot.empty) {
          console.log('No itinerary has been made yet.');
          return;
        }

        querySnapshot.forEach(doc => {
          if (doc.exists) {
            const {id} = doc.data();
            firestore()
              .collection('itineraries')
              .where('id', '==', id)
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
          if (loadingItineraries) {
            setLoadItineraries(false);
            console.log('reached here');
          }
        });
      });

    return () => {
      unmounted = true;
    };
  };

  /**
   * Function to fetch user data from Firestore database.
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
          setItineraryCount(documentSnapshot.data().itineraries);
          console.log('User Data', documentSnapshot.data());
        }
      });

    console.log(itineraryCount);
    return () => {
      unmounted = true;
    };
  };

  /**
   * Hook effect to call getUser upon focusing on this page.
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
   * Hook effect to call getPastItineraries upon focusing on this page
   * and upon calling setItineraryCount.
   */
  useFocusEffect(
    React.useCallback(() => {
      let unmounted = false;
      getPastItineraries();
      return () => {
        unmounted = true;
      };
    }, [itineraryCount]),
  );

  /**
   * Hook effect that will show filtered results once the
   * user types something into the search bar. If the input does not
   * match any of the user's itinerary titles, nothing will show.
   */
  useEffect(() => {
    let unmounted = false;
    setSearch({data: pastItineraries});
    return () => {
      unmounted = true;
    };
  }, [pastItineraries]);

  return (
    <View style={styles.root}>
      {/* header */}
      <LogoOnlyHeader />
      <View style={{width: '100%'}}>
        <SearchBar
          placeholder="Search Here..."
          lightTheme
          round
          value={search.searchValue}
          onChangeText={text => searchFunction(text)}
          autoCorrect={false}
          onClearText={() => searchFunction('')}
          containerStyle={{backgroundColor: 'white'}}
          placeholderTextColor="#808080"
          searchIcon={{
            type: 'ant-design',
            color: '#808080',
            name: 'search1',
          }}
          clearIcon={{
            type: 'ant-design',
            color: '#808080',
            name: 'closecircleo',
          }}
          inputStyle={{
            fontFamily: 'Poppins-Italic',
          }}
        />
      </View>
      <Text />
      {itineraryCount > 0 ? (
        loadingItineraries ? (
          <MainItinerarySkeleton />
        ) : (
          <View style={styles.content}>
            <FlatList
              data={search.data}
              vertical
              numRows={1}
              showsVerticalScrollIndicator={false}
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
                <View style={{marginBottom: 2.5}} />
              )}
              keyExtractor={(contact, index) => String(index)}
            />
          </View>
        )
      ) : (
        <View style={[styles.root, {justifyContent: 'center'}]}>
          <Text style={styles.text}>You currently have no itineraries.</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
  },
  text: {
    fontFamily: 'Poppins-SemiBold',
    color: '#808080',
  },
  logo: {
    width: '50%',
    maxWidth: 700,
    maxHeight: 200,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    height: 65,
    width: '100%',
    paddingLeft: 10,
    elevation: 15,
    shadowColor: '#70D9D3',
    shadowOpacity: 1,
  },
});

export default MainItineraryScreen;
