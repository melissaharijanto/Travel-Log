import React, {useEffect, useState} from 'react';
import {View, FlatList, StyleSheet, Text} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import IndividualRecommendationTab from '../../components/IndividualRecommendationTab';

const RecommendationScreen = ({navigation, route}) => {
  const {id, type} = route.params;
  const [recommendation, setRecommendation] = useState();

  useEffect(() => {
    if (type == 'accommodations') {
      getAccommodationRecs();
    }
    if (type == 'restaurants') {
      getRestaurantRecs();
    }
    if (type == 'activities') {
      getActivitiesRecs();
    }
    console.log(type);
  }, [route]);

  const threeStars = '\u2605\u2605\u2605\u2606\u2606';
  const fourStars = '\u2605\u2605\u2605\u2605\u2606';
  const fiveStars = '\u2605\u2605\u2605\u2605\u2605';

  const getActivitiesRecs = async () => {
    const activitiesList = [];
    await firestore()
      .collection('recommendations')
      .doc(id)
      .collection('activities')
      .orderBy('name')
      .get()
      .then(querySnapshot => {
        if (querySnapshot.empty) {
          console.log('Query is empty.');
          return;
        }
        querySnapshot.forEach(doc => {
          if (doc.exists) {
            const {name, address, price, location, img, site, desc} =
              doc.data();

            activitiesList.push({
              name: name,
              address: address,
              ratings: price,
              img: img,
              location: location,
              site: site,
              desc: desc,
            });
          }
        });

        setRecommendation(activitiesList);
        console.log(recommendation);
      });
  };

  const getRestaurantRecs = async () => {
    const restaurantList = [];
    await firestore()
      .collection('recommendations')
      .doc(id)
      .collection('restaurants')
      .orderBy('name')
      .get()
      .then(querySnapshot => {
        if (querySnapshot.empty) {
          console.log('Query is empty.');
          return;
        }
        querySnapshot.forEach(doc => {
          if (doc.exists) {
            const {name, address, price, location, img, site, desc} =
              doc.data();

            restaurantList.push({
              name: name,
              address: address,
              ratings: price,
              img: img,
              location: location,
              site: site,
              desc: desc,
            });
          }
        });

        setRecommendation(restaurantList);
        console.log(recommendation);
      });
  };

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
            const {name, ratings, address, img, location, site, desc} =
              doc.data();

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
              site: site,
              desc: desc,
            });
          }
        });

        setRecommendation(accommodationList);
      });
  };
  return (
    <View style={styles.root}>
      <FlatList
        data={recommendation}
        renderItem={({item}) => {
          return (
            <IndividualRecommendationTab
              name={item.name}
              address={item.address}
              ratings={item.ratings}
              image={item.img}
              onPress={() => {
                navigation.navigate('MapsForRecommendation', {
                  type: type,
                  location: item.location,
                  name: item.name,
                  address: item.address,
                  ratings: item.ratings,
                  site: item.site,
                  desc: item.desc,
                });
              }}
            />
          );
        }}
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
export default RecommendationScreen;
