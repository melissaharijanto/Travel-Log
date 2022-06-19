import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Transport from '../../../assets/images/Transport.png';

const TransportTab = ({ onPress, text, subtext, isActive, onLongPress }) => {
    return (
        <TouchableOpacity 
            onPress= { onPress } 
            style= { styles.container }
            onLongPress = {onLongPress}
            disabled ={isActive}>
            <View style= { styles.horizontal }>
                    <Image source = { Transport }
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

        </TouchableOpacity>
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
        alignSelf: 'flex-start',
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

export default TransportTab;