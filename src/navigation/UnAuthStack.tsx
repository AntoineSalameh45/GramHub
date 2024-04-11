import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';

const UnAuthStackNavigator = createNativeStackNavigator();

const UnAuthStack = () => {
  return (
    <UnAuthStackNavigator.Navigator>
      <UnAuthStackNavigator.Screen
        name="Login"
        component={LoginScreen}
        options={{headerShown: false}}
      />
    </UnAuthStackNavigator.Navigator>
  );
};

export default UnAuthStack;
