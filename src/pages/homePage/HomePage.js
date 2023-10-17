import React, {useEffect, useState, useRef} from 'react';
import {
  Text,
  View,
  ImageBackground,
  FlatList,
  ScrollView,
  Image,
  BackHandler,
  Platform,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {styles} from './HomeStyle';
import LiveCard from '../../componets/cards/LiveCard';
import CatchUpCard from '../../componets/cards/CatchUpCard';
import {useMessage} from '../../context/MessageProvider';
import APIError from '../apiErrorPage/APIError';
import ExitPages from '../exitPage/ExitPage';
import {useNetwork} from '../../context/NetworkContext';
import NoInternetError from '../noInternetError/NoInternetError';

export default function HomePage() {
  const [data, setData] = useState([]);
  const [catchUp, setCatchUp] = useState([]);
  const [apiError, setApiError] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [focusedLiveCardIndex, setFocusedLiveCardIndex] = useState(0);
  const [focusedCatchUpCardIndex, setFocusedCatchUpCardIndex] = useState(-1);
  const {focusedTitle, focusedDescription, focusedBackground} = useMessage();
  const LiveflatListRef = useRef(null);
  const CatchUpListRef = useRef(null);
  const {isConnected, checkConnectivity} = useNetwork();
  useEffect(() => {
    fetchCatchUpData();
    fetchData();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      const backPressHandler = () => {
        setIsModalVisible(true);
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', backPressHandler);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', backPressHandler);
      };
    }, []),
  );

  const fetchCatchUpData = async () => {
    try {
      const response = await fetch(
        `https://zznylmsrqi.execute-api.us-east-2.amazonaws.com/vprism/cms/videolistv2?account_id=61a0c96ed4f9d00009d0f691&portal_id=64f1e7ba1496c9000811f517&master_profile_id=64f17c33234f220008803d38&pgindex=0&pgitems=30`,
        {
          method: 'GET',
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();

      setCatchUp(result);
    } catch (error) {
      setApiError(true);
      console.error('Error message', error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://tickernews.co/wp-content/uploads/2023/08/TickerAppFASTchannels.json`,
        {
          method: 'GET',
        },
      );

      if (!response.ok) {
        throw Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();

      setData(result);
    } catch (error) {
      console.error('Error message', error);
    }
  };

  const handleOkClick = () => {
    BackHandler.exitApp();
  };

  const handleCancelClick = () => {
    setIsModalVisible(false);
  };

  return (
    <View style={styles.container}>
      {isConnected ? (
        apiError ? (
          <APIError
            onRetry={checkConnectivity}
            onExit={() => BackHandler.exitApp()}
          />
        ) : (
          <ImageBackground
            source={
              focusedBackground
                ? {uri: focusedBackground}
                : require('../../assets/images/bkg-image.png')
            }
            style={styles.background}>
            <View style={styles.overlay}>
              <Image
                source={require('../../assets/images/overlayUpdate.png')}
                style={styles.overlayImage}
              />
            </View>
            <View style={styles.logo}>
              <Image
                style={{
                  width: Platform.OS === 'android' ? 170 : 280,
                  height: Platform.OS === 'android' ? 50 : 100,
                }}
                source={require('../../assets/images/ticker_news_app.png')}
              />
            </View>
            <ScrollView style={styles.scrollView}>
              <View style={styles.descption}>
                <Text style={styles.thumbTitle} numberOfLines={1}>
                  {focusedTitle}
                </Text>
                <Text style={styles.title} numberOfLines={2}>
                  {focusedDescription}
                </Text>
              </View>
              <View style={styles.liveContainer}>
                <View style={styles.dot} />
                <Text style={styles.liveText}>LIVE</Text>
              </View>
              <View style={styles.flatListContainer}>
                <FlatList
                  ref={LiveflatListRef}
                  horizontal
                  hasTVPreferredFocus={true}
                  data={data}
                  renderItem={({item, index}) => (
                    <LiveCard
                      item={item}
                      index={index}
                      flatListRef={LiveflatListRef}
                      length={data.length}
                      onPress={() => setFocusedLiveCardIndex(index)}
                      isFocused={focusedLiveCardIndex === index}
                    />
                  )}
                  keyExtractor={(item, index) => index.toString()}
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{flexDirection: 'row'}}
                />
              </View>
              <View style={styles.catchUp}>
                <Text style={styles.catchupText}>Catch Up</Text>
              </View>
              <View style={styles.catchUpflatListContainer}>
                <FlatList
                  ref={CatchUpListRef}
                  horizontal
                  hasTVPreferredFocus={true}
                  data={catchUp}
                  renderItem={({item, index}) => (
                    <CatchUpCard
                      item={item}
                      index={index}
                      videoUrls={catchUp.map(item => item.video_url)}
                      CatchUpListRef={CatchUpListRef}
                      onPress={() => setFocusedCatchUpCardIndex(index)}
                      isFocused={focusedCatchUpCardIndex === index}
                    />
                  )}
                  keyExtractor={(item, index) => index.toString()}
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{flexDirection: 'row'}}
                />
              </View>
            </ScrollView>
          </ImageBackground>
        )
      ) : (
        <NoInternetError
          onRetry={checkConnectivity}
          onExit={() => BackHandler.exitApp()}
        />
      )}
      {isModalVisible && (
        <View style={styles.modalStyle}>
          <ExitPages
            handleOkClick={handleOkClick}
            handleCancelClick={handleCancelClick}
          />
        </View>
      )}
    </View>
  );
}
