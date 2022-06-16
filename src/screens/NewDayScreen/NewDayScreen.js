import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Pressable, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Back from 'react-native-vector-icons/Feather';
import Rearrange from 'react-native-vector-icons/Entypo';
import ActivityTab from '../../components/ActivityTab';
import AccommodationTab from '../../components/AccommodationTab';
import TransportTab from '../../components/TransportTab';
import ActionButton from 'react-native-action-button-warnings-fixed';
import Activity from '../../../assets/images/Activity.png';
import Accommodation from '../../../assets/images/Accommodation.png';
import Transport from '../../../assets/images/Transport.png';
import firestore from '@react-native-firebase/firestore';

const NewDayScreen = ({route}) => {
    
    const navigation = useNavigation();

    const [plans, setPlans] = useState(null);

    const { id, dayLabel } = route.params;
    
    const goToEditPage = () => {
        // do nothing
    }

    const placeholder = () => {

    }

    const goBack = () => {
        navigation.goBack();
    }

    const getPlans = async () => {
        const plansList = [];
        await firestore()
            .collection('itineraries')
            .doc(id)
            .collection('days')
            .doc(dayLabel)
            .collection('plans')
            .onSnapshot((querySnapshot) => {
                if (querySnapshot.empty) {
                    console.log('Query is empty.');
                    return;
                }
                querySnapshot.forEach((doc) => {
                    const {
                        name,
                        checkInDate,
                        checkOutDate,
                        notes,
                        type,
                        location,
                        startingPoint,
                        destination,
                        id,
                    } = doc.data();
                    
                    if (type === 'accommodation'){
                    plansList.push({
                        name: name,
                        checkInDate: checkInDate,
                        checkOutDate: checkOutDate,
                        notes: notes,
                        type: type,
                        id: id,
                    })
                    }

                    if (type === 'activity'){
                        plansList.push({
                            name: name,
                            notes: notes,
                            type: type,
                            location: location,
                            id: id,
                        })
                    }

                    if (type === 'transport'){
                        plansList.push({
                            name: name,
                            notes: notes,
                            type: type,
                            startingPoint: startingPoint,
                            destination: destination,
                            id: id,
                        })
                    }
                    setPlans(plansList);
            })
        })
    }

    useEffect(() =>{
        getPlans();
        return;
    }, [route]);

    return (
        <View style={ styles.root }>

            <View style = { styles.header }>
                <Back
                    size={35}
                    name="chevron-left"
                    onPress = { goBack }
                    style = {{
                        flex: 1,
                        paddingTop: 2
                    }}
                />

                <Text style = { styles.headerText }>{ dayLabel }</Text>

                <Rearrange
                    size={35}
                    name="grid"
                    onPress = { goToEditPage }
                    style = {{
                        flex: 0.3,
                        paddingTop: 2
                    }}
                />
            </View>

            <Text></Text>
            <View style={{width: '100%', paddingHorizontal: '5%'}}>
            <FlatList
                data={ plans }
                numColumns={1}
                renderItem={({item}) => {
                        if(item.type === 'accommodation') {
                        return <AccommodationTab onPress={() => navigation.navigate("ViewAccommodation",{
                            id: id,
                            dayLabel: dayLabel,
                            itemId: item.id,
                        })}
                            text={ item.name }
                            subtext={`${item.checkInDate.toDate().toLocaleDateString()} - ${item.checkOutDate.toDate().toLocaleDateString()}`}
                        />
                        }

                        if(item.type === 'activity') {
                            return <ActivityTab onPress={() => {}}
                                text={ item.name }
                                subtext={ item.location }
                            />
                        }

                        if(item.type === 'transport') {
                            return <TransportTab onPress={() => {}}
                                text={ item.name }
                                subtext={`${item.startingPoint} - ${item.destination}`}
                            />
                        }
                }}
                keyExtractor={(contact, index) => String(index)}
                ItemSeparatorComponent={ () => <View style={{marginBottom: 5}} /> }
            ></FlatList>
            </View>

            {/* Edit action button onPress later */}
            <ActionButton
                shadowStyle = { styles.shadow }
                buttonColor='#70D9D3'
                size= {65}
                spacing= {15}>
                <ActionButton.Item
                    size= {55}
                    buttonColor='#70D9D3'
                    title = "Accommodation"
                    onPress = { () => navigation.navigate('AddAccommodation', {
                        dayLabel: dayLabel,
                        id: id,
                    })}
                    textStyle = { styles.buttonText }
                    shadowStyle = { styles.shadow }>
                    <Image source= {Accommodation} style = {{width: 55, height: 55}}/>
                </ActionButton.Item>

                <ActionButton.Item
                    size= {55}
                    buttonColor='#70D9D3'
                    title = "Activity"
                    onPress = { () => navigation.navigate('AddActivity', {
                        dayLabel: dayLabel,
                        id: id,
                    }) }
                    textStyle = { styles.buttonText }
                    shadowStyle = { styles.shadow }>
                    <Image source= {Activity} style = {{width: 55, height: 55}}/>
                </ActionButton.Item>

                <ActionButton.Item
                    size= {55}
                    buttonColor='#70D9D3'
                    title = "Transport"
                    onPress = { () => navigation.navigate('AddTransport', {
                        dayLabel: dayLabel,
                        id: id,
                    }) }
                    textStyle = { styles.buttonText }
                    shadowStyle = { styles.shadow }>
                    <Image source= {Transport} style = {{width: 55, height: 55}}/>
                </ActionButton.Item>
            </ActionButton>
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        alignItems: 'flex-start',
        backgroundColor: 'white',
        width: '100%',
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
        shadowOpacity: 1
    },
   headerText: {
        fontFamily: 'Poppins-Bold',
        fontSize: 26,
        color: '#3B4949',
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        paddingTop: 9,
        flex: 1.1,
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


export default NewDayScreen;