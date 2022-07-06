import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Image, FlatList, Text} from 'react-native';
import Logo from '../../../assets/images/logo3.png';
import {HomeSubtitle} from '../../components/CustomTextStyles/CustomTextStyles';
import KeyboardAvoidingWrapper from '../../components/KeyboardAvoidingWrapper/KeyboardAvoidingWrapper';
import firestore from '@react-native-firebase/firestore';
import {useFocusEffect} from '@react-navigation/native';
import {SmallLineBreak} from '../../components/LineBreaks/LineBreaks';
import RecommendationTab from '../../components/RecommendationTab';

const FeaturedScreen = () => {
  const [recommendationList, setRecommendationList] = useState();

  const getRecommendations = async () => {
    const recommendations = [];
    firestore()
      .collection('recommendations')
      .onSnapshot(querySnapshot => {
        if (querySnapshot.empty) {
          return;
        }
        querySnapshot.forEach(doc => {
          const {imgUrl} = doc.data();

          recommendations.push({
            imgUrl: imgUrl,
          });
        });

        setRecommendationList(recommendations);
        console.log(recommendationList);
      });
  };

  useFocusEffect(
    React.useCallback(() => {
      let unmounted = false;
      getRecommendations();
      return () => {
        unmounted = true;
      };
    }, []),
  );

  return (
    <KeyboardAvoidingWrapper backgroundColor="#FFFFFF">
      <View style={styles.root}>
        <View style={styles.header}>
          <Image source={Logo} style={styles.logo} resizeMode="contain" />
        </View>
        <SmallLineBreak />

        <View style={styles.content}>
          <FlatList
            data={recommendationList}
            horizontal
            numColumns={1}
            renderItem={({item}) => (
              <RecommendationTab image={item.imgUrl} onPress={() => {}} />
            )}
          />
          <SmallLineBreak />
          <HomeSubtitle text="Featured Itineraries" />

          <SmallLineBreak />
          <HomeSubtitle text="Recommended For You" />
        </View>
      </View>
    </KeyboardAvoidingWrapper>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    flex: 1,
  },
  content: {
    paddingHorizontal: '7%',
    flex: 1,
  },
  logo: {
    width: '50%',
    maxWidth: 700,
    maxHeight: 200,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    height: 65,
    width: '100%',
    paddingLeft: 10,
    elevation: 15,
    shadowColor: '#70D9D3',
    shadowOpacity: 1,
  },
});
export default FeaturedScreen;
