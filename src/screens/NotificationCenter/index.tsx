import React, {useState, useEffect} from 'react';
import {View, FlatList, Text, Image, Pressable} from 'react-native';
import notifee, {EventType} from '@notifee/react-native';
import axios, {AxiosResponse} from 'axios';
import styles from './styles';
import ClearSvg from '../../assets/svg/ClearSvg.svg';
import NewNotif from '../../assets/svg/BellPlusSvg.svg';

interface iUserData {
  createdAt: number;
  name: string;
  avatar: string;
  image: string;
  caption: string;
  id: string;
}

interface iNotification {
  id: string;
  message: string;
  user: iUserData;
}

const NotifCenter = ({navigation}: any) => {
  const [notifications, setNotifications] = useState<iNotification[]>([]);
  const [userData, setUserData] = useState<iUserData[]>([]);

  useEffect(() => {
    fetchUserData();
    const interval = setInterval(() => {
      onDisplayNotification();
    }, 60000);

    const backgroundEventHandler = async ({type}: {type: EventType}) => {
      if (type === EventType.PRESS) {
        console.log('Notification pressed in background');
        if (navigation && navigation.navigate) {
          navigation.navigate('NotifCenter');
        }
      }
    };

    notifee.onBackgroundEvent(backgroundEventHandler);

    return () => {
      clearInterval(interval);
    };
  }, []);

  async function fetchUserData() {
    try {
      const response: AxiosResponse<iUserData[]> = await axios.get(
        'https://660fd81d0640280f219b9867.mockapi.io/api/hub/post',
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

      if (userData && userData.length > 0) {
        const randomIndex = Math.floor(Math.random() * userData.length);
        const user = userData[randomIndex];
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

        setNotifications(prevNotifications => [
          ...prevNotifications,
          {id: Math.random().toString(), message, user},
        ]);
      }
    } catch (error) {
      console.error('Error displaying notification:', error);
    }
  }

  const handleClear = () => {
    setNotifications([]);
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
      <Pressable
        onPress={() => onDisplayNotification()}
        style={styles.bellButton}>
        <NewNotif width={30} height={30} />
      </Pressable>

      <Pressable onPress={() => handleClear()} style={styles.clearButton}>
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
