import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import SearchScreen from '../screens/SearchScreen';
import PostsScreen from '../screens/PostsScreen';

const Tab = createMaterialTopTabNavigator();

const ProfileNavigation = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Posts" component={PostsScreen} />
      <Tab.Screen name="Favorite" component={SearchScreen} />
    </Tab.Navigator>
  );
};
export default ProfileNavigation;
