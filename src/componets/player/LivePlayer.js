import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  ImageBackground,
  TextInput,
  ActivityIndicator,
  Platform,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import Video from 'react-native-video';
import LanguagePopup from '../popup/LanguagePopUp';
import QualityPopUp from '../popup/QualityPopUp';
import KeyMomentPopUp from '../popup/KeyMomentPopUp';
const {height, width} = Dimensions.get('window');

export default function LivePlayer() {
  const [clicked, setClicked] = useState(false);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(null);
  const [showControls, setShowControls] = useState(true);
  const [sliderValue, setSliderValue] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [showLanguagePopup, setShowLanguagePopup] = useState(false);
  const [showQualityPopup, setShowQualityPopup] = useState(false);
  const [language, setSelectedLanguage] = useState('English');
  const [quality, setQuality] = useState('Auto');
  const [islive, setIsLive] = useState(true);
  const [showKeymomentPopup, setShowKeyMomentPopup] = useState(false);
  const [playControlFocused, setPlayControlFocused] = useState(false);

  const playImageRef = useRef(null);

  //   const videoUrl =
  //     'https://tickernews-vodcdn.vidgyor.com/61a0c96ed4f9d00009d0f691/aqpco3a9/64f17c33234f220008803d38/master.m3u8';

  const route = useRoute();
  const {videoUrl, title} = route.params;
  console.log('Video url', videoUrl);

  const handleUserInteraction = () => {
    setShowControls(true);
    setPlayControlFocused(true);
  };

  useEffect(() => {
    const timerId = setTimeout(() => {
      setShowControls(false);
    }, 15000);

    return () => {
      clearTimeout(timerId);
    };
  }, [showControls]);

  const handleLoadStart = () => {
    setIsLoading(true);

    console.log('OnHanle Load Start', isLoading);
  };

  const handleLanguageSelect = selectedLanguage => {
    // Handle the selected language here
    console.log(`Selected language: ${selectedLanguage}`);
    // Close the language popup
    setSelectedLanguage(selectedLanguage);
    setShowLanguagePopup(false);
  };

  const handleCloseQualityPopup = () => {
    setShowQualityPopup(false);
  };
  const handleQualitySelect = selectedQuality => {
    // Handle the selected language here
    console.log(`Selected language: ${selectedQuality}`);
    // Close the language popup
    setQuality(selectedQuality);
    setShowQualityPopup(false);
  };

  const handleCloseLanguagePopup = () => {
    setShowLanguagePopup(false);
  };
  const handleKeymomentSelect = () => {
    setShowKeyMomentPopup(false);
  };
  const handleCloseKeymomentPopup = () => {
    setShowKeyMomentPopup(false);
  };

  const handleLoad = () => {
    console.log('On Loaded', isLoading);
    setIsLoading(false);
  };
  return (
    <View style={{flex: 1}}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          setClicked(true);
          handleUserInteraction();
        }}>
        <Video
          paused={paused}
          source={{
            uri: videoUrl,
          }}
          style={{width: width, height: height}}
          onLoadStart={handleLoadStart}
          onLoad={handleLoad}
          resizeMode="contain"
        />
        {isLoading && (
          <ImageBackground
            source={require('../../assets/images/bkg-image.png')}
            style={styles.loaderContainer}>
            <ActivityIndicator size={60} color="#fff" />
          </ImageBackground>
        )}
        {showControls && clicked && (
          <View>
            {/* <View style={styles.topOverlay}>
              <Text>Ticker News</Text>
            </View> */}
            <View>
              <ImageBackground
                style={styles.bottomOverlay}
                source={require('../../assets/images/player/Bottom_Overlay.png')}>
                <View
                  style={{alignItems: 'flex-end', right: 12, marginBottom: 20}}>
                  <TouchableOpacity
                    style={styles.KeymomentBtn}
                    onPress={() => setShowKeyMomentPopup(true)}>
                    <Image
                      source={require('../../assets/images/Vector.png')}
                      style={styles.image}
                    />
                    <Text style={{color: '#fff'}}>Keymoments</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.progressContainer}>
                  <View>
                    <TouchableOpacity
                      hasTVPreferredFocus={true}
                      onPress={() => setPaused(!paused)}
                      style={{
                        backgroundColor: 'white',
                        width: Platform.OS === 'android' ? 25 : 50,
                        height: Platform.OS === 'android' ? 25 : 50,
                        marginLeft: Platform.OS === 'android' ? 20 : 20,
                      }}
                      activeOpacity={1}>
                      <Image
                        ref={playImageRef}
                        source={
                          paused
                            ? require('../../assets/images/player/play-bar.png')
                            : require('../../assets/images/player/pause-bar.png')
                        }
                        style={styles.controlIcon}
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.seekBar} />
                  <View
                    style={[
                      styles.liveContainer,
                      {backgroundColor: islive ? 'red' : 'gray'},
                    ]}>
                    <View
                      style={[
                        styles.dot,
                        {backgroundColor: islive ? '#fff' : 'transparent'},
                      ]}
                    />
                    <Text style={styles.liveText}>LIVE</Text>
                  </View>
                </View>
              </ImageBackground>
            </View>
          </View>
        )}
        {showControls && clicked && (
          <View style={styles.topOverlay}>
            <ImageBackground
              style={styles.topOverlay}
              source={require('../../assets/images/player/Top_Overlay.png')}>
              <View>
                <Text style={styles.titleText}>{title}</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  marginRight: 100,
                }}>
                <TouchableOpacity
                  style={styles.LanguageBtn}
                  onPress={() => setShowLanguagePopup(true)}>
                  <Image
                    source={require('../../assets/images/language.png')}
                    style={styles.image}
                  />
                  <Text style={{color: '#fff'}}>Language :{language}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    borderWidth: 1,
                    borderColor: 'gray',
                    padding: 2,
                    paddingHorizontal: 6,
                    borderRadius: 5,
                    flexDirection: 'row',
                  }}
                  onPress={() => setShowQualityPopup(true)}>
                  <Image
                    source={require('../../assets/images/settings.png')}
                    style={styles.image}
                  />
                  <Text style={{color: '#fff'}}>Quality : {quality}</Text>
                </TouchableOpacity>
              </View>
            </ImageBackground>
          </View>
        )}
      </TouchableOpacity>
      <LanguagePopup
        isVisible={showLanguagePopup}
        onLanguageSelect={handleLanguageSelect}
        onClose={handleCloseLanguagePopup}
      />
      <QualityPopUp
        isVisible={showQualityPopup}
        onQualitySelect={handleQualitySelect}
        onClose={handleCloseQualityPopup}
      />
      <KeyMomentPopUp
        isVisible={showKeymomentPopup}
        onQualitySelect={handleKeymomentSelect}
        onClose={handleCloseKeymomentPopup}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  topOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: '100%',
    height: 320,
    justifyContent: 'flex-start',
  },
  titleText: {
    top: 30,
    color: 'white',
    marginLeft: Platform.OS === 'android' ? 10 : 50,
    fontSize: Platform.OS === 'android' ? 20 : 30,
  },
  bottomOverlay: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 320,
    justifyContent: 'flex-end',
    paddingVertical: 20,
    // backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  controlsContainer: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    width: 1720,
  },
  controlIcon: {
    width: Platform.OS === 'android' ? 25 : 50,
    height: Platform.OS === 'android' ? 25 : 50,
    tintColor: 'black',
    //marginHorizontal: 2,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  liveContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 999,
    right: 10,
    width: 60,
  },
  dot: {
    width: Platform.OS === 'android' ? 10 : 15,
    height: Platform.OS === 'android' ? 10 : 15,
    backgroundColor: 'red',
    borderRadius: Platform.OS === 'android' ? 5 : 10,
    marginRight: 5,
    marginLeft: 5,
  },

  seekBar: {
    height: Platform.OS === 'android' ? 5 : 10,
    width: Platform.OS === 'android' ? '85%' : '88%',
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  liveText: {
    color: 'white',
    fontSize: Platform.OS === 'android' ? 15 : 30,
    fontWeight: 'bold',
    left: '5%',
  },
  loaderContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(9,51, 242, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999999,
  },
  LanguageBtn: {
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    padding: 4,
    paddingHorizontal: 8,
    borderRadius: 5,
    flexDirection: 'row',
  },
  image: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  KeymomentBtn: {
    width: 130,
    borderWidth: 1,
    borderColor: 'gray',
    padding: 4,
    paddingHorizontal: 8,
    borderRadius: 5,
    flexDirection: 'row',
  },
});
