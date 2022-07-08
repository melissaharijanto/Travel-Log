import React from 'react';
import {StyleSheet, Text} from 'react-native';

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
});
