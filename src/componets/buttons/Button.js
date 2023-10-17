import React from 'react';
import {Text, TouchableOpacity, TouchableHighlight} from 'react-native';
import {styles} from './ButtonStyle';

export default function Button({title, focused, onPress}) {
  console.log('Focused', focused);
  const buttonStyle = {
    backgroundColor: focused ? '#fff' : '#142947',
  };

  const titleStyle = {
    color: focused ? 'black' : '#fff',
  };

  return (
    <TouchableOpacity style={[styles.container, buttonStyle]} onPress={onPress}>
      <Text style={[styles.titleText, titleStyle]}>{title}</Text>
    </TouchableOpacity>
  );
}
