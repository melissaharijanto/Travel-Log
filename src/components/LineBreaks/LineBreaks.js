import React from 'react';
import {Text} from 'react-native';

export const SmallLineBreak = () => {
  return <Text />;
};

export const FourLineBreak = () => {
  return (
    <Text>
      {'\n'}
      {'\n'}
      {'\n'}
      {'\n'}
    </Text>
  );
};
