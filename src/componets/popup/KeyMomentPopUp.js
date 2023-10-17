import React, {useEffect, useState} from 'react';
import {
  View,
  Modal,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  FlatList,
} from 'react-native';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
const KeyMomentPopUp = ({isVisible, onKeymomentSelect, onClose}) => {
  const [keymomentData, setKeymomentData] = useState([]); // Initialize keymomentData as an array
  console.log('key', keymomentData);
  const navigation = useNavigation();
  const fetchCatchUpData = async () => {
    try {
      const response = await fetch(
        `https://zznylmsrqi.execute-api.us-east-2.amazonaws.com/vprism/cms/videolistv2?account_id=61a0c96ed4f9d00009d0f691&portal_id=64f1e7ba1496c9000811f517&master_profile_id=64f17c33234f220008803d38&pgindex=0&pgitems=10`,
        {
          method: 'GET',
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();

      setKeymomentData(result);
    } catch (error) {
      console.error('Error message', error);
    }
  };

  useEffect(() => {
    fetchCatchUpData();
  }, []);

  function formatDuration(durationInSeconds) {
    const totalMinutes = Math.floor(durationInSeconds / 60);
    return totalMinutes + ' min';
  }

  const renderKeyMoment = ({item}) => {
    const thumbnail605x340 = item.thumbnail_urls.find(thumbnail =>
      thumbnail.hasOwnProperty('605x340'),
    );
    const handlePress = () => {
      navigation.navigate('KeyMomentPlayer', {
        videoUrl: item.video_url,
        title: item.title,
        index: item.index,
      });
      onClose();
      //Alert.alert(`clicked on index ${index} video url ${item.video_url}`);
    };
    return (
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          style={styles.imageContainer}
          onPress={() => {
            handlePress();
          }}>
          {thumbnail605x340 && (
            <Image
              source={{uri: thumbnail605x340['605x340']}}
              style={styles.thumbnailImage}
            />
          )}
        </TouchableOpacity>
        <View style={{justifyContent: 'center', width: 170}}>
          <Text style={styles.text} numberOfLines={2}>
            {item.title}
          </Text>
          <Text style={styles.text}>{formatDuration(item.duration_secs)}</Text>
        </View>
      </View>
    );
  };

  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={isVisible}
      onRequestClose={onClose}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'flex-end',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}>
        <View
          style={{
            width: 380,
            alignItems: 'center',
            paddingTop: 30,
            height: '100%',
            backgroundColor: 'rgba(15, 8, 40, 1)',
          }}>
          <Text
            style={{
              marginRight: 180,
              fontSize: 20,
              paddingBottom: 20,
              fontWeight: 'bold',
              color: '#fff',
            }}>
            Key Moments
          </Text>
          <View>
            <FlatList data={keymomentData} renderItem={renderKeyMoment} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  //   button: {
  //     borderWidth: 1,
  //     borderColor: 'gray',
  //     paddingVertical: 5,
  //     paddingHorizontal: 10,
  //     width: 300,
  //     margin: 10,
  //     borderRadius: 5,
  //     flexDirection: 'row',
  //     alignItems: 'center',
  //     //justifyContent: 'space-between',
  //   },
  text: {
    color: 'white',
  },
  thumbnailImage: {
    width: 140, // Adjust the width and height as needed
    height: 85,
    //marginRight: 10,
    //marginLeft: 10,
    borderRadius: 5,
    //padding: 5,
    //marginVertical: 10,
    backgroundColor: 'black',
  },
  imageContainer: {
    padding: 10,
  },
});

export default KeyMomentPopUp;
