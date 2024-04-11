import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import DirectMessagesList from '../screens/DirectMessagesList';
import Home from '../screens/Home';
import {RootStackParamList} from './RootStackParamList';
import NotifCenter from '../screens/NotificationCenter';
import CommentScreen from '../screens/CommentsScreen';

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
      <Tab.Screen name="Comments" component={CommentScreen} />
    </Tab.Navigator>
  );
};

export default HomeNav;
