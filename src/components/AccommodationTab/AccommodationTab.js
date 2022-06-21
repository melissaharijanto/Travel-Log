import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Accommodation from '../../../assets/images/Accommodation.png';

const AccommodationTab = ({ onPress, text, subtext, isActive, onLongPress }) => {
    return (
        <TouchableOpacity 
            onPress= { onPress } 
            style= { styles.container }
            disabled={isActive}
            onLongPress={onLongPress}>
            <View style= { styles.horizontal }>
                    <Image source = { Accommodation }
                        style = { [styles.icon, styles.horizontal] }/>
                <View style = {{width: '75%'}}>
                <Text style = {styles.text}>
                { text }
                </Text>
                <Text style = {styles.subtext}>
                { subtext }
                </Text>
                </View>
            </View>

        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#70D9D320',
        borderRadius: 10,
        padding: 8,
        marginVertical: 5,
        width: '100%'
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignSelf: 'flex-start'
    },
    icon: {
        width: 50,
        height: 50,
        marginLeft: 5,
        marginRight: 13,

    },
    text: {
        fontFamily: 'Poppins-SemiBold',
        color: '#000000',
        fontSize: 15,
    },
    subtext: {
        fontFamily: 'Poppins-Regular',
        color: '#B1B1B1',
        fontSize: 15,
    },
});

export default AccommodationTab;