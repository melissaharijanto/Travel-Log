import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import RNLocation from 'react-native-location';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import CustomButton from '../../components/CustomButton';
import {useNavigation} from '@react-navigation/native';
import {HeaderWithoutDeleteIcon} from '../../components/Headers/Headers';

export const ViewMap = ({route}) => {
  const {location} = route.params;

  const navigation = useNavigation();

  return (
    <View style={[styles.map, {backgroundColor: '#FFFFFF'}]}>
      <HeaderWithoutDeleteIcon
        text="View Location"
        onPress={() => navigation.goBack()}
        flexValue={2.5}
      />
      <MapView
        style={styles.map}
        region={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        provider={PROVIDER_GOOGLE}>
        <Marker
          coordinate={{
            latitude: location.latitude,
            longitude: location.longitude,
          }}
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});
