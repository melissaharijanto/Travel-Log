import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Back from 'react-native-vector-icons/Feather';
import InputFieldAfterLogIn from '../../components/InputFieldAfterLogIn';
import CustomButton from '../../components/CustomButton';
import Rearrange from 'react-native-vector-icons/Entypo';
import ImagePicker from 'react-native-image-crop-picker';
import ActivityTab from '../../components/ActivityTab';
import AccommodationTab from '../../components/AccommodationTab';
import TransportTab from '../../components/TransportTab';
import ActionButton from 'react-native-action-button-warnings-fixed';
import Activity from '../../../assets/images/Activity.png';
import Accommodation from '../../../assets/images/Accommodation.png';
import Transport from '../../../assets/images/Transport.png';

const NewDayScreen = () => {
    const navigation = useNavigation();

    const [title, setTitle] = useState();
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [notes, setNotes] = useState();


    const goToEditPage = () => {
        // do nothing
    }

    const placeholder = () => {

    }

    const goBack = () => {
        navigation.goBack();
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

                <Text style = { styles.headerText }>Day 1</Text>

                <Rearrange
                    size={35}
                    name="grid"
                    onPress = { goToEditPage }
                    style = {{
                        flex: 0.3,
                        paddingTop: 2
                    }}
                />
            </View>

            <Text></Text>
            <ScrollView style= {{
                paddingHorizontal: '5%',
                width: '100%',
                backgroundColor: 'white'}}>
                <View style = {[styles.root]}>

                <ActivityTab
                    text= 'Activity Name'
                    subtext= 'Activity Details'
                    onPress= { goToEditPage }
                />

                <AccommodationTab
                    text= 'Accommodation Name'
                    subtext= 'Accommodation Details'
                    onPress= { goToEditPage }
                />

                <TransportTab
                    text= 'Transport Name'
                    subtext= 'Transport Details'
                    onPress= { goToEditPage }
                />

                </View>
            </ScrollView>

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
                    onPress = { placeholder }
                    textStyle = { styles.buttonText }
                    shadowStyle = { styles.shadow }>
                    <Image source= {Accommodation} style = {{width: 55, height: 55}}/>
                </ActionButton.Item>

                <ActionButton.Item
                    size= {55}
                    buttonColor='#70D9D3'
                    title = "Activity"
                    onPress = { placeholder }
                    textStyle = { styles.buttonText }
                    shadowStyle = { styles.shadow }>
                    <Image source= {Activity} style = {{width: 55, height: 55}}/>
                </ActionButton.Item>

                <ActionButton.Item
                    size= {55}
                    buttonColor='#70D9D3'
                    title = "Transport"
                    onPress = { placeholder }
                    textStyle = { styles.buttonText }
                    shadowStyle = { styles.shadow }>
                    <Image source= {Transport} style = {{width: 55, height: 55}}/>
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
        flex: 1.1,
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


export default NewDayScreen;