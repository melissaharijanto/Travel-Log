import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, Dimensions} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {
  LocationAddress,
  LocationName,
  Ratings,
  PriceTag,
  WebsiteLink,
  Description,
} from '../../components/CustomTextStyles/CustomTextStyles';
import {HeaderWithoutDeleteIcon} from '../../components/Headers/Headers';
import KeyboardAvoidingWrapper from '../../components/KeyboardAvoidingWrapper';
import {SmallLineBreak} from '../../components/LineBreaks/LineBreaks';

export const MapsForRecommendationScreen = ({route, navigation}) => {
  const {type, location, name, address, ratings, site, desc} = route.params;

  const [region, setRegion] = useState({
    latitude: 0,
    longitude: 0,
  });

  useEffect(() => {
    if (location != undefined) {
      setRegion(location);
      console.log(type);
      console.log(type === 'accommodations');
    }
  }, [route]);
  return (
    <View style={[styles.map, {backgroundColor: '#FFFFFF'}]}>
      <HeaderWithoutDeleteIcon
        text="View Location"
        onPress={() => navigation.goBack()}
        flexValue={2.5}
      />
      <View
        style={{
          height: '50%',
          borderBottomColor: '#3B494950',
          borderBottomWidth: 1,
          borderTopColor: '#3B494950',
          borderTopWidth: 1,
        }}>
        <MapView
          style={styles.map}
          region={{
            latitude: region.latitude,
            longitude: region.longitude,
            latitudeDelta: 0.001,
            longitudeDelta: 0.001,
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
      <KeyboardAvoidingWrapper>
        <View
          style={{
            paddingHorizontal: '5%',
            width: '100%',
          }}>
          <View>
            <LocationName text={name} />
          </View>
          <View style={{paddingRight: '2%'}}>
            {type === 'accommodations' ? (
              <Ratings text={ratings} />
            ) : (
              <PriceTag text={ratings} />
            )}
            <LocationAddress text={address} />
            {site ? <WebsiteLink text={site} /> : null}
            <SmallLineBreak />
            {desc ? <Description text={desc} /> : null}
            <SmallLineBreak />
          </View>
        </View>
      </KeyboardAvoidingWrapper>
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
    justifyContent: 'flex-start',
    borderBottomColor: '#808080',
    borderWidth: 1,
  },
});
