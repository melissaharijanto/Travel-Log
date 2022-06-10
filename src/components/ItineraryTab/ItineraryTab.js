import React from 'react';
import { Text, ImageBackground, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

const ItineraryTab = ({image, onPress, text}) => {
    const placeholder = 'https://firebasestorage.googleapis.com/v0/b/travellog-d79e2.appspot.com/o/itineraryImagePlaceholder.png?alt=media&token=5ebb4e2b-9305-48d2-927e-dc637197f2df';
    return (
            <TouchableOpacity onPress={ onPress } button style={ styles.button }>
                <ImageBackground 
                    style = { styles.image }
                    imageStyle = {{ borderRadius: 11 }}
                    source={{uri: 
                        image
                        ? image || placeholder
                        : placeholder }}>
                    <Text style={styles.text}>{ text }</Text>
                </ImageBackground>
            </TouchableOpacity> 
    );
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: Dimensions.get('window').width / 2,
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
    },
    button: {
        paddingBottom: '5%',
    },
    text: {
        fontFamily: 'Poppins-Bold',
        color: '#FFFFFF',
        fontSize: 16,
        elevation: 10,
        shadowOpacity: 1,
        shadowRadius: 1,
        paddingLeft: 13,
        paddingBottom: 5,
    }

})

export default ItineraryTab;