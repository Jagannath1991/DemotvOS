import React, {useState, useRef, useEffect} from 'react';
import {
  Image,
  TouchableOpacity,
  Text,
  View,
  Alert,
  Platform,
} from 'react-native';
import {useMessage} from '../../context/MessageProvider';
import {useNavigation} from '@react-navigation/native';

export default function LiveCard({item, index, flatListRef, length}) {
  console.log('ITEM LENGHT', length);
  const [isFocused, setFocused] = useState(false);
  const navigation = useNavigation();

  // const [focusedTitle, setFocusedTitle] = useState('');
  // const [focusedDescription, setFocusedDescription] = useState('');
  const nextRightFocusableElement = useRef();
  const nextLeftFocusableElement = useRef();
  const {
    setFocusedIndex,
    setFocusedTitle,
    setFocusedDescription,
    setFocusedBackground,
  } = useMessage();
  const thumbnail605x340 = item.thumbnail_urls.find(thumbnail =>
    thumbnail.hasOwnProperty('605x340'),
  );

  const handleFocus = () => {
    setFocused(true);
    setFocusedTitle(item.thumbnametitle);
    setFocusedDescription(item.title);
    setFocusedIndex(index);
    setFocusedBackground(item.poster1920x1080_url);
    console.log(`Focused on card at index ${index}`);
  };

  const handleBlur = () => {
    setFocused(false);
  };

  useEffect(() => {
    if (index === 0) {
      // Set initial focus to index 0 when the component mounts
      flatListRef.current.scrollToIndex({animated: false, index: 0});
      setFocused(true);
      setFocusedTitle(item.thumbnametitle);
      setFocusedDescription(item.title);
      setFocusedBackground(item.poster1920x1080_url);
    }
  }, [index, flatListRef, item]);
  const handlePrss = () => {
    // Alert.alert('cliked');
    //const videoUrl = item.video_url;
    navigation.navigate('VideoPlayer', {
      videoUrl: item.video_url,
      title: item.thumbnametitle,
    });
  };

  if (thumbnail605x340) {
    const thumbnailUrl = thumbnail605x340['605x340'];

    return (
      <View>
        <TouchableOpacity
          style={{
            height: Platform.OS === 'android' ? 140 : 265,
            width: Platform.OS === 'android' ? 220 : 385,
            marginRight: 10,
            display: 'flex',
            borderColor: isFocused ? 'white' : 'transparent',
            borderWidth: Platform.OS === 'android' ? 2 : 4,
            borderRadius: Platform.OS === 'android' ? 10 : 20,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'transparent',
          }}
          // hasTVPreferredFocus={isFocused}
          nextFocusRight={nextRightFocusableElement}
          nextFocusLeft={nextLeftFocusableElement}
          onPress={handlePrss}
          onFocus={handleFocus}
          onBlur={handleBlur}
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
            width: Platform.OS === 'android' ? 200 : 300,
          }}>
          {item.thumbnametitle}
        </Text>
      </View>
    );
  } else {
    return null;
  }
}
