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
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';

const AddAccommodationScreen = ({route}) => {
    
    const { id, dayLabel, itineraryStart, itineraryEnd } = route.params;

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

    // Date picker function to show the date picker for the check-in date.
    const showStartDatePicker = () => {
        setStartVisible(true);
        setEndVisible(false);
    };

    // Date picker function to show the date picker for the check-out date.
    const showEndDatePicker = () => {
        setStartVisible(false);
        setEndVisible(true);
    };

    // Hides date-picker once a date has been selected and confirmed.
    const hideDatePicker = () => {
        setStartVisible(false);
        setEndVisible(false);
    };

    // Sets check-in date once it has been confirmed by the user.
    const handleConfirm = (date) => {
        console.log("A start date has been picked: ", date);
        setStartDate(date);
        setStartDateString(date.toLocaleDateString());
        hideDatePicker();
    };
    
    // Sets check-out date once it has been confirmed by the user.
    const handleEndConfirm = (date) => {
        console.log("An end date has been picked: ", date);
        setEndDate(date);
        setEndDateString(date.toLocaleDateString());
        hideDatePicker();
    };

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

    const add = async () => {
        setAdding(true);
        let fileUrl = await uploadFile();

        let itemId = Math.random().toString(36).slice(2);

        await firestore()
            .collection('itineraries')
            .doc(id)
            .collection('days')
            .doc(dayLabel)
            .collection('plans')
            .doc(itemId)
            .onSnapshot((documentSnapshot) => {
                if(documentSnapshot.exists){
                    itemId = Math.random().toString(36).slice(2);
                }
            })
        
            //split dayLabel into "day" and "number"

            const difference = endDate.getTime() - startDate.getTime();

            const days = Math.ceil(difference / (1000 * 3600 * 24));

            const split = dayLabel.split(" ", 2);

            const dayNumber = split[1];
        
            let currDate = startDate;
            for (let i = dayNumber; i <= days + 1; i++) {
                const stringName = "Day " + i; 
                await firestore()
                    .collection('itineraries')
                    .doc(id)
                    .collection('days')
                    .doc(stringName)
                    .collection('plans')
                    .doc(itemId)
                    .set({
                        name: name,
                        checkInDate: startDate,
                        checkOutDate: endDate,
                        notes: fileUrl,
                        type: 'accommodation',
                        id: itemId,
                    })
                currDate = new Date(new Date(currDate).getTime() + 60 * 60 * 24 * 1000);
            }


        setAdding(false);
        navigation.navigate('NewDay', {
            id: id,
            dayLabel: dayLabel,
        });
    }

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
                <Text style = { styles.text }>Accommodation Name</Text>

                <InputFieldAfterLogIn
                    placeholder = "Accommodation Name"
                    value = { name }
                    setValue = { setName  }
                />

                {/* Field to input check-in date. */}
                <Text style = { styles.text }>Check In Date</Text>
                <View style={styles.horizontal}>
                    <Pressable 
                        onPress={ showStartDatePicker } 
                        style={ styles.button }>
                        <Text style={styles.buttonText}>Pick Check In Date</Text>    
                    </Pressable>
                    <Text style={[styles.setText, {paddingLeft: 20}]}>{ startDateString }</Text>
                </View>
                <DateTimePickerModal
                    isVisible={isStartVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                    minimumDate={ itineraryStart.toDate() }
                    maximumDate={itineraryEnd.toDate()}
                />
                
                {/* Field to input check-out date. */}
                <Text style = { styles.text }>Check Out Date</Text>

                <View style={styles.horizontal}>
                    <Pressable 
                        onPress={ showEndDatePicker } 
                        style={ styles.button }>
                        <Text style={styles.buttonText}>Pick Check Out Date</Text>    
                    </Pressable>
                    <Text style={[styles.setText, {paddingLeft: 20}]}>{ endDateString }</Text>
                </View>
                <DateTimePickerModal
                    isVisible={isEndVisible}
                    mode="date"
                    onConfirm={handleEndConfirm}
                    onCancel={hideDatePicker}
                    minimumDate={startDate}
                    maximumDate={itineraryEnd.toDate()}
                />

                {/* Upload additional files */}
                <Text style = { styles.text }>Additional Notes</Text>
                <View style={styles.horizontal}>
                    <Pressable onPress={ chooseFile } style={styles.button}>
                    <Document
                        name = "document-outline"
                        size = {20}
                        color = 'white'
                        style = {{
                            paddingLeft: '1%'
                        }}
                    />

                    <Text style={styles.buttonText}>Upload Files</Text>
                </Pressable>
                {
                    isDocChosen
                    ? <Text style={[styles.setText, {paddingLeft: 20}]}>{ fileName }</Text>
                    : null
                }
                </View>
                    <Text style={styles.acceptedFiles}>Accepted file formats: .pdf, .docx, .jpeg, .png</Text>

                {/* Line breaks */}
                <Text>{'\n'}</Text>
                <Text>{'\n'}</Text>
                <Text>{'\n'}</Text>
                <Text>{'\n'}</Text>
                <Text>{'\n'}</Text>
                <Text>{'\n'}</Text>

                <CustomButton
                    text='Add'
                    onPress= { add }
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
    acceptedFiles: {
        fontFamily: 'Poppins-Italic',
        fontSize: 12,
        color: '#333333',
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
    button: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 5,
        backgroundColor: '#70DAD3',
        borderRadius: 4,
        marginTop: 10,
        marginBottom: 8,
    },
    buttonText: {
        fontFamily: 'Poppins-Medium',
        color: 'white',
        paddingHorizontal: '2%',
        paddingTop: '1%',
    },
    setText: {
        fontFamily: 'Poppins-Italic',
        color: '#333333',
        paddingTop: 2,
    },
    text: {
        fontFamily: 'Poppins-Medium',
        color: '#333333',
        paddingTop: 2,
    },
   
})
export default AddAccommodationScreen;