import React, {useEffect, useState} from 'react';
import {View, StyleSheet, FlatList, Dimensions} from 'react-native';
import {
  FeaturedSubtitle,
  FeaturedTitle,
  HomeSubtitle,
} from '../../components/CustomTextStyles/CustomTextStyles';
import KeyboardAvoidingWrapper from '../../components/KeyboardAvoidingWrapper/KeyboardAvoidingWrapper';
import firestore from '@react-native-firebase/firestore';
import {SmallLineBreak} from '../../components/LineBreaks/LineBreaks';
import RecommendationTab from '../../components/RecommendationTab';
import ItineraryTab from '../../components/ItineraryTab';
import auth from '@react-native-firebase/auth';
import {LogoOnlyHeader} from '../../components/Headers/Headers';
import FeaturedSkeleton from '../../components/FeaturedSkeleton';

const width = Dimensions.get('window').width;

const FeaturedScreen = ({navigation, route}) => {
  const [recommendationList, setRecommendationList] = useState([]);
  const [itineraries, setItineraries] = useState([]);
  const [featuredItineraries, setFeaturedItineraries] = useState([]);
  const [loading, setLoading] = useState(true);

  const getRecommendations = async () => {
    const recommendations = [];
    firestore()
      .collection('recommendations')
      .onSnapshot(querySnapshot => {
        if (querySnapshot.empty) {
          return;
        }
        querySnapshot.forEach(doc => {
          const {imgUrl, id} = doc.data();

          recommendations.push({
            imgUrl: imgUrl,
            id: id,
          });
        });

        setRecommendationList(recommendations);
        console.log(recommendationList);
      });
  };

  const getItineraries = () => {
    const itineraryList = [];
    firestore()
      .collection('itineraries')
      .where('owner', '!=', auth().currentUser.uid)
      .onSnapshot(querySnapshot => {
        if (querySnapshot.empty) {
          if (loading) {
            setLoading(false);
          }
          return;
        }

        querySnapshot.forEach(doc => {
          const {
            id,
            coverImage,
            createdAt,
            days,
            endDate,
            notes,
            owner,
            startDate,
            title,
          } = doc.data();

          itineraryList.push({
            id: id,
            coverImage: coverImage,
            createdAt: createdAt,
            days: days,
            endDate: endDate,
            notes: notes,
            owner: owner,
            startDate: startDate,
            title: title,
          });
        });

        setItineraries(itineraryList);
        console.log(itineraries);
        console.log(itineraries.length);
      });
  };

  const setFeatured = () => {
    const itineraryListSize = itineraries.length;
    const randomItineraryList = [];
    for (let i = 0; i < itineraryListSize; i++) {
      const randomNumber = Math.floor(Math.random() * itineraryListSize);
      const randomItinerary = itineraries[randomNumber];
      if (!randomItineraryList.includes(randomItinerary)) {
        randomItineraryList.push(randomItinerary);
        if (randomItineraryList.length >= 3) {
          break;
        }
      }
    }
    setFeaturedItineraries(randomItineraryList);

    if (loading) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRecommendations();
  }, [route]);

  useEffect(() => {
    let unmounted = false;
    getItineraries();
  }, [route]);

  useEffect(() => {
    let unmounted = false;
    setFeatured();
    console.log(featuredItineraries);
    return () => {
      unmounted = true;
    };
  }, [itineraries]);

  return (
    <KeyboardAvoidingWrapper backgroundColor="#FFFFFF">
      {loading ? (
        <FeaturedSkeleton />
      ) : (
        <View style={styles.root}>
          <View style={styles.circle}>
            <FeaturedTitle
              text="Discover More."
              style={{paddingTop: width / 2 + 20, lineHeight: 5}}
            />
            <FeaturedSubtitle text="Here are some recommendations for you." />
          </View>
          <LogoOnlyHeader borderBottomWidth={1} />
          <SmallLineBreak />

          <View style={styles.content}>
            <HomeSubtitle text="Featured Itineraries" />
            <FlatList
              data={featuredItineraries}
              horizontal
              showsHorizontalScrollIndicator={false}
              numColumns={1}
              renderItem={({item}) => (
                <ItineraryTab
                  text={item.title}
                  image={item.coverImage}
                  onPress={() => {
                    navigation.navigate('OpenItinerary', {
                      itinerary: item,
                    });
                  }}
                />
              )}
              ItemSeparatorComponent={() => <View style={{marginRight: 10}} />}
              keyExtractor={(contact, index) => String(index)}
            />

            <HomeSubtitle text="View Our Recommendations!" />
            <FlatList
              data={recommendationList}
              horizontal
              showsHorizontalScrollIndicator={false}
              numColumns={1}
              renderItem={({item}) => (
                <RecommendationTab
                  image={item.imgUrl}
                  onPress={() => {
                    {
                      navigation.navigate('Recommendations', {
                        id: item.id,
                      });
                    }
                  }}
                />
              )}
              ItemSeparatorComponent={() => <View style={{marginRight: 10}} />}
              keyExtractor={(contact, index) => String(index)}
            />

            <SmallLineBreak />
          </View>
        </View>
      )}
    </KeyboardAvoidingWrapper>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    flex: 1,
  },
  circle: {
    position: 'absolute',
    width: width * 1.05,
    height: width,
    borderRadius: width / 2,
    backgroundColor: '#70D9D3',
    bottom: width * 1.25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    paddingLeft: '5%',
    paddingRight: '2%',
    flex: 1,
    paddingTop: '48%',
  },
});
export default FeaturedScreen;
