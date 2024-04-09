import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import BootSplash from 'react-native-bootsplash';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import MainNavigator from './src/navigation/mainNavigator';
import UnAuthSatck from './src/navigation/UnAuthSatck';
import useAuthStore from './src/store/authStore';

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
  const {authToken} = useAuthStore();
  useEffect(() => {
    setTimeout(() => {
      BootSplash.hide();
    });
  }, []);
  return (
    <SafeAreaProvider>
      <NavigationContainer linking={linking}>
        {authToken ? <MainNavigator /> : <UnAuthSatck />}
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
