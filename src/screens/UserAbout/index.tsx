import {View, Text} from 'react-native';
import React from 'react';
import styles from './styles';
import {TextInput} from 'react-native-gesture-handler';

const AboutAccount = () => {
  return (
    <View style={styles.viewContainer}>
      <View style={styles.infoContainer}>
        <Text>E-mail:</Text>
        <TextInput
          placeholder="use******@gmail.com"
          placeholderTextColor={'#999'}
          readOnly={true}
          style={styles.inputStyle}
        />
      </View>
      <View style={styles.infoContainer}>
        <Text>Password:</Text>
        <TextInput
          placeholder="********"
          placeholderTextColor={'#999'}
          readOnly={true}
          style={styles.inputStyle}
        />
      </View>
    </View>
  );
};

export default AboutAccount;
