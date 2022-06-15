
import React, { useEffect, useState } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    ImageBackground, 
    Dimensions, 
    FlatList,
    Alert,
} from 'react-native';
import EditIcon from 'react-native-vector-icons/AntDesign';
import CopyIcon from 'react-native-vector-icons/MaterialIcons'
import Back from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import DayTab from '../../components/DayTab';
import Clipboard from '@react-native-community/clipboard';
import firestore from '@react-native-firebase/firestore';

const OpeningItineraryScreen = ({route}) => {
    const { itinerary } = route.params;

    const navigation = useNavigation();

    const dateString = (date) => {
        const months = ["January", "February", "March", 
        "April", "May", "June", "July", "August", "September", 
        "October", "November", "December"];
        const days = ["Monday", "Tuesday", "Wednesday", "Thursday", 
        "Friday", "Saturday", "Sunday"];
        return `${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
    };

    const editItinerary = () => {
        navigation.navigate("EditItineraryFromHome", {
            itinerary: itinerary,
        });
    }

    const [ days, setDays ] = useState(null);

    const getDays = async () => {
        try {
        const daysList = [];
        await firestore()
            .collection('itineraries')
            .doc(itinerary.id)
            .collection('days')
            .orderBy('id')
            .onSnapshot((querySnapshot) => {

                if (querySnapshot.empty) {
                    console.log('Query is empty.');
                    return;
                }
                querySnapshot.forEach((doc) => {

                    const {
                        date,
                        id,
                        label,
                    } = doc.data();
                    
                    daysList.push({
                        id: id,
                        date: date,
                        label: label,
                    })
    
                    setDays(daysList);
                }) 
            })

        } catch(e) {
            console.log(e);
        }
    }
    const goBack = () => {
        navigation.goBack();
    }

    useEffect(() => {
        getDays();
        return;
    }, []);

    useEffect(() => {
        getDays();
        return;
    }, [route]);

    return (
        <View style={styles.view}>
            <ImageBackground 
                source={{uri: itinerary.coverImage}}
                style={styles.coverImage}>
                <View style= {styles.overlay}/>
                <Back
                    size={35}
                    name="chevron-left"
                    color="#FFFFFF"
                    onPress = { goBack }
                    style = {{
                        flex: 1,
                        paddingTop: 20,
                        paddingLeft: 15,
                    }}
                />

                <Text style={ styles.imageSubtitle }>You are opening</Text>
                
                <View style={styles.horizontal}>
                    <Text style={ styles.imageHeader }>{ itinerary.title } </Text>
                    <EditIcon
                        size={25}
                        name="edit"
                        color="#FFFFFF"
                        onPress = { editItinerary }
                    />
                </View>
                <View style={styles.horizontal}>
                    <Text style={ styles.imageText }>Invite Code: { itinerary.id } </Text>
                    <CopyIcon
                        size={15}
                        name="content-copy"
                        color="#FFFFFF"
                        onPress={() => {
                            Clipboard.setString(itinerary.id);
                            Alert.alert('Success!', 'Invite code has been copied to clipboard.');
                            }
                        }
                        style = {{
                            flex: 1,
                            paddingTop: 5,
                        }}
                    />
                </View>
            </ImageBackground>
            <View style={styles.content}>
            <FlatList
                data={ days }
                numColumns={1}
                renderItem={({item}) => (
                    <DayTab
                        text = { item.label }
                        subtext = { dateString(item.date.toDate()) }
                        onPress={ () => { navigation.navigate("NewDay", {
                                itinerary: itinerary,
                            }) 
                        }}
                    />
                )}
                ItemSeparatorComponent={ () => <View style={{marginBottom: 5}} /> }
            ></FlatList>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    content:{
        paddingHorizontal: '4%',
        paddingTop: 10,
        flex: 1,
        paddingBottom: 10,
    },
    coverImage: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').width/2,
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#00000050',
    },
    horizontal: {
        flexDirection: 'row',
    },
    imageHeader: {
        fontFamily: 'Poppins-Bold',
        color: '#FFFFFF',
        fontSize: 26,
        elevation: 10,
        shadowOpacity: 1,
        shadowRadius: 1,
        paddingLeft: 20,
        lineHeight: 30,
    },
    imageSubtitle: {
        fontFamily: 'Poppins-Regular',
        color: '#FFFFFF',
        fontSize: 18,
        elevation: 10,
        shadowOpacity: 1,
        shadowRadius: 1,
        paddingLeft: 20,
        lineHeight: 30,
    },
    imageText: {
        fontFamily: 'Poppins-Regular',
        color: '#FFFFFF',
        fontSize: 12,
        elevation: 10,
        shadowOpacity: 1,
        shadowRadius: 1,
        paddingLeft: 20,
        lineHeight: 30,
        paddingBottom: 5,
    },
    view: {
        flex: 1,
        backgroundColor: 'white',
    },
})

export default OpeningItineraryScreen;