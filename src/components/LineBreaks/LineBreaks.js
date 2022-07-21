import React from 'react';
import {Text} from 'react-native';

export const SmallLineBreak = () => {
  return <Text testID="text" />;
};

export const FourLineBreak = () => {
  return (
    <Text testID="text">
      {'\n'}
      {'\n'}
      {'\n'}
      {'\n'}
    </Text>
  );
};
