import React, {useRef, useState} from 'react';
import {TouchableOpacity, Text, findNodeHandle, View} from 'react-native';
import {styles} from './ApiErrorStyle';
const APIError = ({onRetry, onExit}) => {
  const tryAgainRef = useRef(null);
  const exitRef = useRef(null);
  const [isFocusedTryAgain, setFocusTryAgain] = useState(true);

  const switchFocus = () => {
    if (isFocusedTryAgain) {
      tryAgainRef.current.blur();
      exitRef.current.focus();
    } else {
      exitRef.current.blur();
      tryAgainRef.current.focus();
    }
    setFocusTryAgain(!isFocusedTryAgain);
  };

  return (
    <>
      <View style={styles.container}>
        <View>
          <Text style={styles.titleText}>Something went wrong</Text>
        </View>
        <View>
          <Text style={styles.message}>
            We were unable to process your request. Please try again.
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            ref={tryAgainRef}
            activeOpacity={1}
            style={{
              width: 150,
              backgroundColor: isFocusedTryAgain ? 'white' : '#142947',
              borderRadius: 4,
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: isFocusedTryAgain ? 2 : 2,
              borderColor: isFocusedTryAgain ? 'black' : 'white',
            }}
            // style={styles.buttonContainer}
            onPress={onRetry}
            onFocus={switchFocus}>
            <Text
              style={{
                color: isFocusedTryAgain ? 'black' : 'white',
                paddingHorizontal: 20,
                paddingVertical: 8,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              Try Again
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            ref={exitRef}
            activeOpacity={1}
            style={{
              width: 150,
              marginTop: 10,
              zIndex: 2,
              backgroundColor: isFocusedTryAgain ? '#142947' : 'white',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 4,
              borderWidth: isFocusedTryAgain ? 2 : 2,
              borderColor: isFocusedTryAgain ? 'white' : 'black',
            }}
            onPress={onExit}
            onFocus={switchFocus}>
            <Text
              style={{
                color: isFocusedTryAgain ? 'white' : 'black',
                paddingHorizontal: 20,
                paddingVertical: 8,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              Exit
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default APIError;
