import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import BootSplash from 'react-native-bootsplash';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import MainNavigator from './src/navigation/mainNavigator';
import UnAuthStack from './src/navigation/UnAuthStack';
import useAuthStore from './src/store/authStore';
import {Provider} from 'react-redux';
import store from './store';

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
      <Provider store={store}>
        <NavigationContainer linking={linking}>
          {authToken ? <MainNavigator /> : <UnAuthStack />}
        </NavigationContainer>
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;
