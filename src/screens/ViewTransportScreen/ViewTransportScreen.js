import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import Back from 'react-native-vector-icons/Feather';
import CustomButton from '../../components/CustomButton';
import { firebase } from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';


const ViewTransportScreen = ({route}) => {

    const { id, itemId, dayLabel, date } = route.params;

    const navigation = useNavigation();
    
    // Set initial states of each field to be empty.
    const [name, setName] = useState();
    const [startingPoint, setStartingPoint] = useState();
    const [destination, setDestination] = useState();

    // Shows whether document for additional notes has been uploaded or not.
    const [isDocChosen, setChosen] = useState(false);

    //States for file uploading
    const [fileUri, setFileUri] = useState(null);
    const [fileName, setFileName] = useState(null);
    const [file, setFile] = useState(null);

    const getData = () => {
        firestore()
            .collection('itineraries')
            .doc(id)
            .collection('days')
            .doc(dayLabel)
            .collection('plans')
            .doc(itemId)
            .onSnapshot((documentSnapshot) => {
                if (documentSnapshot.exists) {
                    setName(documentSnapshot.data().name);
                    setStartingPoint(documentSnapshot.data().startingPoint);
                    setDestination(documentSnapshot.data().destination);
                    setFileUri(documentSnapshot.data().notes); 
                }    
            })
    }

    const getFileName = () => {
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
                    onPress = { () => navigation.navigate('NewDay', {
                        id: id,
                        dayLabel: dayLabel,
                        itemId: itemId,
                        date: date,
                    }) }
                    style = {{
                        flex: 1,
                        paddingTop: 2
                    }}
                />
                <Text style = { styles.headerText }>Transport</Text>
            </View>
            
            {/* empty space so shadow can be visible */}
            <Text></Text>

            {/* body */}
            <View style = {[styles.root, {
                paddingHorizontal: '8%' }]}>
                
                {/* Field to input accommodation name. */}
                <Text style = { styles.field }>Mode of Transport</Text>

                <Text style={[styles.text, {paddingLeft: 20}]}>{ name }</Text>

                {/* Field to input check-in date. */}
                <Text style = { styles.field }>Starting Point</Text>
               
                <Text style={[styles.text, {paddingLeft: 20}]}>{ startingPoint }</Text>

                <Text style = { styles.field }>Destination</Text>
               
                <Text style={[styles.text, {paddingLeft: 20}]}>{ destination }</Text>
                
                {/* Upload additional files */}
                <Text style = { styles.field }>Additional Notes</Text>
                {
                    fileUri != null
                    ? <Text style={[styles.text, {paddingLeft: 20}]}>{ fileName }</Text>
                    : <Text style={ [styles.text, {paddingLeft: 20}]}>-</Text>
                }
                
                {/* Line breaks */}
                <Text>{'\n'}</Text>
                <Text>{'\n'}</Text>
                <Text>{'\n'}</Text>
                <Text>{'\n'}</Text>
                <Text>{'\n'}</Text>
                <Text>{'\n'}</Text>

                <CustomButton
                    text='Edit'
                    onPress= { () => { navigation.navigate('EditTransport', {
                        id: id,
                        dayLabel: dayLabel,
                        itemId: itemId,
                        date: date,
                    })} }
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
        flex: 2,
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
export default ViewTransportScreen;