import React, {useEffect, useState} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {HotelTab} from '../../components/Recommendations/HotelTab';
import KeyboardAvoidingWrapper from '../../components/KeyboardAvoidingWrapper';

const AccommodationRecs = ({navigation, route}) => {
  const {id} = route.params;
  const [accommodation, setAccommodation] = useState();
  useEffect(() => {
    getAccommodationRecs();
  }, [route]);

  const threeStars = '\u2605\u2605\u2605\u2606\u2606';
  const fourStars = '\u2605\u2605\u2605\u2605\u2606';
  const fiveStars = '\u2605\u2605\u2605\u2605\u2605';

  const getAccommodationRecs = async () => {
    const accommodationList = [];
    await firestore()
      .collection('recommendations')
      .doc(id)
      .collection('accommodations')
      .orderBy('name')
      .get()
      .then(querySnapshot => {
        if (querySnapshot.empty) {
          console.log('Query is empty.');
          return;
        }

        querySnapshot.forEach(doc => {
          if (doc.exists) {
            const {name, ratings, address, img, location} = doc.data();

            let stars = '';

            if (ratings == 3) {
              stars = threeStars;
            } else if (ratings == 4) {
              stars = fourStars;
            } else if (ratings == 5) {
              stars = fiveStars;
            }
            accommodationList.push({
              name: name,
              address: address,
              ratings: stars,
              img: img,
              location: location,
            });
          }
        });

        setAccommodation(accommodationList);
        console.log(accommodation);
      });
  };
  return (
    <View style={styles.root}>
      <FlatList
        data={accommodation}
        renderItem={({item}) => (
          <HotelTab
            name={item.name}
            address={item.address}
            ratings={item.ratings}
            image={item.img}
            onPress={() => {
              navigation.navigate('ViewMap', {
                location: item.location,
              });
            }}
          />
        )}
        keyExtractor={(contact, index) => String(index)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
});
export default AccommodationRecs;
