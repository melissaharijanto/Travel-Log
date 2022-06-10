import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, ImageBackground, Dimensions} from 'react-native';
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
                }
            })
    }

    useEffect(() => {
        getUser();
    }, []);


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
            

            <Text style = {[ styles.subtitle, { paddingTop: '5%'}]}>Your latest itinerary</Text>
            
            {/* Change the onPress={placeholder} into something else */}
            
            <ItineraryTab
                onPress={placeholder}
                text='Summer in Singapore'
                image='https://firebasestorage.googleapis.com/v0/b/travellog-d79e2.appspot.com/o/itineraryImagePlaceholder.png?alt=media&token=5ebb4e2b-9305-48d2-927e-dc637197f2df'
            />

            <Text style = {[ styles.subtitle, { paddingTop: '1%'}]}>Revisit your past itineraries</Text>
            <ScrollView
                horizontal={true}
            > 
                <View style={ styles.horizontalScrollContainers }>
                    <ItineraryTab
                    onPress={placeholder}
                    text='Summer in Singapore'
                    image='https://firebasestorage.googleapis.com/v0/b/travellog-d79e2.appspot.com/o/itineraryImagePlaceholder.png?alt=media&token=5ebb4e2b-9305-48d2-927e-dc637197f2df'
                    />
                
                </View>
                <View style={styles.horizontalScrollContainers}>
                    <ItineraryTab
                    onPress={placeholder}
                    text='Summer in Singapore'
                    image='https://firebasestorage.googleapis.com/v0/b/travellog-d79e2.appspot.com/o/itineraryImagePlaceholder.png?alt=media&token=5ebb4e2b-9305-48d2-927e-dc637197f2df'
                    />
                
                </View>
            </ScrollView>
            
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