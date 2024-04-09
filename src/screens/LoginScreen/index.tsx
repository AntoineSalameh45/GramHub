import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Modal,
  Pressable,
} from 'react-native';
import LockSvg from '../../assets/svg/LockSvg.svg';
import UserSvg from '../../assets/svg/UserSvg.svg';
import VisibleSvg from '../../assets/svg/VisibleSvg.svg';
import styles from './styles';
import axios from 'axios';
import useAuthStore from '../../store/authStore';

const LoginScreen = () => {
  const [username, setUsername] = useState('kminchelle');
  const [password, setPassword] = useState('0lelplR');
  const [loading, setLoading] = useState(false);
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const {setAuthToken} = useAuthStore();
  const [passHidden, setPassHidden] = useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const result = await axios.post('https://dummyjson.com/auth/login', {
        username,
        password,
      });
      setAuthToken(result.data.token);
    } catch (err) {
      console.log(err);
      setErrorModalVisible(true);
    } finally {
      setLoading(false);
    }
  };

  const toggleVisibility = () => {
    setPassHidden(prev => !prev);
  };

  const isButtonDisabled = !username || !password || loading;

  return (
    <View style={styles.viewContainer}>
      <Image source={require('../../assets/splash.png')} style={styles.image} />
      <View style={styles.formContainer}>
        <Text style={styles.formLabel}>Username:</Text>
        <View style={styles.inputField}>
          <UserSvg width={20} height={20} />
          <TextInput
            onChangeText={setUsername}
            value={username}
            style={styles.inputText}
            placeholder="Enter username here"
            placeholderTextColor={'#cdcdcd'}
          />
        </View>
        <Text style={styles.formLabel}>Password:</Text>
        <View style={styles.inputField}>
          <LockSvg width={20} height={20} />
          <TextInput
            onChangeText={setPassword}
            value={password}
            secureTextEntry={!passHidden}
            style={styles.inputText}
            placeholder="Enter password here"
            placeholderTextColor={'#cdcdcd'}
          />
          <TouchableOpacity onPress={toggleVisibility}>
            <VisibleSvg width={20} height={20} />
          </TouchableOpacity>
        </View>
        <View style={styles.loginButton}>
          {loading ? (
            <ActivityIndicator
              size="large"
              color="#7E30E1"
              animating={true}
              hidesWhenStopped={true}
              style={styles.indicator}
            />
          ) : (
            <View style={styles.buttonContainer}>
              <Pressable
                onPress={onLogin}
                disabled={isButtonDisabled}
                style={({pressed}) => [
                  {
                    backgroundColor: pressed ? '#6C2492' : '#7E30E1',
                    borderRadius: 10,
                    paddingVertical: 10,
                    paddingHorizontal: 20,
                  },
                  isButtonDisabled && {backgroundColor: '#CCCCCC'},
                ]}>
                <Text style={styles.buttonText}>Login</Text>
              </Pressable>
            </View>
          )}
        </View>
      </View>
      <Modal visible={errorModalVisible} animationType="fade" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              Invalid username or password. Close this alert and try again.
            </Text>
            <TouchableOpacity onPress={() => setErrorModalVisible(false)}>
              <Text style={styles.modalCloseText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default LoginScreen;
