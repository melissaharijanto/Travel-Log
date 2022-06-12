import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Alert, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Back from 'react-native-vector-icons/Feather';
import InputFieldAfterLogIn from '../../components/InputFieldAfterLogIn';
import CustomButton from '../../components/CustomButton';
import DeleteIcon from 'react-native-vector-icons/Feather';
import ImageIcon from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-crop-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import firestore, { firebase } from '@react-native-firebase/firestore';

const EditItineraryScreen = () => {
    const navigation = useNavigation();

    const [title, setTitle] = useState('');
    const [notes, setNotes] = useState('');
    const [image, setImage] = useState(null);
    const [editing, setEditing] = useState(false);
    const [isImageChosen, setChosen] = useState(false);

    const goBack = () => {
        navigation.goBack();
    }

    const confirmDelete = () => {
        Alert.alert(
            "Confirm Delete",
            "Are you sure you want to delete this itinerary?",
            [ 
                {
                    text: "Cancel",
                    onPress: () => {
                        navigation.navigate("EditItinerary");
                        console.log('User decided not to log out');
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

    // c: implement this
    const handleDelete = () => {

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

    const editItinerary = async () => {

        setEditing(true);

        // code here
        // setEditing(false);
        // navigation.goBack();
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

                <Text style = { styles.headerText }>Edit Itinerary</Text>
                <DeleteIcon
                        name = "trash-2"
                        size = {25}
                        onPress = { confirmDelete }
                        style = {{
                            paddingRight: 20
                        }}
                />
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
                <Text style = { styles.permanent }>placeholder</Text>
                
                <Text style = { styles.text }>End Date</Text>
                <Text style = { styles.permanent }>placeholder</Text>
                
                <Text style = { styles.text }>Additional Notes</Text>

                <InputFieldAfterLogIn
                    placeholder = "Notes"
                    value = { notes }
                    setValue = { setNotes }
                />

                <Text>
                    {'\n'}
                </Text>

                {
                    editing
                    ? <View style={{
                        paddingTop: 19,
                        paddingBottom: 30,
                        alignSelf: 'center',
                        }}>
                        <ActivityIndicator 
                        size='large' 
                        color='#000000'/>
                    </View>
                    : <Text>
                    {'\n'}
                    {'\n'}
                    {'\n'}
                    {'\n'}
                    </Text>
                }

                <CustomButton
                    text= "Cancel"
                    type= "QUATERNARY"
                    onPress= { goBack }
                />

                <CustomButton
                    text= "Update"
                    type= "TERTIARY"
                    onPress= { editItinerary }
                />

                

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
        flex: 2.2,
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
    permanent: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 15,
        color: 'black',
        alignSelf: 'flex-start',
        paddingLeft: '8%',
        paddingVertical: '6%',
   },
   
});


export default EditItineraryScreen;