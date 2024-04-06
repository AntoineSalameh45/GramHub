import {View, Text, TextInput, TouchableOpacity, Pressable} from 'react-native';
import React, {useState} from 'react';
import LockSvg from '../../assets/svg/LockSvg.svg';
import UserSvg from '../../assets/svg/UserSvg.svg';
import VisibleSvg from '../../assets/svg/VisibleSvg.svg';
import LoginSvg from '../../assets/svg/LoginSvg.svg';
import styles from './styles';

const LoginScreen = () => {
  const [username, onChangeText] = useState('');
  const [pass, onChangePassword] = useState('');
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
            onChangeText={onChangeText}
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
            onChangeText={onChangePassword}
            value={pass}
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
          <Pressable>
            <LoginSvg height={50} width={50} />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;
