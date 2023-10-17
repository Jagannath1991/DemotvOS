import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  TVEventHandler,
  ImageBackground,
  ActivityIndicator,
  Platform,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Video from 'react-native-video';
import {useRoute} from '@react-navigation/native';

const {height, width} = Dimensions.get('window');

export default function Player() {
  const [clicked, setClicked] = useState(false);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(null);
  const [showControls, setShowControls] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isSeeking, setIsSeeking] = useState(false);

  const [isBuffering, setIsBuffering] = useState(false);
  const [tvEventHandler, setTvEventHandler] = useState(null);
  const route = useRoute();
  const {videoUrl, title, index, videoUrls} = route.params;

  const navigation = useNavigation();
  const ref = useRef();

  useEffect(() => {
    const handler = new TVEventHandler();
    handler.enable(null, (cmp, evt) => {
      if (evt && evt.eventType === 'right') {
        // Right arrow key pressed
        if (ref.current && progress) {
          const newTime = progress.currentTime + 10;
          if (newTime <= progress.seekableDuration) {
            ref.current.seek(newTime);
            setProgress({...progress, currentTime: newTime});
          }
        }
      } else if (evt && evt.eventType === 'left') {
        // Left arrow key pressed
        if (ref.current && progress) {
          const newTime = progress.currentTime - 10;
          if (newTime >= 0) {
            ref.current.seek(newTime);
            setProgress({...progress, currentTime: newTime});
          }
        }
      } else if (evt && (evt.eventType === 'up' || evt.eventType === 'down')) {
        // Up or down arrow key pressed
        setShowControls(true);
      }
    });

    setTvEventHandler(handler);

    return () => {
      if (tvEventHandler) {
        tvEventHandler.disable();
      }
    };
  }, [progress]);

  const handleVideoEnd = () => {
    // Logic to play the next video based on the index
    const nextVideoIndex = index + 1;

    if (nextVideoIndex < videoUrls.length) {
      const nextVideoUrl = videoUrls[nextVideoIndex];
      // Pass the next video's URL and index as props to the Player component
      navigation.replace('Player', {
        videoUrl: nextVideoUrl,
        title: title,
        index: nextVideoIndex,
        videoUrls: videoUrls,
      });
    } else {
      const firstVideoUrl = videoUrls[0];
      navigation.replace('Player', {
        videoUrl: firstVideoUrl,
        title: title,
        index: 0, // Reset to the first index
        videoUrls: videoUrls,
      });
      // No more videos to play, handle this case as needed
    }
  };

  const handleUserInteraction = () => {
    setShowControls(true);
  };

  const format = seconds => {
    let mins = parseInt(seconds / 60)
      .toString()
      .padStart(2, '0');
    let secs = (Math.trunc(seconds) % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  useEffect(() => {
    const timerId = setTimeout(() => {
      setShowControls(false);
    }, 10000);

    return () => {
      clearTimeout(timerId);
    };
  }, [showControls]);

  const handleLoadStart = () => {
    setIsLoading(true);
    setIsSeeking(false);
    console.log('OnHanle Load Start', isLoading);
  };

  const handleLoad = data => {
    setProgress({
      currentTime: 0,
      seekableDuration: data.duration,
    });
    setIsLoading(false);
    setIsSeeking(false);
  };
  // const handleLoad = () => {
  //   console.log('On Loaded', isLoading);
  //   setIsLoading(false);
  //   setIsSeeking(false);
  // };

  return (
    <>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          setClicked(true);
          setPaused(!paused);
          handleUserInteraction();
        }}>
        <Video
          paused={paused}
          source={{
            uri: videoUrl,
          }}
          ref={ref}
          onProgress={x => {
            setProgress(x);
          }}
          style={{width: width, height: height}}
          onLoadStart={handleLoadStart}
          onLoad={handleLoad}
          onBuffer={({isBuffering}) => {
            setIsBuffering(isBuffering);
            if (isBuffering) {
              setIsSeeking(true);
            } else {
              setIsSeeking(false);
            }
          }}
          onEnd={handleVideoEnd}
          resizeMode="contain"
        />
        {isLoading && (
          <ImageBackground
            source={require('../../assets/images/bkg-image.png')}
            style={styles.loaderContainer}>
            <ActivityIndicator size={60} color="white" />
          </ImageBackground>
        )}
        <View style={styles.bufferloaderContainer}>
          {isSeeking && <ActivityIndicator size={60} color="white" />}
        </View>
        {showControls && clicked && (
          <ImageBackground
            source={require('../../assets/images/player/Bottom_Overlay.png')}
            style={styles.controlsContainer}
            activeOpacity={1}>
            <TouchableOpacity
              onPress={() => setPaused(!paused)}
              hasTVPreferredFocus={true}
              style={styles.controlButton}
              activeOpacity={1}>
              <Image
                source={
                  paused
                    ? require('../../assets/images/player/play-bar.png')
                    : require('../../assets/images/player/pause-bar.png')
                }
                style={styles.controlIcon}
              />
            </TouchableOpacity>
            <Text
              style={{
                color: 'white',
                fontSize: Platform.OS === 'android' ? 14 : 24,
              }}>
              {format(progress?.currentTime)}
            </Text>
            <View style={styles.seekBarContainer}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    height: 5,
                    marginTop: -1,
                    width: `${
                      (progress?.currentTime / progress?.seekableDuration) * 100
                    }%`,
                    backgroundColor: 'white',
                  }}
                />
                <View
                  style={{
                    width: Platform.OS === 'android' ? 20 : 35,
                    height: Platform.OS === 'android' ? 20 : 35,
                    borderRadius: Platform.OS === 'android' ? 13 : 20,
                    backgroundColor: 'rgba(128, 128, 128, 0.5)',
                    position: 'absolute',
                    top: Platform.OS === 'android' ? -7 : -17,
                    marginLeft: Platform.OS === 'android' ? -14 : -17,
                    left: `${
                      (progress?.currentTime / progress?.seekableDuration) * 100
                    }%`,
                  }}></View>
                <View
                  style={{
                    position: 'absolute',
                    width: Platform.OS === 'android' ? 12 : 20,
                    height: Platform.OS === 'android' ? 12 : 20,
                    backgroundColor: 'transparent',
                    borderColor: '#fff',
                    elevation: 5,
                    borderWidth: Platform.OS === 'android' ? 6 : 10,
                    borderRadius: Platform.OS === 'android' ? 10 : 20,
                    top: Platform.OS === 'android' ? -3 : -10,
                    shadowColor: 'black',
                    shadowOffset: {width: 100, height: 100},
                    shadowOpacity: 0.8,
                    shadowRadius: 4,
                    transform: [{translateX: -10}],
                    left: `${
                      (progress?.currentTime / progress?.seekableDuration) * 100
                    }%`,
                  }}
                />
              </View>
            </View>

            <Text
              style={{
                color: 'white',
                fontSize: Platform.OS === 'android' ? 14 : 24,
              }}>
              {format(progress?.seekableDuration)}
            </Text>
          </ImageBackground>
        )}
        {showControls && clicked && (
          <View style={styles.topOverlay}>
            <ImageBackground
              style={styles.topOverlay}
              source={require('../../assets/images/player/Top_Overlay.png')}>
              <Text style={styles.titleText}>{title}</Text>
            </ImageBackground>
          </View>
        )}
      </TouchableOpacity>
    </>
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
    marginLeft: Platform.OS === 'android' ? 30 : 50,
    fontSize: Platform.OS === 'android' ? 20 : 30,
  },
  controlsContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    //justifyContent: 'space-between',
    //backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingTop: 200,
    // paddingHorizontal: 20,
    height: 320,
  },
  controlButton: {
    backgroundColor: 'white',
    width: Platform.OS === 'android' ? 30 : 50,
    height: Platform.OS === 'android' ? 30 : 50,
    marginLeft: Platform.OS === 'android' ? 10 : 20,
    marginRight: Platform.OS === 'android' ? 10 : 20,
    zIndex: 9999999,
  },
  controlIcon: {
    width: Platform.OS === 'android' ? 30 : 50,
    height: Platform.OS === 'android' ? 30 : 50,
    tintColor: 'black',
  },
  seekBarContainer: {
    flex: 1,
    height: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginLeft: Platform.OS === 'android' ? 10 : 20,
    marginRight: Platform.OS === 'android' ? 10 : 20,
  },
  loaderContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(9,51, 242, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999999,
  },
  bufferloaderContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999999,
  },
});
