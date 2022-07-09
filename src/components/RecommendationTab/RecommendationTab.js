import React from 'react';
import {TouchableOpacity, Image, Dimensions} from 'react-native';

const RecommendationTab = ({image, onPress}) => {
  const width = Dimensions.get('window').width;
  return (
    <TouchableOpacity onPress={onPress}>
      <Image
        source={{uri: image}}
        style={{
          width: 350,
          height: 175,
          borderRadius: 11,
        }}
      />
    </TouchableOpacity>
  );
};

export default RecommendationTab;
