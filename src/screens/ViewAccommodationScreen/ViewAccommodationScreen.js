import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Back from 'react-native-vector-icons/Feather';
import CustomButton from '../../components/CustomButton';
import { firebase } from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import * as OpenAnything from 'react-native-openanything';

const ViewAccommodationScreen = ({route}) => {

    const { id, itineraryStart, itineraryEnd, itemId, owner } = route.params;

    const navigation = useNavigation();
    
    // Set initial states of each field to be empty.
    const [name, setName] = useState('');

    // Date picker states.
    const [endDate, setEndDate] = useState(new Date());
    const [startDate, setStartDate] = useState(new Date());

    // Neater dates to be displayed.
    const [startDateString, setStartDateString] = useState('');
    const [endDateString, setEndDateString] = useState('');

    /*
        Once the date has been decided, the state will turn true
        and the selected dates will be displayed.
    */
    const [isStartVisible, setStartVisible] = useState(false);
    const [isEndVisible, setEndVisible] = useState(false);

    // Shows whether document for additional notes has been uploaded or not.
    const [isDocChosen, setChosen] = useState(false);

    //States for file uploading
    const [fileUri, setFileUri] = useState(null);
    const [fileName, setFileName] = useState(null);
    const [file, setFile] = useState(null);

    const getData = async () => {
        await firestore()
            .collection('itineraries')
            .doc(id)
            .collection('accommodation')
            .doc(itemId)
            .onSnapshot((documentSnapshot) => {
                if (documentSnapshot.exists) {
                    setName(documentSnapshot.data().name);
                    setStartDate(documentSnapshot.data().checkInDate);
                    setEndDate(documentSnapshot.data().checkOutDate);
                    setStartDateString(documentSnapshot.data().checkInDate.toDate().toLocaleDateString());
                    setEndDateString(documentSnapshot.data().checkOutDate.toDate().toLocaleDateString());
                    setFileUri(documentSnapshot.data().notes);
                }
            })
    }

    const getFileName = async () => {
        if (fileUri != null) {
            setChosen(true);
            const fileNotes = firebase.storage().refFromURL(fileUri).name;
            setFileName(fileNotes);
        }
    }

    useEffect(() => {
        let unmounted = false;
        getData();
        return () => {
            unmounted = true;
        }
    }, [route])

    useEffect(() => {
        let unmounted = false;
        getFileName();
        return () => {
            unmounted = true;
        }
    }, [fileUri])

    
    return (
        <View style={styles.root}>
            {/* header */}
            <View style = { styles.header }>
                <Back
                    size={35}
                    name="chevron-left"
                    onPress = { () => navigation.navigate('NewAccommodation',{
                        id: id,
                        itineraryStart: itineraryStart,
                        itineraryEnd: itineraryEnd,
                        owner: owner,
                    }) }
                    style = {{
                        flex: 1,
                        paddingTop: 2
                    }}
                />
                <Text style = { styles.headerText }>Accommodation</Text>
            </View>
            
            {/* empty space so shadow can be visible */}
            <Text></Text>

            {/* body */}
            <View style = {[styles.root, {
                paddingHorizontal: '8%' }]}>
                
                {/* Field to input accommodation name. */}
                <Text style = { styles.field }>Accommodation Name</Text>

                <Text style={[styles.text, {paddingLeft: 20}]}>{ name }</Text>

                {/* Field to input check-in date. */}
                <Text style = { styles.field }>Check In Date</Text>
               
                <Text style={[styles.text, {paddingLeft: 20}]}>{ startDateString }</Text>
                
                {/* Field to input check-out date. */}
                <Text style = { styles.field }>Check Out Date</Text>

                
                <Text style={[styles.text, {paddingLeft: 20}]}>{ endDateString }</Text>

                {/* Upload additional files */}
                <Text style = { styles.field }>Additional Notes</Text>
                {
                    fileUri != null
                    ? <Text style={[styles.text, {paddingLeft: 20}]}>{ fileName }</Text>
                    : <Text style={ [styles.text, {paddingLeft: 20}]}>-</Text>
                }
                
                {
                    fileUri != null
                    ? 
                    <Pressable 
                        style={styles.button}
                        onPress = {() => OpenAnything.Web(fileUri)}>
                        <Text style={styles.buttonText}>View file</Text>
                    </Pressable>
                    : null
                }

                {/* Line breaks */}
                { fileUri != null
                    ? null
                    : <Text>{'\n'}{'\n'}</Text>
                }

                <Text>{'\n'}</Text>
                <Text>{'\n'}</Text>
                <Text>{'\n'}</Text>
                <Text>{'\n'}</Text>

                <CustomButton
                    text='Edit'
                    onPress= { () => {
                        navigation.navigate('EditAccommodation', {
                            id: id,
                            itemId: itemId,
                            itineraryStart: itineraryStart,
                            itineraryEnd: itineraryEnd,
                            owner: owner,
                        });
                    } }
                    type='TERTIARY'
                />
                
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    root:{
        flex: 1,
        backgroundColor: '#FFFFFF'
    },
    button: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        backgroundColor: '#70DAD3',
        borderRadius: 4,
        marginTop: 10,
        marginBottom: 8,
        width: '25%',
    },
    buttonText: {
        fontFamily: 'Poppins-Medium',
        color: 'white',
        paddingHorizontal: '2%',
        paddingTop: '1%',
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
        flex: 3.5,
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    field: {
        fontFamily: 'Poppins-Regular',
        color: '#333333',
        paddingTop: 2,
    },
    text: {
        paddingVertical: 18,
        fontFamily: 'Poppins-Medium',
        color: '#333333',
    },
})
export default ViewAccommodationScreen;