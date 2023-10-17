import {StyleSheet, Dimensions, Platform} from 'react-native';
const {height} = Dimensions.get('window');
export const styles = StyleSheet.create({
  text: {
    color: '#fff',
  },
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    height: 1080,
    width: '100%',
  },
  liveContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    top: Platform.OS === 'android' ? 10 : 20,
    marginBottom: Platform.OS === 'android' ? 24 : 10,
    zIndex: 999,
  },

  dot: {
    width: Platform.OS === 'android' ? 10 : 15,
    height: Platform.OS === 'android' ? 10 : 15,
    backgroundColor: 'red',
    borderRadius: Platform.OS === 'android' ? 5 : 10,
    marginRight: 5,
    top: Platform.OS === 'android' ? '17%' : '10%',
    marginLeft: Platform.OS === 'android' ? 15 : 40,
  },

  liveText: {
    color: 'white',
    fontSize: Platform.OS === 'android' ? 18 : 30,
    top: Platform.OS === 'android' ? '17%' : '10%',
    fontWeight: 'bold',
    left: '30%',
  },

  flatListContainer: {
    width: '100%',
    padding: 12,
    top: '22%',
    left: '2%',
 
    zIndex: 99,
  },
  catchUpflatListContainer: {
    width: '100%',
    padding: 12,
    top: '22%',
    left: '2%',
    paddingBottom: '16%',
  },
  logo: {
    top: '6%',
    left: '2%',
  },
  catchUp: {
    top: '22%',
    marginLeft: Platform.OS === 'android' ? 20 : 40,
  },
  catchupText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: Platform.OS === 'android' ? 8 : 20,
    fontSize: Platform.OS === 'android' ? 16 : 30,
  },
  descption: {
    flexDirection: 'coloumn',
    alignItems: 'left',
    marginTop: Platform.OS === 'android' ? 10 : 40,
    width: '50%',
    height: Platform.OS === 'android' ? 40 : 50,
  },
  thumbTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: Platform.OS === 'android' ? 18 : 30,
    top: Platform.OS === 'android' ? '150%' : '150%',
    left: '6%',
  },
  title: {
    top: Platform.OS === 'android' ? '150%' : '154%',
    left: '6%',
    fontSize: Platform.OS === 'android' ? 14 : 24,
    color:
      Platform.OS === 'android'
        ? 'rgba(240,241,238,0.5)'
        : 'rgba(245 ,245, 245, 0.7)',
  },
  overlayImage: {
    width: '100%',
    height: 1080,
    position: 'absolute',
  },
  scrollView: {
    height: 1080,
  },
  modalStyle: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
  },
});
