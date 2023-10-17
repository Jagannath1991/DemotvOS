import React, {useEffect} from 'react';
import {View} from 'react-native';
import Video from 'react-native-video';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('HomeScreen');
    }, 4000);
  }, []);

  return (
    <View style={{flex: 1}}>
      <Video
        source={require('../splashscreen/Ticker_splash_screen.mp4')}
        style={{flex: 1}}
        resizeMode="cover"
        onEnd={() => navigation.replace('HomeScreen')}
      />
    </View>
  );
};

export default SplashScreen;
