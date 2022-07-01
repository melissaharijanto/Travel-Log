import React from 'react';
import {View, Dimensions} from 'react-native';

import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const MainItinerarySkeleton = () => {
  return (
    <SkeletonPlaceholder>
      <View>
        <View
          style={{
            width:
              Dimensions.get('window').width -
              2 * 0.07 * Dimensions.get('window').width,
            height: Dimensions.get('window').width / 2,
            alignItems: 'flex-start',
            justifyContent: 'flex-end',
            borderRadius: 11,
            marginTop: 1.15,
            marginBottom: '2.5%',
          }}
        />
        <View
          style={{
            width:
              Dimensions.get('window').width -
              2 * 0.07 * Dimensions.get('window').width,
            height: Dimensions.get('window').width / 2,
            alignItems: 'flex-start',
            justifyContent: 'flex-end',
            borderRadius: 11,
            marginVertical: '2.5%',
          }}
        />
        <View
          style={{
            width:
              Dimensions.get('window').width -
              2 * 0.07 * Dimensions.get('window').width,
            height: Dimensions.get('window').width / 2,
            alignItems: 'flex-start',
            justifyContent: 'flex-end',
            borderRadius: 11,
            marginVertical: '2.5%',
          }}
        />
      </View>
    </SkeletonPlaceholder>
  );
};

export default MainItinerarySkeleton;
