
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, Dimensions, Clipboard } from 'react-native';
import EditIcon from 'react-native-vector-icons/AntDesign';
import Back from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

const OpeningItineraryScreen = ({route}) => {
    const { itinerary } = route.params;

    const navigation = useNavigation();

    const editItinerary = () => {
        navigation.navigate("EditItineraryFromHome", {
            itinerary: itinerary,
        });
    }

    const goBack = () => {
        navigation.goBack();
    }

    useEffect(() => {
    }, []);

    return (
        <View>
            <ImageBackground 
                source={{uri: itinerary.coverImage}}
                style={styles.coverImage}>
                <View style= {styles.overlay}/>
                <Back
                    size={35}
                    name="chevron-left"
                    color="#FFFFFF"
                    onPress = { goBack }
                    style = {{
                        flex: 1,
                        paddingTop: 20,
                        paddingLeft: 15,
                    }}
                />

                <Text style={ styles.imageSubtitle }>You are opening</Text>
                
                <View style={styles.horizontal}>
                    <Text style={ styles.imageHeader }>{ itinerary.title } </Text>
                    <EditIcon
                        size={25}
                        name="edit"
                        color="#FFFFFF"
                        onPress = { editItinerary }
                    />
                </View>

            <Text style={ styles.imageText }>Invite Code: { itinerary.id }</Text>
            </ImageBackground>
            
        </View>
    )
}
const styles = StyleSheet.create({
    coverImage: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').width/2,
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#00000050',
    },
    horizontal: {
        flexDirection: 'row',
    },
    imageHeader: {
        fontFamily: 'Poppins-Bold',
        color: '#FFFFFF',
        fontSize: 26,
        elevation: 10,
        shadowOpacity: 1,
        shadowRadius: 1,
        paddingLeft: 20,
        lineHeight: 30,
    },
    imageSubtitle: {
        fontFamily: 'Poppins-Regular',
        color: '#FFFFFF',
        fontSize: 18,
        elevation: 10,
        shadowOpacity: 1,
        shadowRadius: 1,
        paddingLeft: 20,
        lineHeight: 30,
    },
    imageText: {
        fontFamily: 'Poppins-Regular',
        color: '#FFFFFF',
        fontSize: 12,
        elevation: 10,
        shadowOpacity: 1,
        shadowRadius: 1,
        paddingLeft: 20,
        lineHeight: 30,
        paddingBottom: 5,
    },
})

export default OpeningItineraryScreen;