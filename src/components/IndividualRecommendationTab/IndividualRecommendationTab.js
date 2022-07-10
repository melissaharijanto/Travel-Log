import React from 'react';
import {View, Pressable, Text, Image, StyleSheet} from 'react-native';

const IndividualRecommendationTab = ({
  name,
  address,
  ratings,
  image,
  onPress,
}) => {
  return (
    <Pressable
      style={({pressed}) => [
        {backgroundColor: pressed ? '#E8F3F4' : '#FFFFFF'},
        styles.button,
      ]}
      onPress={onPress}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'flex-start',
        }}>
        <Image source={{uri: image}} style={{width: 75, height: 75}} />
        <View style={{paddingLeft: 10, width: '80%'}}>
          <Text style={styles.title}>{name}</Text>
          <Text style={styles.subtitle}>{address}</Text>
          <Text style={{color: '#3B4949'}}>{ratings}</Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 110,
    justifyContent: 'center',
    paddingHorizontal: '5%',
    borderBottomColor: '#94C2C630',
    borderBottomWidth: 1,
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    color: '#3B4949',
  },
  subtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    color: '#808080',
  },
});

export default IndividualRecommendationTab;
