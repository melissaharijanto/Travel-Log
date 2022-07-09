import React, {useEffect, useState} from 'react';
import {StyleSheet, View, LogBox} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import RNLocation from 'react-native-location';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import CustomButton from '../../components/CustomButton';

LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by messagerr

export const MapsForAddingAccommodation = ({route, navigation}) => {
  const {id, itineraryStart, itineraryEnd, owner, address, location} =
    route.params;
  const [region, setRegion] = useState(location);
  const [addressName, setAddressName] = useState(address);

  const setInitialLocation = () => {
    RNLocation.configure({
      distanceFilter: 100,
      desiredAccuracy: {
        ios: 'best',
        android: 'balancedPowerAccuracy',
      },
      // Android only
      androidProvider: 'auto',
      interval: 5000, // Milliseconds
      fastestInterval: 10000, // Milliseconds
      maxWaitTime: 5000, // Milliseconds
    });
    if (location == undefined) {
      RNLocation.requestPermission({
        ios: 'whenInUse',
        android: {
          detail: 'coarse',
        },
      }).then(granted => {
        if (granted) {
          RNLocation.getLatestLocation({timeout: 60000}).then(
            latestLocation => {
              setRegion({
                latitude: latestLocation.latitude,
                longitude: latestLocation.longitude,
              });

              console.log(latestLocation);
              console.log(region.latitude);
              console.log(region.longitude);
            },
          );
        }
      });
    }
  };

  useEffect(() => {
    let unmounted = false;
    setInitialLocation();
    return () => {
      unmounted = true;
    };
  }, [route]);

  return (
    <View style={[styles.map, {backgroundColor: '#FFFFFF'}]}>
      <GooglePlacesAutocomplete
        placeholder="Search"
        onPress={(data, details = null) => {
          setAddressName(details.name);
          console.log(addressName);
          console.log(details.geometry.location.lat);
          console.log(details.geometry.location.lng);
          setRegion({
            latitude: details.geometry.location.lat,
            longitude: details.geometry.location.lng,
          });
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

          textInputContainer: {
            flex: 0,
          },
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
          navigation.navigate('AddAccommodation', {
            id: id,
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
