import React from 'react';
import {TouchableOpacity, Image, Dimensions} from 'react-native';

const RecommendationTab = ({image, onPress}) => {
  const width = Dimensions.get('window').width;
  return (
    <TouchableOpacity onPress={onPress}>
      <Image
        source={{uri: image}}
        style={{
          width: width - 2 * 0.07 * width,
          height: ((width - 2 * 0.07 * width) / 16) * 9,
          borderRadius: 11,
        }}
      />
    </TouchableOpacity>
  );
};

export default RecommendationTab;
