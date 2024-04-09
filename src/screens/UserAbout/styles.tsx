import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    backgroundColor: '#222',
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  inputStyle: {
    backgroundColor: '#444',
    borderRadius: 7,
    flex: 0.7,
    paddingHorizontal: 20,
    color: '#F3F8FF',
  },
  text: {color: '#F3F8FF'},
  changeableInfo: {
    borderTopWidth: 2,
    marginTop: 30,
    borderTopColor: '#444',
  },
  saveButtonText: {
    color: '#F3F8FF',
  },
});
export default styles;
