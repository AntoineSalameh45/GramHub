import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import MyTabBar from '../components/organisms/CustomTabBar';
// import LoginScreen from '../screens/LoginScreen';
import SearchScreen from '../screens/SearchScreen';
import ProfileScreen from '../screens/ProfileScreen';

const MainStackNavigator = createBottomTabNavigator();

const MainNavigator = () => {
  return (
    <MainStackNavigator.Navigator tabBar={props => <MyTabBar {...props} />}>
      <MainStackNavigator.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      <MainStackNavigator.Screen
        name="Search"
        component={SearchScreen}
        options={{headerShown: false}}
      />
      {/* <MainStackNavigator.Screen
        name="Login"
        component={LoginScreen}
        options={{headerShown: false}}
      /> */}
      <MainStackNavigator.Screen
        name="Profile"
        component={ProfileScreen}
        options={{headerShown: false}}
      />
    </MainStackNavigator.Navigator>
  );
};

export default MainNavigator;
