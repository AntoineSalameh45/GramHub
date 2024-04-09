import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {RootStackParamList} from './RootStackParamList';
import MyDrawer from './DrawerNavigation';
import DetailsScreen from '../screens/DetailsScreen';

const ProfTab = createStackNavigator<RootStackParamList>();

const DetailsNav = () => {
  return (
    <ProfTab.Navigator>
      <ProfTab.Screen
        name="User"
        component={MyDrawer}
        options={{headerShown: false}}
      />
      <ProfTab.Screen
        name="Details"
        component={DetailsScreen}
        options={{headerShown: false}}
      />
    </ProfTab.Navigator>
  );
};

export default DetailsNav;
