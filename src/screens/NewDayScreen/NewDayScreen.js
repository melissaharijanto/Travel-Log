import React, {useEffect, useState} from 'react';
import {View, Image, StyleSheet, FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import ActivityTab from '../../components/ActivityTab';
import TransportTab from '../../components/TransportTab';
import ActionButton from 'react-native-action-button-warnings-fixed';
import Activity from '../../../assets/images/Activity.png';
import Transport from '../../../assets/images/Transport.png';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {HeaderWithoutDeleteIcon} from '../../components/Headers/Headers';
import {SmallLineBreak} from '../../components/LineBreaks/LineBreaks';
import NewDaySkeleton from '../../components/NewDaySkeleton';

const NewDayScreen = ({route}) => {
  const navigation = useNavigation();

  const [plans, setPlans] = useState(null);

  const {id, dayLabel, date, owner} = route.params;

  const [loading, setLoading] = useState(true);

  // View-only function
  const viewOnly = () => {};
  const [itineraryOwner, isOwner] = useState(true);

  const getTime = time => {
    let minutes = time.toDate().getMinutes();
    let hours = time.toDate().getHours();

    if (hours < 10) {
      hours = `0${hours}`;
    }

    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    return `${hours}:${minutes}`;
  };

  const goBack = () => {
    navigation.goBack();
  };

  const getPlans = async () => {
    let unmounted = false;
    const plansList = [];
    await firestore()
      .collection('itineraries')
      .doc(id)
      .collection('days')
      .doc(dayLabel)
      .collection('plans')
      .orderBy('time')
      .get()
      .then(querySnapshot => {
        if (querySnapshot.empty) {
          console.log('Query is empty.');
          if (loading) {
            setLoading(false);
          }
          return;
        }

        querySnapshot.forEach(doc => {
          if (doc.exists) {
            const {
              name,
              notes,
              type,
              location,
              startingPoint,
              destination,
              id,
              time,
            } = doc.data();

            if (type === 'activity') {
              plansList.push({
                name: name,
                notes: notes,
                type: type,
                location: location,
                id: id,
                time: time,
              });
            }

            if (type === 'transport') {
              plansList.push({
                name: name,
                notes: notes,
                type: type,
                startingPoint: startingPoint,
                destination: destination,
                id: id,
                time: time,
              });
            }

            setPlans(plansList);
          }
        });
        if (loading) {
          setLoading(false);
        }
      });
    return () => {
      unmounted = true;
    };
  };

  useEffect(() => {
    let unmounted = false;
    if (auth().currentUser.uid === owner) {
      isOwner(true);
      console.log('Is owner!');
    } else {
      isOwner(false);
      console.log('Not owner!');
    }

    return () => {
      unmounted = true;
    };
  }, [route]);

  useEffect(() => {
    let unmounted = false;
    getPlans();
    console.log(plans);
    return () => {
      unmounted = true;
    };
  }, [route]);

  return (
    <View style={styles.root}>
      <HeaderWithoutDeleteIcon
        onPress={goBack}
        text={dayLabel}
        flexValue={1.45}
      />

      <SmallLineBreak />

      {loading ? (
        <NewDaySkeleton />
      ) : (
        <View style={styles.content}>
          <FlatList
            data={plans}
            numColumns={1}
            renderItem={({item}) => {
              if (item.type === 'activity') {
                return (
                  <ActivityTab
                    onPress={() => {
                      if (itineraryOwner) {
                        navigation.navigate('ViewActivity', {
                          id: id,
                          dayLabel: dayLabel,
                          itemId: item.id,
                          date: date,
                          owner: owner,
                        });
                      } else {
                        viewOnly();
                      }
                    }}
                    text={item.name}
                    subtext={`${getTime(item.time)} - ${item.location}`}
                  />
                );
              }

              if (item.type === 'transport') {
                return (
                  <TransportTab
                    onPress={() => {
                      if (itineraryOwner) {
                        navigation.navigate('ViewTransport', {
                          id: id,
                          dayLabel: dayLabel,
                          itemId: item.id,
                          date: date,
                          owner: owner,
                        });
                      } else {
                        viewOnly();
                      }
                    }}
                    text={item.name}
                    subtext={`${getTime(item.time)} - ${
                      item.startingPoint
                    } >> ${item.destination}`}
                  />
                );
              }
            }}
            keyExtractor={(contact, index) => String(index)}
            ItemSeparatorComponent={() => <View style={{marginBottom: 5}} />}
          />
        </View>
      )}
      {itineraryOwner ? (
        <ActionButton
          shadowStyle={styles.shadow}
          buttonColor="#70D9D3"
          size={65}
          spacing={15}>
          <ActionButton.Item
            size={55}
            buttonColor="#70D9D3"
            title="Activity"
            onPress={() => {
              navigation.navigate('AddActivity', {
                dayLabel: dayLabel,
                id: id,
                date: date,
                owner: owner,
              });
            }}
            textStyle={styles.buttonText}
            shadowStyle={styles.shadow}>
            <Image source={Activity} style={{width: 55, height: 55}} />
          </ActionButton.Item>

          <ActionButton.Item
            size={55}
            buttonColor="#70D9D3"
            title="Transport"
            onPress={() => {
              navigation.navigate('AddTransport', {
                dayLabel: dayLabel,
                id: id,
                date: date,
                owner: owner,
              });
            }}
            textStyle={styles.buttonText}
            shadowStyle={styles.shadow}>
            <Image source={Transport} style={{width: 55, height: 55}} />
          </ActionButton.Item>
        </ActionButton>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    width: '100%',
  },
  content: {
    width: '100%',
    paddingHorizontal: '5%',
    flex: 1,
  },
  text: {
    fontFamily: 'Poppins-Medium',
    color: '#333333',
    paddingTop: 2,
  },
  buttonText: {
    fontFamily: 'Poppins-Regular',
    color: '#70D9D3',
  },
  shadow: {
    shadowOpacity: 1,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 10,
    elevation: 8,
  },
});

export default NewDayScreen;
