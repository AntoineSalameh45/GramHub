/**
 * @format
 */

import {AppRegistry} from 'react-native';
import notifee from '@notifee/react-native';
import App from './App';

notifee.onBackgroundEvent(async ({type, detail}) => {
  const {notification} = detail;
  await notifee.cancelNotification(notification.id);
});

AppRegistry.registerComponent('GramHub', () => App);
