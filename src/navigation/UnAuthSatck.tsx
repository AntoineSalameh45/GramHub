import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';

const UnAuthStackNavigator = createNativeStackNavigator();

const UnAuthSatck = () => {
  return (
    <UnAuthStackNavigator.Navigator>
      <UnAuthStackNavigator.Screen name="Login" component={LoginScreen} />
    </UnAuthStackNavigator.Navigator>
  );
};

export default UnAuthSatck;
