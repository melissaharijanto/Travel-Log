import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Dimensions, FlatList} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import CustomButton from '../../components/CustomButton';
import ItineraryTab from '../../components/ItineraryTab';
import InputFieldAfterLogin from '../../components/InputFieldAfterLogIn';

const HomeScreen = () => {

    const user = auth().currentUser;
    const navigation = useNavigation();

    const addNewItinerary = () => {
        navigation.navigate("NewItinerary");
    }

    const placeholder = () => {

    }

    const onClickProfile = () => {
        navigation.navigate("Profile");
    }

    const [ userData, setUserData ] = useState(null);
    const [ name, setName ] = useState(null);
    const [ code, setCode ] = useState();
    var [ itineraries, setItineraries] = useState();
    var [ latestItinerary, setLatestItinerary] = useState(null);
    var [ latestItineraryTitle, setLatestItineraryTitle] = useState(null);
    var [ latestItineraryImage, setLatestItineraryImage] = useState(null);
    var [ pastItineraries, setPastItineraries ] = useState(null);
    const defaultImage = 'https://firebasestorage.googleapis.com/v0/b/travellog-d79e2.appspot.com/o/defaultUser.png?alt=media&token=d56ef526-4058-4152-933b-b98cd0668392'

    

    const getUser = async () => {
        await firestore()
            .collection('users')
            .doc(user.uid)
            .onSnapshot((documentSnapshot) => {
                if( documentSnapshot.exists ) {
                    console.log('User Data', documentSnapshot.data());
                    setUserData(documentSnapshot.data());
                    setName(documentSnapshot.data().name);
                    setItineraries(documentSnapshot.data().itineraries);
                }
            })
    }
    
    const getLatestItinerary = async () => {
        await firestore()
            .collection('users')
            .doc(user.uid)
            .collection('itineraries')
            .orderBy('createdAt', 'desc')
            .limit(1)
            .onSnapshot((querySnapshot) => {

                if (querySnapshot.empty) {
                    console.log('No itineraries have been made yet.');
                    return;
                }

                querySnapshot.forEach((doc) => {
                    const {
                        id,
                    } = doc.data();

                firestore()
                    .collection('itineraries')
                    .doc(doc.id)
                    .onSnapshot((documentSnapshot) => {
                        setLatestItinerary(documentSnapshot.data());
                        setLatestItineraryTitle(documentSnapshot.data().title);
                        setLatestItineraryImage(documentSnapshot.data().coverImage);
                    })
                })

                console.log('getLatestItinerary has been run!');
                })
                
        }

        const getPastItineraries = async () => {
            const itinerariesList = [];
            console.log('BreakPoint 0');
            if(latestItinerary != undefined) {
                firestore()
                    .collection('users')
                    .doc(user.uid)
                    .collection('itineraries')
                    .where('createdAt', '<', latestItinerary.createdAt)
                    .orderBy('createdAt', 'desc')
                    .limit(5)
                    .onSnapshot((querySnapshot) => {

                        if (querySnapshot.empty) {
                        console.log('No itineraries have been made yet.');
                        return;
                        }
                    
                        querySnapshot.forEach((doc) => {
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
                                    const {
                                        id,
                                        coverImage,
                                        createdAt,
                                        days,
                                        endDate,
                                        notes,
                                        owner,
                                        startDate,
                                        title
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
                                    })
                                    setPastItineraries(itinerariesList);
                                    console.log('BreakPoint 4', itinerariesList);    
                                });
                            })
                        
                    });
                    
                });
            }
            
        }

    useEffect(() => {
        getUser(); 
        return;
    }, []);

    useEffect(() => {
        getLatestItinerary();
        return;
    }, [userData]);

    useEffect(() => {
        getPastItineraries();
        return;
    }, [latestItinerary]);

    return (
        <ScrollView style={{backgroundColor: '#FFFFFF'}}>
        <View style = { styles.root }>
            <View style={ styles.horizontal }>
                <View style={ styles.header }>
                    <Text style={ styles.welcome }>
                        Welcome back to Travel Log,
                    </Text>
                    <Text style = { styles.title }>{ name }!</Text>
                </View>
                <TouchableOpacity onPress={ onClickProfile }>
                    <Image source={{ 
                        uri: userData
                            ? userData.userImg || defaultImage
                            : defaultImage 
                        }} 
                        style={ styles.pfp }/>
                </TouchableOpacity>
            </View>

            <Text style = { styles.subtitle }>Get started on a new itinerary!</Text>
            <CustomButton
                text = "+ New Itinerary"
                onPress = { addNewItinerary }
                type = "QUINARY"
            />

            <Text style={[styles.subtitle, {paddingTop: '3%'}]}>View a friend's itinerary</Text>
            <InputFieldAfterLogin
                placeholder= "Enter the code here..."
                value = { code }
                setValue = { setCode }
            />
            <CustomButton
                text = "View"
                onPress = { placeholder }
                type = "QUINARY"
            />
            
            { itineraries >= 1
            ? 
            <View style={{width: '100%'}}>
                <Text style = {[ styles.subtitle, { paddingTop: '5%'}]}>Your latest itinerary</Text>
                
                <ItineraryTab
                    onPress= {() => { navigation.navigate("OpenItinerary", {
                        itinerary: latestItinerary,    
                        })
                    }}
                    text={ latestItineraryTitle }
                    image= { latestItineraryImage }
                />
            </View>
            : null
            }
            

            { itineraries > 1
            ? 
            <View>
                <Text style = { styles.subtitle }>Revisit your past itineraries</Text>
                <View>
                    <FlatList
                    data={ pastItineraries }
                    horizontal
                    numColumns={1}
                    renderItem={({item}) => (
                        <ItineraryTab
                            text = { item.title }
                            image = { item.coverImage }
                            onPress={ () => { navigation.navigate("OpenItinerary", {
                                itinerary: item,    
                            })}}
                        />
                    )}
                    ItemSeparatorComponent={ () => <View style={{marginRight: 10}} /> }
                    keyExtractor={(item) => item.id}
                    />
                </View>
            </View>
            : null
            }
            
        </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    root: {
        alignItems: 'flex-start',
        paddingHorizontal: '7%',
        paddingTop: '10%',
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
    },
    horizontalScrollContainers: {
        width: Dimensions.get('window').width - 2 * 0.07 * Dimensions.get('window').width,
        marginRight: 10,
    },
    pfp: {
        borderRadius: 60/2 ,
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
        color:'#6C6C6C',
    },
});


export default HomeScreen;