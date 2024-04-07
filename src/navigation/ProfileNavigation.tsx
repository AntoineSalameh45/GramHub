import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import PostsScreen from '../screens/PostsScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import {FavoriteIcon, GalleryIcon} from '../components/atoms/ProfileNavIcons';

const Tab = createMaterialTopTabNavigator();

const ProfileNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: () => {
          if (route.name === 'Posts') {
            return <GalleryIcon />;
          } else if (route.name === 'Favorite') {
            return <FavoriteIcon />;
          }
        },
        tabBarActiveTintColor: '#7E30E1',
        tabBarInactiveTintColor: '#F3F8FF',
        tabBarShowLabel: false,
        tabBarLabelStyle: {
          fontSize: 16,
          fontWeight: 'bold',
        },
        tabBarItemStyle: {
          backgroundColor: '#222',
          paddingVertical: 20,
          paddingHorizontal: 16,
          marginBottom: 2,
        },
        tabBarIndicatorStyle: {
          backgroundColor: '#7E30E1',
        },
        tabBarStyle: {
          elevation: 0,
          shadowOpacity: 0,
        },
      })}>
      <Tab.Screen name="Posts" component={PostsScreen} />
      <Tab.Screen name="Favorite" component={FavoritesScreen} />
    </Tab.Navigator>
  );
};

export default ProfileNavigation;
