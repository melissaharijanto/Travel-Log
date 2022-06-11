import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Alert, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Back from 'react-native-vector-icons/Feather';
import InputFieldAfterLogIn from '../../components/InputFieldAfterLogIn';
import CustomButton from '../../components/CustomButton';
import ImageIcon from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-crop-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';

const NewItineraryScreen = () => {
    const navigation = useNavigation();

    const [title, setTitle] = useState('');
    const [notes, setNotes] = useState('');
    const [image, setImage] = useState(null);
    const [adding, setAdding] = useState(false);
    const [isImageChosen, setChosen] = useState(false);

    const [endDate, setEndDate] = useState(new Date());
    const [startDate, setStartDate] = useState(new Date());
    const [startDateString, setStartDateString] = useState('');
    const [endDateString, setEndDateString] = useState('');
    const [isStartVisible, setStartVisible] = useState(false);
    const [isEndVisible, setEndVisible] = useState(false);

    const showStartDatePicker = () => {
        setStartVisible(true);
        setEndVisible(false);
    };

    const showEndDatePicker = () => {
        setStartVisible(false);
        setEndVisible(true);
    };

    const hideDatePicker = () => {
        setStartVisible(false);
        setEndVisible(false);
    };

    const handleConfirm = (date) => {
        console.log("A start date has been picked: ", date);
        setStartDate(date);
        setStartDateString(date.toLocaleDateString());
        hideDatePicker();
    };

    const handleEndConfirm = (date) => {
        console.log("An end date has been picked: ", date);
        setEndDate(date);
        setEndDateString(date.toLocaleDateString());
        hideDatePicker();
    };

    const goBack = () => {
        navigation.goBack();
    }


    const choosePhotoFromLibrary = () => {
            ImagePicker.openPicker({
              width: 500,
              height: 500 / 2,
              cropping: true,
            }).then((image) => {
              console.log(image);
              const imageUri = image.path;
              setImage(imageUri);
              setChosen(true);
            })
            .catch((error => {
                console.log('User cancelled image selection!')
            }));
          };

    const uploadImage = async () => {
        if( image == null ) {
            return null;
        }

        const uploadUri = image;
        let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

        // Add timestamp to File Name
        const extension = filename.split('.').pop();
        const name = filename.split('.').slice(0, -1).join('.');
        filename = name + Date.now() + '.' + extension;

        const storageRef = storage().ref(`photos/${filename}`);
        const task = storageRef.putFile(uploadUri);

        try {
            await task;
            const url = await storageRef.getDownloadURL();

            setImage(null);

            return url;
        } catch (e) {
            console.log(e);
            return null;
        }
    };

    const addNewItinerary = async () => {

        setAdding(true);

        const difference = endDate.getTime() - startDate.getTime();

        if (title === ''){
            Alert.alert(
                "Unable to Create Itinerary.",
                "Title is still empty.",
            );
            setAdding(false);
        } else if (startDateString === '') {
            Alert.alert(
                "Unable to Create Itinerary.",
                "Start date is still empty.",
            );
            setAdding(false);
        } else if (endDateString === '') {
            Alert.alert(
                "Unable to Create Itinerary.",
                "End date still empty.",
            );
            setAdding(false);
        } else if (difference < 0) {
            Alert.alert(
                "Unable to Create Itinerary.",
                "The number of days cannot be negative.",
            );
            setAdding(false);
        } else {

            const days = Math.ceil(difference / (1000 * 3600 * 24));
            
            let imgUrl = await uploadImage();

            let id = Math.random().toString(36).slice(2);

            // regenerate unique code if code already exists
            firestore()
            .collection('itineraries')
            .doc(id)
            .get()
            .then((documentSnapshot) => {
                if(documentSnapshot.exists){
                    id = Math.random().toString(36).slice(2);
                }
            })

            firestore()
                .collection('itineraries')
                .doc(id)
                .set({
                    id: id,
                    coverImage: imgUrl,
                    created: new Date().toLocaleString(),
                    days: days,
                    endDate: endDate,
                    notes: notes,
                    owner: auth().currentUser.uid,
                    startDate: startDate,
                    title: title,
                })
                .then(() => {
                    console.log('New itinerary created!');
                });

            // might need to add days into the firestore collection here, maybe

            // activity indicator stops showing here
            setAdding(false);
            
            // should navigate to opening itinerary page instead
            navigation.navigate("HomeScreen");
        }
    }
        

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

                <Text style = { styles.headerText }>New Itinerary</Text>
            </View>

            <Text></Text>

            <View style = {[styles.root, {
                paddingHorizontal: '8%',
                backgroundColor: 'white'}]}>
                <Text style = { styles.text }>Title</Text>

                <InputFieldAfterLogIn
                    placeholder = "Title"
                    value = { title }
                    setValue = { setTitle  }
                    style = { styles.textBox }
                />

                <Text style = { styles.text }>Cover Image</Text>

                <View style={styles.horizontal}>
                    <Pressable onPress={ choosePhotoFromLibrary } style={styles.button}>
                    <ImageIcon
                        name = "image"
                        size = {18}
                        color = 'white'
                        style = {{
                            paddingHorizontal: '1%'
                        }}
                        />

                    <Text style={styles.buttonText}>Upload Image</Text>
                </Pressable>
                {
                    isImageChosen
                    ? <Text style={[styles.setText, {paddingLeft: 20}]}>Image uploaded.</Text>
                    : null
                }
                </View>
                
                <Text style = { styles.text }>Start Date</Text>
                <View style={styles.horizontal}>
                    <Pressable 
                        onPress={ showStartDatePicker } 
                        style={ styles.button }>
                        <Text style={styles.buttonText}>Pick Start Date</Text>    
                    </Pressable>
                    <Text style={[styles.setText, {paddingLeft: 20}]}>{ startDateString }</Text>
                </View>
                <DateTimePickerModal
                    isVisible={isStartVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                />
                
                <Text style = { styles.text }>End Date</Text>

                <View style={styles.horizontal}>
                    <Pressable 
                        onPress={ showEndDatePicker } 
                        style={ styles.button }>
                        <Text style={styles.buttonText}>Pick End Date</Text>    
                    </Pressable>
                    <Text style={[styles.setText, {paddingLeft: 20}]}>{ endDateString }</Text>
                </View>
                <DateTimePickerModal
                    isVisible={isEndVisible}
                    mode="date"
                    onConfirm={handleEndConfirm}
                    onCancel={hideDatePicker}
                    minimumDate={startDate}
                />
                
                <Text style = { styles.text }>Additional Notes</Text>

                <InputFieldAfterLogIn
                    placeholder = "Notes"
                    value = { notes }
                    setValue = { setNotes }
                />

                <Text>
                    {'\n'}
                    {'\n'}
                    {'\n'}
                    {'\n'}
                </Text>
                
                <CustomButton
                    text= "Add"
                    type= "TERTIARY"
                    onPress= { addNewItinerary }
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
    root: {
        flex: 1,
        alignItems: 'flex-start',
        backgroundColor: 'white',
        width: '100%',
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
        flex: 2.8,
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
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
   
});


export default NewItineraryScreen;