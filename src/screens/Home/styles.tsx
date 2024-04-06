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
  postBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
    marginHorizontal: 5,
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 100 / 2,
  },
  postIcons: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    flex: 0.35,
  },
  postCaption: {
    marginBottom: 40,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  userName: {color: '#F3F8FF'},
  caption: {color: '#d3d8df', fontSize: 12},
});
export default styles;
