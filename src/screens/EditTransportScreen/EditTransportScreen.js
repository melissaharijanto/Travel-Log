import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, ActivityIndicator, Alert } from 'react-native';
import Back from 'react-native-vector-icons/Feather';
import Document from 'react-native-vector-icons/Ionicons';
import InputFieldAfterLogIn from '../../components/InputFieldAfterLogIn';
import CustomButton from '../../components/CustomButton';
import DocumentPicker, {
    isInProgress,
    types,
  } from 'react-native-document-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import DeleteIcon from 'react-native-vector-icons/Feather';

const EditTransportScreen = ({route}) => {
    
    const navigation = useNavigation();
    
    const {id, dayLabel, date, itemId, owner} = route.params;

    // Set initial states of each field to be empty.
    const [name, setName] = useState();
    const [startingPoint, setStartingPoint] = useState();
    const [destination, setDestination] = useState();
    const [startTime, setStartTime] = useState();

    // Shows whether document for additional notes/ time has been uploaded or not.
    const [isDocChosen, setChosen] = useState(false);
    const [isTimeChosen, setTimeChosen] = useState(false);

    //States for file uploading
    const [fileUri, setFileUri] = useState(null);
    const [fileName, setFileName] = useState(null);
    const [file, setFile] = useState(null);

    //State to show activity indicator when updating accommodation.
    const [updating, setUpdating] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const [isStartVisible, setStartVisible] = useState(false);

    const showStartDatePicker = () => {
        setStartVisible(true);
        console.log(date);
    };

    const hideDatePicker = () => {
        setStartVisible(false);
    };

    const handleConfirm = (time) => {
        console.log("A start time has been picked: ", time);
        setStartTime(time);
        setTimeChosen(true);
        hideDatePicker();
    };

    const getTime = (time) => {
        let minutes = time.getMinutes();
        let hours = time.getHours();

        if (hours < 10) {
            hours = `0${hours}`;
        }

        if (minutes < 10) {
            minutes = `0${minutes}`;
        }
        return `${hours}:${minutes}`
    }

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
        let unmounted = false;
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
                    setStartTime(documentSnapshot.data().time.toDate());
                    setFileUri(documentSnapshot.data().notes);
                    setTimeChosen(true);
                }
            })
        
        return () => {
            unmounted = true;
        }
    }

    const getFileName = async () => {
        let unmounted = false;

        if (fileUri != null) {
            setChosen(true);
        }

        return () => {
            unmounted = true;
        }
    }

    const update = async () => {
        let unmounted = false;
        setUpdating(true);

        let fileUrl = await uploadFile();

        if (fileUrl == null && fileUri) {
            fileUrl = fileUri;
        }

        await firestore()
            .collection('itineraries')
            .doc(id)
            .collection('days')
            .doc(dayLabel)
            .collection('plans')
            .doc(itemId)
            .update({
                name: name,
                startingPoint: startingPoint,
                destination: destination,
                type: 'transport',
                id: itemId,
                time: startTime,
                notes: fileUrl,
            })

        setUpdating(false);
        navigation.navigate('ViewTransport', {
            id: id,
            dayLabel: dayLabel,
            date: date,
            owner: owner,
            itemId: itemId,
        });

        return () => {
            unmounted = true;
        }
    }

    const confirmDelete = () => {
        Alert.alert(
            "Confirm Delete",
            "Are you sure you want to delete this transport?",
            [ 
                {
                    text: "Cancel",
                    onPress: () => {
                        navigation.navigate("EditTransport", {
                            id: id,
                            dayLabel: dayLabel,
                            date: date,
                            itemId: itemId,
                            owner: owner,
                        });
                },
                style: "cancel"
                }, {
                    text: "OK", 
                    onPress: () => { 
                        handleDelete(); 
                        console.log('Deleted.');
                    }
                }
            ]
        )
    }

    const handleDelete = async () => {
        let unmounted = false;
        setDeleting(true);
            firestore()
                .collection('itineraries')
                .doc(id)
                .collection('days')
                .doc(dayLabel)
                .collection('plans')
                .doc(itemId)
                .delete()
                .then(() => {
                    console.log('Transport deleted.');
                    setDeleting(false);
                    navigation.navigate('NewDay', {
                        id: id,
                        dayLabel: dayLabel,
                        date: date,
                        owner: owner,
                    });
                }).catch((error) => {
                    console.log(error);
                })

        return () => {
            unmounted = true;
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
                    onPress = { () => navigation.goBack() }
                    style = {{
                        flex: 1,
                        paddingTop: 2
                    }}
                />
                <Text style = { styles.headerText }>Transport</Text>
                <DeleteIcon
                        name = "trash-2"
                        size = {25}
                        onPress = { confirmDelete }
                        style = {{
                            paddingRight: 20
                        }}
                />
            </View>
            
            {/* empty space so shadow can be visible */}
            <Text></Text>

            {/* body */}
            <View style = {[styles.root, {
                paddingHorizontal: '8%' }]}>
                
                {/* Field to input transport name. */}
                <Text style = { styles.text }>Mode of Transport</Text>

                <InputFieldAfterLogIn
                    placeholder = "Mode of Transport"
                    value = { name }
                    setValue = { setName  }
                />

                {/* Field to input start location */}
                <Text style = { styles.text }>Starting Point</Text>

                <InputFieldAfterLogIn
                    placeholder = "From"
                    value = { startingPoint }
                    setValue = { setStartingPoint  }
                />
                
                {/* Field to input destination*/}
                <Text style = { styles.text }>Destination</Text>

                <InputFieldAfterLogIn
                    placeholder = "Destination"
                    value = { destination }
                    setValue = { setDestination }
                />

                <Text style = { styles.text }>Start Time</Text>
                <View style={styles.horizontal}>
                    <Pressable onPress={ showStartDatePicker } style={styles.button}>
                        <Text style={styles.buttonText}>Pick Start Time</Text>
                    </Pressable>
                    {
                        isTimeChosen
                        ? <Text style={[styles.setText, {paddingLeft: 20}]}>{ getTime(startTime) }</Text>
                        : null
                    }
                </View>
                <DateTimePickerModal
                    isVisible={isStartVisible}
                    mode="time"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                    date={date.toDate()}
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
                    ? <Text style={[styles.setText, {paddingLeft: 20}]}>File Uploaded.</Text>
                    : null
                }
                </View>
                    <Text style={styles.acceptedFiles}>Accepted file formats: .pdf, .docx, .jpeg, .png</Text>

                {/* Line breaks */}
                <Text>{'\n'}</Text>
                <Text>{'\n'}</Text>

                <CustomButton
                    text='Add'
                    onPress= { update }
                    type='TERTIARY'
                />

                {
                    updating || deleting
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
        shadowOpacity: 1,
    },
    headerText: {
        fontFamily: 'Poppins-Bold',
        fontSize: 26,
        color: '#3B4949',
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        paddingTop: 9,
        flex: 1.95,
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
export default EditTransportScreen;