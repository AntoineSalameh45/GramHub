import React, {useState, useEffect} from 'react';
import {View, FlatList, Text, Image, Pressable} from 'react-native';
import notifee, {EventType} from '@notifee/react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';
import ClearSvg from '../../assets/svg/ClearSvg.svg';
import NewNotif from '../../assets/svg/BellPlusSvg.svg';

export interface iUserData {
  createdAt: number;
  name: string;
  avatar: string;
  image: string;
  caption: string;
  id: string;
}

export interface iNotification {
  id: string;
  message: string;
  user: iUserData;
}

const NotifCenter = ({navigation}: any) => {
  const [notifications, setNotifications] = useState<iNotification[]>([]);
  const [userData, setUserData] = useState<iUserData[]>([]);

  useEffect(() => {
    fetchUserData();

    const backgroundEventHandler = async ({type}: {type: EventType}) => {
      if (type === EventType.PRESS) {
        console.log('Notification pressed in background');
        if (navigation && navigation.navigate) {
          navigation.navigate('NotifCenter');
        }
      }
    };

    notifee.onBackgroundEvent(backgroundEventHandler);

    retrieveNotifications();

    return () => {};
  }, []);

  async function fetchUserData() {
    try {
      const response = await axios.get(
        'https://6617aab9ed6b8fa43483619c.mockapi.io/api/hub/posts',
      );
      const data: iUserData[] = response.data;
      setUserData(data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }

  async function onDisplayNotification() {
    try {
      await notifee.requestPermission();
      const channelId = await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
        vibration: true,
        vibrationPattern: [500, 1000],
      });

      const storedNotifications = await AsyncStorage.getItem('notifications');
      const parsedNotifications: iNotification[] = storedNotifications
        ? JSON.parse(storedNotifications)
        : [];

      const updatedNotifications = [
        ...parsedNotifications,
        {
          id: Math.random().toString(),
          message: 'New notification',
          user: userData[Math.floor(Math.random() * userData.length)],
        },
      ];

      await AsyncStorage.setItem(
        'notifications',
        JSON.stringify(updatedNotifications),
      );

      setNotifications(updatedNotifications);

      const randomIndex = Math.floor(
        Math.random() * updatedNotifications.length,
      );
      const user = updatedNotifications[randomIndex].user;
      const message = `${user.name} just posted a photo`;
      await notifee.displayNotification({
        title: 'New Notification',
        body: message,
        android: {
          channelId,
          vibrationPattern: [500, 1000],
          pressAction: {
            id: 'default',
          },
        },
      });
    } catch (error) {
      console.error('Error displaying notification:', error);
    }
  }

  const handleClear = async () => {
    await AsyncStorage.removeItem('notifications');
    setNotifications([]);
  };

  const retrieveNotifications = async () => {
    try {
      const storedNotifications = await AsyncStorage.getItem('notifications');
      if (storedNotifications !== null) {
        const parsedNotifications: iNotification[] =
          JSON.parse(storedNotifications);
        setNotifications(parsedNotifications);
      }
    } catch (error) {
      console.error('Error retrieving notifications:', error);
    }
  };

  const renderItem = ({item}: {item: iNotification}) => {
    return (
      <View style={styles.renderItemStyle}>
        <Image source={{uri: item.user.avatar}} style={styles.avatar} />
        <Text style={styles.message}>{item.message}</Text>
        <Image source={{uri: item.user.image}} style={styles.image} />
      </View>
    );
  };

  return (
    <View style={styles.viewContainer}>
      <Pressable onPress={onDisplayNotification} style={styles.bellButton}>
        <NewNotif width={30} height={30} />
      </Pressable>

      <Pressable onPress={handleClear} style={styles.clearButton}>
        <ClearSvg width={30} height={30} />
      </Pressable>
      <FlatList
        data={notifications}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default NotifCenter;
