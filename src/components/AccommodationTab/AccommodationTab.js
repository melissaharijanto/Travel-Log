import React from 'react';
import { View, Text, Pressable, StyleSheet, Image } from 'react-native';
import Accommodation from '../../../assets/images/Accommodation.png';

const AccommodationTab = ({ onPress, text, subtext }) => {
    return (
        <Pressable onPress= { onPress } style= { styles.container }>
            <View style= { styles.horizontal }>
                    <Image source = { Accommodation }
                        style = { [styles.icon, styles.horizontal] }/>
                <View>
                <Text style = {styles.text}>
                { text }
                </Text>
                <Text style = {styles.subtext}>
                { subtext }
                </Text>
                </View>
            </View>

        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#70D9D320',
        borderRadius: 10,
        width: '100%',
        padding: 8,
        marginVertical: 5,
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