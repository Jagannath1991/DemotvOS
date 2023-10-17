import React from 'react';
import {View, Modal, TouchableOpacity, Text, StyleSheet} from 'react-native';

const LanguagePopup = ({isVisible, onQualitySelect, onClose}) => {
  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={isVisible}
      onRequestClose={onClose}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'flex-end',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}>
        <View
          style={{
            width: 250,
            alignItems: 'center',
            paddingTop: 40,
            height: '100%',
            backgroundColor: 'rgba(15, 7, 40, .48)',
          }}>
          <Text
            style={{
              marginRight: 85,
              fontSize: 20,
              fontWeight: 'bold',
              color: '#fff',
            }}>
            Quality
          </Text>
          <TouchableOpacity
            onPress={() => onQualitySelect('Auto')}
            style={styles.button}>
            <Text style={styles.text}>Auto</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onQualitySelect('4K')}
            style={styles.button}>
            <Text style={styles.text}>4K</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onQualitySelect('High')}
            style={styles.button}>
            <Text style={styles.text}>High</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onQualitySelect('Medium')}
            style={styles.button}>
            <Text style={styles.text}>Medium</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onQualitySelect('Low')}
            style={styles.button}>
            <Text style={styles.text}>Low</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default LanguagePopup;

const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    borderColor: 'gray',
    paddingVertical: 5,
    paddingHorizontal: 30,
    width: 150,
    margin: 10,
    borderRadius: 5,
  },
  text: {
    color: '#fff',
    textAlign: 'center',
  },
});
