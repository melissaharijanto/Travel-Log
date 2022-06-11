import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Back from 'react-native-vector-icons/Feather';
import InputFieldAfterLogIn from '../../components/InputFieldAfterLogIn';
import CustomButton from '../../components/CustomButton';
import ImageIcon from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-crop-picker';

const NewItineraryScreen = () => {
    const navigation = useNavigation();

    const [title, setTitle] = useState();
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [notes, setNotes] = useState();
    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [transferred, setTransferred] = useState(0);

    const placeholder = () => {
    }

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
    
            setUploading(true);
            setTransferred(0);
    
            const storageRef = storage().ref(`photos/${filename}`);
            const task = storageRef.putFile(uploadUri);
    
            // Set transferred state
            task.on('state_changed', (taskSnapshot) => {
              console.log(
                `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
              );
    
              setTransferred(
                Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
                  100,
              );
            });
    
            try {
              await task;
              const url = await storageRef.getDownloadURL();
    
              setUploading(false);
              setImage(null);
            
              return url;
            } catch (e) {
              console.log(e);
              return null;
            }
          };
    
    

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

                <Pressable onPress={choosePhotoFromLibrary} style={styles.button}>
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

                <Text style = { styles.text }>Start Date</Text>

                <InputFieldAfterLogIn
                    placeholder = "Start Date"
                    value = { startDate }
                    setValue = { setStartDate }
                />

                <Text style = { styles.text }>End Date</Text>

                <InputFieldAfterLogIn
                    placeholder = "End Date"
                    value = { endDate }
                    setValue = { setEndDate }
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
                    onPress= {placeholder}
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
        flex: 2.8,
   },

   text: {
        fontFamily: 'Poppins-Medium',
        color: '#333333',
        paddingTop: 2,
   },
});


export default NewItineraryScreen;