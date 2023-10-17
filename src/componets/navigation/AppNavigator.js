import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import HomePage from '../../pages/homePage/HomePage';
import LivePlayer from '../player/LivePlayer';
import Player from '../player/Player';
import SplashScreen from '../../pages/splashscreen/SplashScreen';
import KeyMomentPlayer from '../player/KeyMomentPlayer';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="HomeScreen"
          component={HomePage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="VideoPlayer"
          component={LivePlayer}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Player"
          component={Player}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="KeyMomentPlayer"
          component={KeyMomentPlayer}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
