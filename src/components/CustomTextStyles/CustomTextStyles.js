import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';

export const FieldName = ({text}) => {
  return <Text style={styles.field}>{text}</Text>;
};

export const ErrorMessage = ({text}) => {
  return <Text style={styles.error}>{text}</Text>;
};

export const HomeSubtitle = ({text, style}) => {
  return <Text style={[styles.subtitle, style]}>{text}</Text>;
};

export const FeaturedTitle = ({text, style}) => {
  return <Text style={[styles.featuredTitle, style]}>{text}</Text>;
};

export const FeaturedSubtitle = ({text}) => {
  return <Text style={styles.featuredSubtitle}>{text}</Text>;
};

export const LocationName = ({text}) => {
  return <Text style={styles.locationName}>{text}</Text>;
};

export const LocationAddress = ({text}) => {
  return (
    <View style={{flexDirection: 'row', paddingTop: 3}}>
      <Ionicons name="location-sharp" size={20} color="#3B494990" />
      <Text style={styles.address}>{text}</Text>
    </View>
  );
};

export const Ratings = ({text}) => {
  return (
    <View>
      <Text
        style={{
          fontFamily: 'Poppings-Regular',
          fontSize: 20,
          paddingBottom: 5,
          lineHeight: 23,
          color: '#FFCA28',
        }}>
        {text}
      </Text>
    </View>
  );
};

export const PriceTag = ({text}) => {
  return (
    <View style={{flexDirection: 'row'}}>
      <Ionicons name="pricetag" size={20} color="#3B494990" />
      <Text style={styles.address}>{text}</Text>
    </View>
  );
};

export const WebsiteLink = ({text}) => {
  return (
    <View style={{flexDirection: 'row', paddingTop: 3}}>
      <Entypo name="link" size={20} color="#3B494990" />
      <Text style={styles.address}>{text}</Text>
    </View>
  );
};

export const Description = ({text}) => {
  return <Text style={styles.description}>{text}</Text>;
};

const styles = StyleSheet.create({
  error: {
    color: '#a3160b',
    fontFamily: 'Poppins-Italic',
    fontSize: 12,
    paddingLeft: 10,
  },
  field: {
    fontFamily: 'Poppins-Medium',
    color: '#333333',
    paddingTop: 2,
  },
  subtitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
    color: '#000000',
    paddingBottom: '1%',
  },
  featuredTitle: {
    color: 'white',
    fontFamily: 'Poppins-Bold',
    fontSize: 36,
  },
  featuredSubtitle: {
    color: '#3B4949',
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
  },
  locationName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    paddingTop: 15,
    color: '#3B4949',
  },
  address: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    paddingLeft: 4,
    color: '#3B494990',
  },
  description: {
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    color: '#808080',
    textAlign: 'justify',
    lineHeight: 20,
  },
});
