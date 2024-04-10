import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import styles from './styles';
import LikeSvg from '../../assets/svg/LikeSvg2.svg';
import CommentSvg from '../../assets/svg/CommentSvg.svg';
import ShareSvg from '../../assets/svg/ShareSvg.svg';
import SaveSvg from '../../assets/svg/SaveSvg.svg';
import notifee from '@notifee/react-native';

const DetailsScreen = ({route}: {route: any}) => {
  const {postId} = route.params;
  const [userData, setUserData] = useState<any>(null);
  const [postData, setPostData] = useState<any>(null);
  const [isLiked, setIsLiked] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://660fd81d0640280f219b9867.mockapi.io/api/hub/user',
        );
        const userData = response.data.find((user: any) =>
          user.posts.some((post: any) => post.id === postId),
        );
        if (userData) {
          setUserData(userData);
          const postData = userData.posts.find(
            (post: any) => post.id === postId,
          );
          setPostData(postData);
        }
      } catch (error) {
        console.error('Error fetching post data:', error);
      }
    };

    fetchData();
  }, [postId]);

  const handleLikePress = async () => {
    setIsLiked(!isLiked);

    if (!isLiked) {
      try {
        await notifee.requestPermission();
        const channelId = await notifee.createChannel({
          id: 'default',
          name: 'Default Channel',
          vibration: true,
          sound: 'notification',
        });

        await notifee.displayNotification({
          title: 'New Like',
          body: 'Someone liked your photo!',
          android: {
            channelId,
            pressAction: {id: 'default'},
            largeIcon: 'bootsplash_logo',
            sound: 'notification',
          },
        });
      } catch (error) {
        console.error('Error displaying notification:', error);
      }
    }
  };

  const handleSaveImage = async () => {
    try {
      await notifee.requestPermission();
      const channelId = await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
        vibration: true,
        sound: 'notification',
      });

      await notifee.displayNotification({
        title: 'Image Saved',
        body: 'Your image has been saved successfully!',
        android: {
          channelId,
          sound: 'notification',
        },
      });
    } catch (error) {
      console.error('Error displaying notification:', error);
    }
  };

  return (
    <View style={styles.viewContainer}>
      {postData && userData && (
        <View>
          <View style={styles.postHeader}>
            <Image source={{uri: userData.avatar}} style={styles.avatar} />
            <Text style={styles.userName}>{userData.name}</Text>
          </View>
          <View style={styles.imageContainer}>
            <Image source={{uri: postData.image}} style={styles.image} />
          </View>
          <View style={styles.postBottom}>
            <View style={styles.postIcons}>
              <TouchableOpacity onPress={handleLikePress}>
                <LikeSvg
                  width={25}
                  height={25}
                  fill={isLiked ? '#86469C' : 'none'}
                />
              </TouchableOpacity>
              <CommentSvg width={25} height={25} />
              <ShareSvg width={25} height={25} />
            </View>
            <TouchableOpacity onPress={handleSaveImage}>
              <View>
                <SaveSvg width={25} height={25} />
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.postCaption}>
            <Text style={styles.userName}>{userData.name}</Text>
            <Text style={styles.caption}> {postData.caption}</Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default DetailsScreen;
