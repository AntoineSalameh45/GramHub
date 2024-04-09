import {View, Text, Pressable} from 'react-native';
import React from 'react';
import styles from './styles';

const LogOut = ({navigation}: any) => {
  const stayLogged = () => {
    navigation.navigate('Profile');
  };
  return (
    <View style={styles.viewContainer}>
      <View style={styles.propContainer}>
        <Text style={styles.text}>Are you sure you want to log out?</Text>
        <View style={styles.choices}>
          <Pressable style={styles.yesButton}>
            <Text style={styles.text}>Yes</Text>
          </Pressable>
          <Text style={styles.noButton} onPress={stayLogged}>
            No, stay logged in
          </Text>
        </View>
      </View>
    </View>
  );
};

export default LogOut;
