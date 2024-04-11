import {Dimensions, StyleSheet} from 'react-native';

const {width} = Dimensions.get('window');
const imageWidth = width;
const imageHeight = 200;
const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    backgroundColor: '#222',
  },
  imageContainer: {
    margin: 5,
  },
  image: {
    width: imageWidth,
    height: imageHeight,
    resizeMode: 'contain',
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 100 / 2,
  },
  userName: {color: '#F3F8FF'},
  caption: {color: '#d3d8df', fontSize: 12},
  inputContainer: {flexDirection: 'row', alignItems: 'center'},
  input: {flex: 0.95},
  button: {backgroundColor: '#7E30E1', padding: 10, borderRadius: 5},
  disabled: {backgroundColor: '#ddd'},
  buttonText: {color: '#F3F8FF'},
});
export default styles;
