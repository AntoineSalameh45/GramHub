import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {RootStackParamList} from './RootStackParamList';
import SearchScreen from '../screens/SearchScreen';
import MyTabBar from '../components/organisms/CustomTabBar';
import UserScreen from '../screens/UserScreen';
import HomeIcon from '../assets/svg/HomeSvg.svg';
import SearchIcon from '../assets/svg/SearchSvg.svg';
import ProfileIcon from '../assets/svg/ProfileSvg.svg';
import HomeNav from './HomeNav';

const MainStackNavigator = createBottomTabNavigator<RootStackParamList>();

const MainNavigator = () => {
  const icons = [HomeIcon, SearchIcon, ProfileIcon];

  return (
    <MainStackNavigator.Navigator
      tabBar={props => <MyTabBar icons={icons} {...props} />}>
      <MainStackNavigator.Screen
        name="Home"
        component={HomeNav}
        options={{
          headerShown: false,
          tabBarIcon: () => <HomeIcon />,
        }}
      />
      <MainStackNavigator.Screen
        name="Search"
        component={SearchScreen}
        options={{
          headerShown: false,
          tabBarIcon: () => <SearchIcon />,
        }}
      />
      <MainStackNavigator.Screen
        name="Profile"
        component={UserScreen}
        options={{
          headerShown: false,
          tabBarIcon: () => <ProfileIcon />,
        }}
      />
    </MainStackNavigator.Navigator>
  );
};

export default MainNavigator;
