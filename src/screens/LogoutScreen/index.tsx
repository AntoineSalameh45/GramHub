import {View, Text, Pressable} from 'react-native';
import React from 'react';
import styles from './styles';

const LogOut = () => {
  return (
    <View style={styles.viewContainer}>
      <View style={styles.propContainer}>
        <Text>Are you sure you want to log out?</Text>
        <View style={styles.choices}>
          <Pressable style={styles.yesButton}>
            <Text>Yes</Text>
          </Pressable>
          <Text style={styles.noButton}>No, stay logged in</Text>
        </View>
      </View>
    </View>
  );
};

export default LogOut;
