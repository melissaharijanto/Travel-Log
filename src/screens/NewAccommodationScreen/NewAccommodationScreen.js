import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList } from 'react-native';
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
import { template } from '@babel/core';

const NewAccommodationScreen = ({route}) => {
    
    const navigation = useNavigation();

    const [accommodation, setAccommodation] = useState(null);

    const { id, itineraryStart, itineraryEnd } = route.params;
    
    const goToEditPage = () => {
        navigation.navigate('EditDay', {
                data: plans,
                dayLabel: dayLabel,
            }
        );
    }

    const placeholder = () => {

    }

    const getAccommodation = async () => {
        const accommodationList = [];
        await firestore()
            .collection('itineraries')
            .doc(id)
            .collection('accommodation')
            .onSnapshot((querySnapshot) => {

                if (querySnapshot.empty) {
                    return;
                }

                querySnapshot.forEach((doc) => {
                    const {
                        name,
                        checkInDate,
                        checkOutDate,
                        notes,
                        id,
                        type
                    } = doc.data();

                    accommodationList.push({
                        name: name,
                        checkInDate: checkInDate,
                        checkOutDate: checkOutDate,
                        notes: notes,
                        type: type,
                        id: id,
                    })
                    setAccommodation(accommodationList);
                })
                
            });
    }

    useEffect(() =>{
        getAccommodation();
        return;
    }, [route]);

    return (
        <View style={styles.root}>
            {/* header */}
            <View style = { styles.header }>
                <Back
                    size={35}
                    name="chevron-left"
                    onPress = { () => navigation.goBack() }
                    style = {{
                        flex: 1,
                        paddingTop: 2
                    }}
                />
                <Text style = { styles.headerText }>Accommodation</Text>
            </View>

            <Text></Text>
            <View style={{width: '100%', paddingHorizontal: '5%'}}>
            <FlatList
                data={ accommodation }
                numColumns={1}
                renderItem={({item}) => (
                    <AccommodationTab
                        onPress={() => {navigation.navigate('ViewAccommodation', {
                            id: id,
                            itineraryStart: itineraryStart,
                            itineraryEnd: itineraryEnd,
                            itemId: item.id,
                        })}}
                        text = { item.name }
                        subtext={
                            `${item
                                .checkInDate
                                .toDate()
                                .toLocaleDateString()
                            } - ${item
                                .checkOutDate
                                .toDate()
                                .toLocaleDateString()}`
                            }
                    />
                    )}
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
                        id: id,
                        itineraryStart: itineraryStart,
                        itineraryEnd: itineraryEnd,
                    })}
                    textStyle = { styles.buttonText }
                    shadowStyle = { styles.shadow }>
                    <Image source= {Accommodation} style = {{width: 55, height: 55}}/>
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
        flex: 3.2,
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