import React from 'react';
import {TouchableOpacity, Image} from 'react-native';

const RecommendationTab = ({image, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} testID="button">
      <Image
        source={{uri: image}}
        style={{
          width: 350,
          height: 175,
          borderRadius: 11,
        }}
        accessibilityRole="image"
      />
    </TouchableOpacity>
  );
};

export default RecommendationTab;
