import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import CustomButton from '../../components/CustomButton';

export const MapsForEditingAccommodation = ({route, navigation}) => {
  const {id, itemId, itineraryStart, itineraryEnd, owner, address, location} =
    route.params;
  const [region, setRegion] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [addressName, setAddressName] = useState(address);

  useEffect(() => {
    if (location != undefined) {
      setRegion(location);
    }
  }, [route]);

  return (
    <View style={[styles.map, {backgroundColor: '#FFFFFF'}]}>
      <GooglePlacesAutocomplete
        placeholder="Search"
        onPress={(data, details = null) => {
          setAddressName(details.name);
          setRegion({
            latitude: details.geometry.location.lat,
            longitude: details.geometry.location.lng,
          });
          console.log(addressName);
          console.log(region.latitude);
          console.log(region.longitude);
        }}
        minLength={2}
        autoFocus={true}
        fetchDetails={true}
        query={{
          key: 'AIzaSyDybeJqhrj45wpgTndXjBFdbeMFNjci6-A',
          language: 'en',
        }}
        styles={{
          container: {
            flex: 0,
          },

          textInputContainer: {},
        }}
      />
      <MapView
        style={styles.map}
        region={{
          latitude: region.latitude,
          longitude: region.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        onRegionChangeComplete={region => setRegion(region)}
        provider={PROVIDER_GOOGLE}>
        <Marker
          coordinate={{
            latitude: region.latitude,
            longitude: region.longitude,
          }}
        />
      </MapView>
      <CustomButton
        type="TERTIARY"
        text="Save Location"
        onPress={() => {
          navigation.navigate('EditAccommodation', {
            id: id,
            itemId: itemId,
            itineraryStart: itineraryStart,
            itineraryEnd: itineraryEnd,
            owner: owner,
            address: addressName,
            location: region,
          });
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});
