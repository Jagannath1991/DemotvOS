import React, {useState} from 'react';
import {
  View,
  Modal,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
} from 'react-native';

const LanguagePopUp = ({isVisible, onLanguageSelect, onClose}) => {
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  const handleLanguageChange = language => {
    setSelectedLanguage(language);
    onLanguageSelect(language);
  };

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
            Language
          </Text>
          <TouchableOpacity
            // activeOpacity={1}
            onPress={() => handleLanguageChange('English')}
            style={[
              styles.button,
              selectedLanguage === 'English' && styles.activeButton,
            ]}
            hasTVPreferredFocus={selectedLanguage === 'English'}>
            {selectedLanguage === 'English' && (
              <Image
                style={styles.tick}
                source={require('../../assets/images/check.png')}
              />
            )}
            <Text
              style={[
                styles.text,
                selectedLanguage === 'English' && styles.activeText,
              ]}>
              English
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleLanguageChange('Hindi')}
            style={[
              styles.button,
              selectedLanguage === 'Hindi' && styles.activeButton,
            ]}>
            {selectedLanguage === 'Hindi' && (
              <Image
                style={styles.tick}
                source={require('../../assets/images/check.png')}
              />
            )}
            <Text
              style={[
                styles.text,
                selectedLanguage === 'Hindi' && styles.activeText,
              ]}>
              Hindi
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleLanguageChange('Tamil')}
            style={[
              styles.button,
              selectedLanguage === 'Tamil' && styles.activeButton,
            ]}>
            {selectedLanguage === 'Tamil' && (
              <Image
                style={styles.tick}
                source={require('../../assets/images/check.png')}
              />
            )}
            <Text
              style={[
                styles.text,
                selectedLanguage === 'Tamil' && styles.activeText,
              ]}>
              Tamil
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleLanguageChange('Telugu')}
            style={[
              styles.button,
              selectedLanguage === 'Telugu' && styles.activeButton,
            ]}>
            {selectedLanguage === 'Telugu' && (
              <Image
                style={styles.tick}
                source={require('../../assets/images/check.png')}
              />
            )}
            <Text
              style={[
                styles.text,
                selectedLanguage === 'Telugu' && styles.activeText,
              ]}>
              Telugu
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleLanguageChange('Odia')}
            style={[
              styles.button,
              selectedLanguage === 'Odia' && styles.activeButton,
            ]}>
            {selectedLanguage === 'Odia' && (
              <Image
                style={styles.tick}
                source={require('../../assets/images/check.png')}
              />
            )}
            <Text
              style={[
                styles.text,
                selectedLanguage === 'Odia' && styles.activeText,
              ]}>
              Odia
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    borderColor: 'gray',
    paddingVertical: 5,
    paddingHorizontal: 10,
    width: 150,
    margin: 10,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    //justifyContent: 'space-between',
  },
  text: {
    color: 'white',
  },
  activeButton: {
    backgroundColor: 'white',
  },
  tick: {
    marginRight: 5,
    height: 20,
    width: 20,
  },
  activeText: {
    color: 'black',
  },
});

export default LanguagePopUp;
