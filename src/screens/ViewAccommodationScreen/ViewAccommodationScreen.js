import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, ActivityIndicator } from 'react-native';
import Back from 'react-native-vector-icons/Feather';
import Document from 'react-native-vector-icons/Ionicons';
import InputFieldAfterLogIn from '../../components/InputFieldAfterLogIn';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import CustomButton from '../../components/CustomButton';
import DocumentPicker, {
    isInProgress,
    types,
  } from 'react-native-document-picker';
import storage, { firebase, refFromURL } from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';


const ViewAccommodationScreen = ({route}) => {

    const { id, itemId, dayLabel } = route.params;

    const navigation = useNavigation();
    
    // Set initial states of each field to be empty.
    const [name, setName] = useState();

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

    //State to show activity indicator when adding accommodation.
    const [adding, setAdding] = useState(false);

    //Choose which file to upload.
    const chooseFile = async () => {
        try {
            const pickerResult = await DocumentPicker.pickSingle({
                presentationStyle: 'fullScreen',
                copyTo: 'cachesDirectory',
                type: [types.doc, types.docx, types.pdf, types.images],
            })
            setFile(pickerResult);
            setFileUri(pickerResult.fileCopyUri);
            console.log(pickerResult);
            setFileName(pickerResult.name);
            setChosen(true);
        } catch (e) {
            if (DocumentPicker.isCancel(e)) {
                console.log('cancelled')
                // User cancelled the picker, exit any dialogs or menus and move on
              } else if (isInProgress(e)) {
                console.log('multiple pickers were opened, only the last will be considered')
              } else {
                console.log(e);
              }
        }
    }

    // Uploading file to Firebase Storage
    const uploadFile = async () => {
        if( file == null ) {
            return null;
        }

        const uploadUri = fileUri;
        let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

        // Add timestamp to File Name
        const extension = filename.split('.').pop();
        const name = filename.split('.').slice(0, -1).join('.');
        filename = name + Date.now() + '.' + extension;

        const storageRef = storage().ref(`files/${filename}`);
        const task = storageRef.putFile(uploadUri);

        try {
            await task;
            const url = await storageRef.getDownloadURL();

            setFile(null);

            return url;
        } catch (e) {
            console.log(e);
            return null;
        }
    };

    const getData = async () => {
        await firestore()
            .collection('itineraries')
            .doc(id)
            .collection('days')
            .doc(dayLabel)
            .collection('plans')
            .doc(itemId)
            .onSnapshot((documentSnapshot) => {
                setName(documentSnapshot.data().name);
                setStartDate(documentSnapshot.data().checkInDate);
                setEndDate(documentSnapshot.data().checkOutDate);
                setStartDateString(documentSnapshot.data().checkInDate.toDate().toLocaleDateString());
                setEndDateString(documentSnapshot.data().checkOutDate.toDate().toLocaleDateString());
                setFileUri(documentSnapshot.data().notes);
                
                if (fileUri != null) {
                    setChosen(true);
                    const fileNotes = firebase.storage().refFromURL(fileUri).name;
                    setFileName(fileNotes);
                }
            })

           
    }

    useEffect(() => {
        getData();
    }, [route])

    useEffect(() => {
        getData();
    }, [])
    
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
                    : <Text style={ [styles.text, {paddingLeft: 20}]}>No details have been added.</Text>
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
                    onPress= { () => {} }
                    type='TERTIARY'
                />
                
                {
                    adding
                    ? <View style={{
                        paddingTop: 20,
                        alignSelf: 'center',
                        }}>
                        <ActivityIndicator 
                        size='large' 
                        color='#000000'/>
                    </View>
                    : null
                }
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
        flex: 3.8,
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