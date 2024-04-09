import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import DirectMessagesList from '../screens/DirectMessagesList';
import Home from '../screens/Home';
import {RootStackParamList} from './RootStackParamList';
import NotifCenter from '../screens/NotificationCenter';

const Tab = createStackNavigator<RootStackParamList>();

const HomeNav = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="HomeScreen"
        component={Home}
        options={{headerShown: false}}
      />
      <Tab.Screen name="Direct Messages" component={DirectMessagesList} />
      <Tab.Screen name="Notification Center" component={NotifCenter} />
    </Tab.Navigator>
  );
};

export default HomeNav;