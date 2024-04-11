import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {RootStackParamList} from './RootStackParamList';
import SearchScreen from '../screens/SearchScreen';
import MyTabBar from '../components/organisms/CustomTabBar';
import HomeIcon from '../assets/svg/HomeSvg.svg';
import SearchIcon from '../assets/svg/SearchSvg.svg';
import ProfileIcon from '../assets/svg/ProfileSvg.svg';
import HomeNav from './HomeNav';
import DetailsNav from './DetailsNav';

const MainStackNavigator = createBottomTabNavigator<RootStackParamList>();

const MainNavigator = () => {
  const icons = [HomeIcon, SearchIcon, ProfileIcon];

  return (
    <MainStackNavigator.Navigator
      tabBar={props => <MyTabBar icons={icons} {...props} />}
      screenOptions={{
        tabBarHideOnKeyboard: true,
      }}>
      <MainStackNavigator.Screen
        name="Home"
        component={HomeNav}
        options={{
          headerShown: false,
        }}
      />
      <MainStackNavigator.Screen
        name="Search"
        component={SearchScreen}
        options={{
          headerShown: false,
        }}
      />
      <MainStackNavigator.Screen
        name="Profile"
        component={DetailsNav}
        options={{
          headerShown: false,
        }}
      />
    </MainStackNavigator.Navigator>
  );
};

export default MainNavigator;
