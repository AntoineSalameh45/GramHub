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
    borderRadius: 11,
  },
  inputText: {color: '#000', flex: 1},
  loginButton: {alignSelf: 'flex-end'},
  image: {height: 100, width: 100},
  modalContainer: {
    backgroundColor: '#500',
    width: '75%',
    position: 'absolute',
    top: 50,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#f00',
    borderRadius: 11,
  },
  modalContent: {
    alignSelf: 'center',
    padding: 10,
  },
  modalText: {color: '#F3F8FF'},
  modalCloseText: {color: '#F3F8FF', textAlign: 'right', marginTop: 10},
  indicator: {marginTop: 20},
  buttonContainer: {marginTop: 30},
  buttonText: {color: '#FFFFFF', fontSize: 16},
});
export default styles;
