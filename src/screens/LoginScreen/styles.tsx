import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  viewContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#222',
  },
  title: {color: '#F3F8FF'},
  formContainer: {
    width: '65%',
    padding: 5,
    margin: 10,
  },
  formLabel: {
    color: '#F3F8FF',
    marginTop: 10,
    marginBottom: 3,
  },
  inputField: {
    backgroundColor: '#F3F8FF',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  inputText: {color: '#000', flex: 1},
  loginButton: {alignSelf: 'flex-end'},
});
export default styles;
