import React from 'react';
import { View, Text, Pressable, StyleSheet, Image } from 'react-native';

const DayTab = ({ onPress, text, subtext }) => {
    return (
        <Pressable onPress= { onPress } style= { styles.container }>
            <View style= { styles.horizontal }>
                <View style={[styles.textAlign, {width: '25%'}]}>
                    <Text style={styles.text}>{ text }</Text>
                </View>
                <View style={ styles.subtextAlign }>
                    <Text style = {styles.subtext}>{ subtext }</Text>
                </View>
            </View>

        </Pressable>
    )
}

const styles = StyleSheet.create({
    textAlign:{
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: '#70D9D350',
    },
    subtextAlign: {
        justifyContent:'center',
        width: '75%'
    },
    container: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        width: '100%',
        height: 70,
        padding: 8,
        marginVertical: 5,
        borderColor: '#70D9D350',
        borderWidth: 2,
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    icon: {
        width: 50,
        height: 50,
        marginLeft: 5,
        marginRight: 13,
    },
    text: {
        fontFamily: 'Poppins-ExtraBold',
        color: '#3B4949',
        fontSize: 24,
        paddingTop: 5,
    },
    subtext: {
        fontFamily: 'Poppins-Bold',
        color: '#3B4949',
        fontSize: 14,
        paddingLeft: 15,
        paddingTop: 5,
    },
});

export default DayTab;