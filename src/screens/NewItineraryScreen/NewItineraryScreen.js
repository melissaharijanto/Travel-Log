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
import firestore, { firebase } from '@react-native-firebase/firestore';

const NewItineraryScreen = () => {
    
    // Navigation object.
    const navigation = useNavigation();

    // States for the input fields.
    const [title, setTitle] = useState('');
    const [notes, setNotes] = useState('');
    const [image, setImage] = useState(null);

    // State for visibility of ActivityIndicator; if true, it will show.
    const [adding, setAdding] = useState(false);

    // State to show whether an image has been uploaded or not.
    const [isImageChosen, setChosen] = useState(false);

    // State for start date and end date in Date form
    const [endDate, setEndDate] = useState(new Date());
    const [startDate, setStartDate] = useState(new Date());

    // State for start date and end date after calling toLocaleDateString() ont them.
    const [startDateString, setStartDateString] = useState('');
    const [endDateString, setEndDateString] = useState('');

    // States to show the visibility of the date pickers.
    const [isStartVisible, setStartVisible] = useState(false);
    const [isEndVisible, setEndVisible] = useState(false);

    // Function to show date picker for the start date.
    const showStartDatePicker = () => {
        setStartVisible(true);
        setEndVisible(false);
    };

    // Function to show date picker for the end date.
    const showEndDatePicker = () => {
        setStartVisible(false);
        setEndVisible(true);
    };

    // Function to hide the date pickers.
    const hideDatePicker = () => {
        setStartVisible(false);
        setEndVisible(false);
    };

    // Function to confirm and set the start date.
    const handleConfirm = (date) => {
        console.log("A start date has been picked: ", date);
        setStartDate(date);
        setStartDateString(date.toLocaleDateString());
        hideDatePicker();
    };

    // Function to confirm and set the end date.
    const handleEndConfirm = (date) => {
        console.log("An end date has been picked: ", date);
        setEndDate(date);
        setEndDateString(date.toLocaleDateString());
        hideDatePicker();
    };

    // Function to navigate to the previous screen on the stack.
    const goBack = () => {
        navigation.goBack();
    }

    // Function to choose photo from the phone gallery.
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

    // Function to upload the cover image to the database.
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

    // Function to add new itinerary to the database.
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
                if (documentSnapshot.exists){
                    id = Math.random().toString(36).slice(2);
                }
            })

            firestore()
                .collection('itineraries')
                .doc(id)
                .set({
                    id: id,
                    coverImage: imgUrl,
                    createdAt: new Date(),
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
            

            // update user's itinerary numbers
            var docRef  = firestore()
                .collection('users')
                .doc(auth().currentUser.uid);
            
            docRef.update({
                itineraries: firebase.firestore.FieldValue.increment(1),

            })

            // update collection
            await firestore()
                .collection('users')
                .doc(auth().currentUser.uid)
                .collection('itineraries')
                .doc(id)
                .set({
                    id: id,
                    createdAt: new Date(),
                })

            // c: might need to add days into the firestore collection here, maybe
            
            let currDate = startDate;
            for (let i = 1; i <= days + 1; i++) {
                const stringName = "Day " + i; 
                await firestore()
                    .collection('itineraries')
                    .doc(id)
                    .collection('days')
                    .doc(stringName)
                    .set({
                        id: i,
                        label: stringName,
                        date: currDate,
                        from: id,
                    })
                currDate = new Date(new Date(currDate).getTime() + 60 * 60 * 24 * 1000);
            }
            // activity indicator stops showing here
            setAdding(false);

            // c: should navigate to opening itinerary page instead
            navigation.navigate("HomeScreen");
        }
    }
        

    return (
        <View style={ styles.root }>

            {/* header */}
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

            {/* Empty text field to make the shadow of the header visible. */}
            <Text></Text>

            <View style = {[styles.root, {
                paddingHorizontal: '8%',
                backgroundColor: 'white'}]}>

                {/* Field to input title */}
                <Text style = { styles.text }>Title</Text>

                <InputFieldAfterLogIn
                    placeholder = "Title"
                    value = { title }
                    setValue = { setTitle  }
                />

                {/* Field to input cover image */}
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
                
                {/* Field to input start date */}
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
                
                {/* Field to input end date */}
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
                
                {/* Field to input additional notes. */}
                <Text style = { styles.text }>Additional Notes</Text>

                <InputFieldAfterLogIn
                    placeholder = "Notes"
                    value = { notes }
                    setValue = { setNotes }
                />

                {/* Line breaks. */}
                <Text>
                    {'\n'}
                    {'\n'}
                    {'\n'}
                    {'\n'}
                </Text>
                
                {/* Button to add itinerary to the database */}
                <CustomButton
                    text= "Add"
                    type= "TERTIARY"
                    onPress= { addNewItinerary }
                />

                {/* ActivityIndicator will show when adding itinerary to database
                (adding is set to true). */}
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