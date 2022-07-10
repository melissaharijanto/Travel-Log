import React from 'react';
import {View, Dimensions, StyleSheet} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const FeaturedSkeleton = () => {
  return (
    <SkeletonPlaceholder>
      <View style={{height: 0.275 * height}} />
      <View
        style={{
          marginTop: 42.5,
          width: 0.45 * width,
          marginLeft: '5%',
          height: 24,
        }}
      />

      <View style={{flexDirection: 'row'}}>
        <View
          style={{
            marginLeft: '5%',
            width: width - 2 * 0.07 * width,
            height: width / 2,
            alignItems: 'flex-start',
            justifyContent: 'flex-end',
            borderRadius: 11,
            marginVertical: '2%',
          }}
        />
        <View
          style={{
            marginLeft: 10,
            width: width - 2 * 0.07 * width,
            height: width / 2,
            alignItems: 'flex-start',
            justifyContent: 'flex-end',
            borderRadius: 11,
            marginVertical: '4%',
          }}
        />
      </View>

      <View
        style={{
          width: 0.75 * width,
          marginLeft: '5%',
          height: 24,
        }}
      />

      <View style={{flexDirection: 'row', marginTop: 2}}>
        <View
          style={{
            marginLeft: '5%',
            width: width - 2 * 0.07 * width,
            height: width / 2.25,
            alignItems: 'flex-start',
            justifyContent: 'flex-end',
            borderRadius: 11,
            marginVertical: '2%',
          }}
        />
        <View
          style={{
            marginLeft: 10,
            width: width - 2 * 0.07 * width,
            height: width / 2.25,
            alignItems: 'flex-start',
            justifyContent: 'flex-end',
            borderRadius: 11,
            marginVertical: '4%',
          }}
        />
      </View>
    </SkeletonPlaceholder>
  );
};

export default FeaturedSkeleton;
