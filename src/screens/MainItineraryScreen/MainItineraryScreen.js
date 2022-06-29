import React, {useEffect, useState} from 'react';
import {View, Text, Image, StyleSheet, FlatList} from 'react-native';
import {StackRouter, useNavigation} from '@react-navigation/native';
import Logo from '../../../assets/images/logo3.png';
import ItineraryTab from '../../components/ItineraryTab';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {useFocusEffect} from '@react-navigation/native';
import {SearchBar} from '@rneui/themed';

const MainItineraryScreen = () => {
  const navigation = useNavigation();

  const onGoingBack = () => {
    navigation.goBack();
  };

  const navigateToNewDay = () => {
    navigation.navigate('NewDay');
  };

  // Gets authentication data of the current user logged in.
  const user = auth().currentUser;

  // States for user's itinerary data.
  var [itineraries, setItineraries] = useState(0);
  var [pastItineraries, setPastItineraries] = useState(null);

  const [search, setSearch] = useState({
    loading: false,
    data: pastItineraries,
    error: null,
    searchValue: '',
  });

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
        });
      });

    return () => {
      unmounted = true;
    };
  };

  // Function to initialize user data from Firestore database.
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
          setItineraries(documentSnapshot.data().itineraries);
        }
      });
    return () => {
      unmounted = true;
    };
  };

  // Initializing the user upon navigating to this page.
  useFocusEffect(
    React.useCallback(() => {
      let unmounted = false;
      getUser();
      return () => {
        unmounted = true;
      };
    }, []),
  );

  // Initializes all the user's itineraries upon change to userData.
  useFocusEffect(
    React.useCallback(() => {
      let unmounted = false;
      getPastItineraries();
      return () => {
        unmounted = true;
      };
    }, [setItineraries]),
  );

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
      <View style={styles.header}>
        <Image source={Logo} style={styles.logo} resizeMode="contain" />
      </View>
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
          ItemSeparatorComponent={() => <View style={{marginBottom: 2.5}} />}
          keyExtractor={(contact, index) => String(index)}
        />
      </View>
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
