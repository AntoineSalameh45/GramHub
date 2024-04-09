import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import LockSvg from '../../assets/svg/LockSvg.svg';
import UserSvg from '../../assets/svg/UserSvg.svg';
import VisibleSvg from '../../assets/svg/VisibleSvg.svg';
import LoginSvg from '../../assets/svg/LoginSvg.svg';
import styles from './styles';
import axios from 'axios';
import useAuthStore from '../../store/authStore';

const LoginScreen = () => {
  const [username, setUsername] = useState('kminchelle');
  const [password, setPassword] = useState('0lelplR');
  const [loading, setLoading] = useState(false);

  const {setAuthToken} = useAuthStore();
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
    } finally {
      setLoading(false);
    }
  };

  const [passHidden, setPassHidden] = useState<false | true>(true);

  const toggleVisibility = () => {
    const showingPass = passHidden === false ? true : false;
    setPassHidden(showingPass);
  };
  return (
    <View style={styles.viewContainer}>
      <Text style={styles.title}>Login:</Text>
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
            secureTextEntry={passHidden}
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
            <ActivityIndicator />
          ) : (
            <Pressable onPress={onLogin}>
              <LoginSvg height={50} width={50} />
            </Pressable>
          )}
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;
