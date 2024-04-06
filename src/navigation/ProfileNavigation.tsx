import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import SearchScreen from '../screens/SearchScreen';
import PostsScreen from '../screens/PostsScreen';
import GallerySvg from '../assets/svg/GallerySvg.svg';
import FavoriteSvg from '../assets/svg/SaveSvg.svg';

const Tab = createMaterialTopTabNavigator();

const ProfileNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: () => {
          let iconComponent;

          switch (route.name) {
            case 'Posts':
              iconComponent = <GallerySvg width={30} height={30} />;
              break;
            case 'Favorite':
              iconComponent = <FavoriteSvg width={30} height={30} />;
              break;
            default:
              iconComponent = null;
          }

          return iconComponent;
        },
      })}
      tabBarOptions={{
        showLabel: false,
        activeTintColor: '#7E30E1',
        inactiveTintColor: '#F3F8FF',
        labelStyle: {
          fontSize: 16,
          fontWeight: 'bold',
        },
        tabStyle: {
          backgroundColor: '#222',
          paddingVertical: 20,
          paddingHorizontal: 16,
          marginBottom: 2,
        },
        indicatorStyle: {
          backgroundColor: '#7E30E1',
        },
        style: {
          elevation: 0,
          shadowOpacity: 0,
        },
      }}>
      <Tab.Screen name="Posts" component={PostsScreen} />
      <Tab.Screen name="Favorite" component={SearchScreen} />
    </Tab.Navigator>
  );
};

export default ProfileNavigation;
