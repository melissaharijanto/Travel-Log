import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Logo from '../../../assets/images/logo3.png';
import ItineraryTab from '../../components/ItineraryTab';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

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
    var [ itineraries, setItineraries] = useState(0);
    var [ pastItineraries, setPastItineraries ] = useState(null);

    const getPastItineraries = async () => {
        let unmounted = false;
        const itinerariesList = [];
        console.log('BreakPoint 0');
            firestore()
                .collection('users')
                .doc(user.uid)
                .collection('itineraries')
                .orderBy('createdAt', 'desc')
                .onSnapshot((querySnapshot) => {

                    if (querySnapshot.empty) {
                        console.log('No itinerary has been made yet.');
                    return;
                    }

                    querySnapshot.forEach((doc) => {
                        if (doc.exists) {
                            const {
                                id,
                            } = doc.data();

                        console.log('BreakPoint 1', doc.data());

                        firestore()
                            .collection('itineraries')
                            .where('id','==', doc.id)
                            .onSnapshot((querySnapshot) => {
                                console.log('BreakPoint 2');
                                querySnapshot.forEach((doc) => {
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

                                        console.log('BreakPoint 3', doc.data());

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
                                        setPastItineraries(itinerariesList);
                                        console.log('BreakPoint 4', itinerariesList);
                            }
                        });
                    });
                }});
            });
        return () => {
            unmounted = true;
        };
    };

    // Function to initialize user data from Firestore database.
    const getUser = async () => {
        let unmounted = false;
        firestore()
            .collection('users')
            .doc(user.uid)
            .onSnapshot((documentSnapshot) => {
                if( documentSnapshot.exists ) {
                    console.log('User Data', documentSnapshot.data());
                    setItineraries(documentSnapshot.data().itineraries);
                }
            })
        return () => {
            unmounted = true;
        }
    }

    // Initializing the user upon navigating to this page.
    useEffect(() => {
        let unmounted = false;
        getUser();
        return () => {
            unmounted = true;
        }
    }, []);

    // Initializes latest itinerary upon change to userData.
    useEffect(() => {
        let unmounted = false;
        getPastItineraries();
        return () => {
            unmounted = true;
        }
    }, [itineraries]);

    return (
        <View style={styles.root}>
            {/* header */}
            <View style = { styles.header }>
                <Image
                    source={ Logo }
                    style={ styles.logo }
                    resizeMode="contain"
                />
            </View>
            <Text> test </Text>
            <View>
                <FlatList
                    data={ pastItineraries }
                    vertical
                    numRows={1}
                    renderItem={({item}) => (
                        <ItineraryTab
                            text = { item.title }
                            image = { item.coverImage }
                            onPress={ () => { navigation.navigate("OpenItinerary", {
                                itinerary: item,
                            })}} />
                    )}
                    ItemSeparatorComponent={ () => <View style={{marginBottom: 10}} /> }
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
