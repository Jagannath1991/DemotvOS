import React, {useRef, useState} from 'react';
import {TouchableOpacity, Text, findNodeHandle, View} from 'react-native';
import {styles} from './ExitPageStyle';
const ExitPage = ({handleOkClick, handleCancelClick}) => {
  const cancelRef = useRef(null);
  const exitRef = useRef(null);
  const [isFocusedOk, setFocusOk] = useState(true);

  const switchFocus = () => {
    if (isFocusedOk) {
      cancelRef.current.blur(); // Remove focus from Cancel
      exitRef.current.focus(); // Set focus on Ok
    } else {
      exitRef.current.blur(); // Remove focus from Ok
      cancelRef.current.focus(); // Set focus on Cancel
    }
    setFocusOk(!isFocusedOk);
  };

  return (
    <>
      <View style={styles.container}>
        <View>
          <Text style={styles.titleText}>Exit the application</Text>
        </View>
        <View>
          <View>
            <Text style={styles.message}>Do you want to exit the app ?</Text>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            ref={exitRef}
            hasTVPreferredFocus={true}
            activeOpacity={1}
            style={{
              width: 150,
              backgroundColor: isFocusedOk ? 'white' : '#142947',
              borderRadius: 4,
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: isFocusedOk ? 2 : 2,
              borderColor: isFocusedOk ? 'black' : 'white',
            }}
            // style={styles.buttonContainer}
            // onPress={props.onPressTryAgain}
            onPress={handleOkClick}
            onFocus={switchFocus}>
            <Text
              style={{
                color: isFocusedOk ? 'black' : 'white',
                paddingHorizontal: 20,
                paddingVertical: 8,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              Ok
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            ref={cancelRef}
            activeOpacity={1}
            style={{
              width: 150,
              marginTop: 10,
              zIndex: 2,
              backgroundColor: isFocusedOk ? '#142947' : 'white',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 4,
              borderWidth: isFocusedOk ? 2 : 2,
              borderColor: isFocusedOk ? 'white' : 'black',
            }}
            // onPress={props.onPressExit}
            onPress={handleCancelClick}
            onFocus={switchFocus}>
            <Text
              style={{
                color: isFocusedOk ? 'white' : 'black',
                paddingHorizontal: 20,
                paddingVertical: 8,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default ExitPage;

// import React, {useState, useEffect, useRef} from 'react';
// import {View, StyleSheet, Platform, UIManager, Text} from 'react-native';
// import Button from '../../componets/buttons/Button';
// import {styles} from './ExitPageStyle';
// export default function ExitPage() {
//   const [focused, setFocused] = useState(true);

//   const handleTryAgainPress = () => {
//     setFocused(true);
//   };

//   const handleExitPress = () => {
//     setFocused(false);
//   };
//   return (
//     <View style={styles.container}>
//       <View>
//         <Text style={styles.titleText}>Exit the application</Text>
//       </View>
//       <View>
//         <Text style={styles.message}>Do you want to exit the app ?</Text>
//       </View>
//       <View style={styles.buttonContainer}>
//         <Button title="Ok" onPress={handleTryAgainPress} focused={focused} />
//         <View style={{marginVertical: 8}} />
//         <Button title="Cancel" onPress={handleExitPress} focused={!focused} />
//       </View>
//     </View>
//   );
// }
