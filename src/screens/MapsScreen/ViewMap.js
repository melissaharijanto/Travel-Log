import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {useNavigation} from '@react-navigation/native';
import {HeaderWithoutDeleteIcon} from '../../components/Headers/Headers';

export const ViewMap = ({route}) => {
  const {location} = route.params;

  const navigation = useNavigation();

  const [region, setRegion] = useState({
    latitude: 0,
    longitude: 0,
  });

  useEffect(() => {
    if (location != undefined) {
      setRegion(location);
    }
  }, [route]);
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
          latitude: region.latitude,
          longitude: region.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        provider={PROVIDER_GOOGLE}>
        <Marker
          coordinate={{
            latitude: region.latitude,
            longitude: region.longitude,
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
