import React, {Component, useEffect} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import reactNativeTvosController from 'react-native-tvos-controller';

reactNativeTvosController.connect();
reactNativeTvosController.enablePanGesture();
reactNativeTvosController.enableRecognizeSimultaneously();
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});
const TestRemote = props => {
  useEffect(() => {
    var tapSubscription = reactNativeTvosController.subscribe('TAP', e => {
      console.log('tapped');
      console.log(JSON.stringify(e));
    });
    var swipeSubscription = reactNativeTvosController.subscribe('SWIPE', e => {
      console.log('swiped');
      console.log(JSON.stringify(e));
    });
    var longPressSubscription = reactNativeTvosController.subscribe(
      'LONGPRESS',
      e => {
        console.log('longPressed');
        console.log(JSON.stringify(e));
      },
    );
    var panSubscription = reactNativeTvosController.subscribe('PAN', e => {
      console.log('panned');
      console.log(JSON.stringify(e));

      const {x, y} = e;

      if (x > 0) {
        // Positive x value indicates seek forward
        console.log('Seek Forward');
        // Implement your seek forward logic here
      } else if (x < 0) {
        // Negative x value indicates seek backward
        console.log('Seek Backward');
        // Implement your seek backward logic here
      }

      if (y > 0) {
        // Positive y value indicates up press
        console.log('Up Press');
        // Implement your up press logic here
      } else if (y < 0) {
        // Negative y value indicates down press
        console.log('Down Press');
        // Implement your down press logic here
      }
    });

    return () => {
      tapSubscription.unsubscribe();
      swipeSubscription.unsubscribe();
      longPressSubscription.unsubscribe();
      panSubscription.unsubscribe();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome to React Native!</Text>
      <Text style={styles.instructions}>To get started, edit App.js</Text>
      <Text style={styles.instructions}>{instructions}</Text>
    </View>
  );
};
export default TestRemote;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
