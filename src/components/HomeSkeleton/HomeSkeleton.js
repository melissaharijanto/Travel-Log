import React from 'react';
import {View, Dimensions} from 'react-native';

import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

export const HomeUserSkeleton = () => {
  return (
    <SkeletonPlaceholder>
      <View
        style={{
          flexDirection: 'row',
          alignSelf: 'flex-start',
          justifyContent: 'center',
          alignItems: 'flex-start',
        }}>
        <View style={{paddingRight: 30}}>
          <View
            style={{
              width: 0.65 * Dimensions.get('window').width,
              height: 24,
              borderRadius: 4,
              marginBottom: '1%',
            }}
          />
          <View
            style={{
              marginTop: 7,
              width: 0.65 * Dimensions.get('window').width,
              height: 35,
              borderRadius: 4,
            }}
          />
        </View>
        <View style={{width: 60, height: 60, borderRadius: 50}} />
      </View>

      <View style={{marginTop: '5.5%'}}>
        <View style={{width: '85%', height: 24, marginBottom: '3%'}} />
        <View
          style={{
            borderRadius: 10,
            padding: 12,
            marginVertical: 5,
            alignItems: 'center',
            height: 54,
          }}
        />
      </View>

      <View style={{marginTop: '3%'}}>
        <View style={{width: '60%', height: 24, marginBottom: '3%'}} />
        <View
          style={{
            borderRadius: 10,
            padding: 12,
            marginVertical: 5,
            alignItems: 'center',
            height: 54,
          }}
        />
        <View
          style={{
            borderRadius: 10,
            padding: 12,
            marginVertical: 5,
            alignItems: 'center',
            height: 54,
          }}
        />
      </View>
    </SkeletonPlaceholder>
  );
};

export const LatestItinerarySkeleton = () => {
  return (
    <SkeletonPlaceholder>
      <View style={{marginTop: '3%'}}>
        <View
          style={{
            width: 0.6 * Dimensions.get('window').width,
            height: 24,
            borderRadius: 4,
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
            marginVertical: '2%',
          }}
        />
      </View>
    </SkeletonPlaceholder>
  );
};

export const PastItinerariesSkeleton = () => {
  return (
    <SkeletonPlaceholder>
      <View style={{marginTop: '6%'}}>
        <View
          style={{
            width: 0.6 * Dimensions.get('window').width,
            height: 24,
            borderRadius: 4,
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
            marginVertical: '2%',
          }}
        />
      </View>
    </SkeletonPlaceholder>
  );
};
