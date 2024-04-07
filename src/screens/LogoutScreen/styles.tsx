import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    backgroundColor: '#222',
    justifyContent: 'center',
    alignItems: 'center',
  },
  propContainer: {
    width: '70%',
  },
  choices: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  yesButton: {
    backgroundColor: '#7E30E1',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  noButton: {
    backgroundColor: '#222',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});
export default styles;
