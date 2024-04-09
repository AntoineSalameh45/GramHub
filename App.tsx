import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import BootSplash from 'react-native-bootsplash';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import MainNavigator from './src/navigation/mainNavigator';

const linking = {
  prefixes: ['gramhub://'],
  config: {
    initialRouteName: 'Home' as const,
    screens: {
      Home: 'home',
      Search: 'search',
      Profile: 'profile',
    },
  },
};

const App = () => {
  useEffect(() => {
    setTimeout(() => {
      BootSplash.hide();
    });
  }, []);
  return (
    <SafeAreaProvider>
      <NavigationContainer linking={linking}>
        <MainNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
