import React, {useEffect, useRef} from 'react';
import {Image, Text, View, Animated, Easing} from 'react-native';
import {styles} from './LoaderScreenStyle';

export default function LoaderScreen() {
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  }, [spinValue]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('../../assets/images/loader.png')}
        style={[styles.loaderImage, {transform: [{rotate: spin}]}]}
      />
    </View>
  );
}
