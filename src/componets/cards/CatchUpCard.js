import React, {useState, useRef} from 'react';
import {Image, TouchableOpacity, Text, View, Platform} from 'react-native';
import {useNavigation, useFocusEffect} from '@react-navigation/native';

export default function CatchUpCard({item, index, onPress, videoUrls}) {
  const [isFocused, setFocused] = useState(false);
  const nextRightFocusableElement = useRef();
  const nextLeftFocusableElement = useRef();
  const navigation = useNavigation();

  console.log('CATCH UP', videoUrls.length);
  const thumbnail605x340 = item.thumbnail_urls.find(thumbnail =>
    thumbnail.hasOwnProperty('605x340'),
  );

  function formatDuration(durationInSeconds) {
    const totalMinutes = Math.floor(durationInSeconds / 60);
    return totalMinutes + ' min';
  }

  const handleFocus = () => {
    setFocused(true);

    console.log(`Focused on card at index ${index}`);
  };

  const handleBlur = () => {
    setFocused(false);
  };
  const handlePress = () => {
    navigation.navigate('Player', {
      videoUrl: item.video_url,
      title: item.title,
      index: index,
      videoUrls: videoUrls,
    });
    //Alert.alert(`clicked on index ${index} video url ${item.video_url}`);
  };

  if (thumbnail605x340) {
    const thumbnailUrl = thumbnail605x340['605x340'];
    console.log('thumbnailUrl', thumbnailUrl);
    return (
      <View>
        <TouchableOpacity
          style={{
            height: Platform.OS === 'android' ? 140 : 265,
            width: Platform.OS === 'android' ? 220 : 388,
            marginRight: Platform.OS === 'android' ? 10 : 20,
            display: 'flex',
            borderColor: isFocused ? 'white' : 'transparent',
            borderWidth: Platform.OS === 'android' ? 2 : 4,
            borderRadius: Platform.OS === 'android' ? 10 : 20,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          nextFocusRight={nextRightFocusableElement}
          nextFocusLeft={nextLeftFocusableElement}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onPress={() => {
            onPress(index); // Call the onPress callback with the index
            handlePress();
          }}
          activeOpacity={1}>
          <Image
            source={{uri: thumbnailUrl}}
            style={{
              height: Platform.OS === 'android' ? 120 : 230,
              width: Platform.OS === 'android' ? 200 : 350,
              borderRadius: Platform.OS === 'android' ? 10 : 20,
              backgroundColor: 'rgba(0,0,0,0.5)',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          />
        </TouchableOpacity>
        <Text
          style={{
            color: '#fff',
            marginTop: 5,

            fontSize: Platform.OS === 'android' ? 16 : 22,
            width: Platform.OS === 'android' ? 200 : 400,
          }}
          numberOfLines={2}>
          {item.title}
        </Text>
        <Text
          style={{
            color: '#fff',
            zIndex: 9999,
            fontSize: Platform.OS === 'android' ? 16 : 22,
          }}>
          {formatDuration(item.duration_secs)}
        </Text>
      </View>
    );
  } else {
    return null;
  }
}
