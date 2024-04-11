import React, {useEffect, useState} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import notifee from '@notifee/react-native';
import LikeSvg from '../../assets/svg/LikeSvg2.svg';
import CommentSvg from '../../assets/svg/CommentSvg.svg';
import ShareSvg from '../../assets/svg/ShareSvg.svg';
import SaveSvg from '../../assets/svg/SaveSvg.svg';
import styles from './styles';
import axios from 'axios';

const DetailsScreen = ({route}: {route: any}) => {
  const {postId} = route.params;
  const [userData, setUserData] = useState<any>(null);
  const [postData, setPostData] = useState<any>(null);
  const [likesCount, setLikesCount] = useState<number>(0);
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
          setLikesCount(postData.likes);
          setIsLiked(postData.isLiked);
        }
      } catch (error) {
        console.error('Error fetching post data:', error);
      }
    };

    fetchData();
  }, [postId]);

  const handleLikePress = async () => {
    const newLikesCount = isLiked ? likesCount - 1 : likesCount + 1;
    setLikesCount(newLikesCount);
    setIsLiked(!isLiked);

    try {
      const response = await axios.get(
        'https://660fd81d0640280f219b9867.mockapi.io/api/hub/user',
      );
      const userData = response.data[0];
      const updatedPosts = userData.posts.map((post: any) => {
        if (post.id === postId) {
          return {
            ...post,
            likes: newLikesCount,
            isLiked: !isLiked,
          };
        }
        return post;
      });

      await axios.put(
        `https://660fd81d0640280f219b9867.mockapi.io/api/hub/user/${userData.id}`,
        {
          posts: updatedPosts,
        },
      );

      await notifee.requestPermission();
      const channelId = await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
        vibration: true,
        sound: 'notification',
      });

      await notifee.displayNotification({
        title: 'Like Updated',
        body: isLiked ? 'Someone unliked your post' : 'Someone liked your post',
        android: {
          channelId,
          pressAction: {id: 'default'},
          largeIcon: 'bootsplash_logo',
          sound: 'notification',
        },
      });
    } catch (error) {
      console.error('Error updating likes:', error);
    }
  };

  const handleSaveImage = async () => {
    try {
      await notifee.displayNotification({
        title: 'Image Saved',
        body: 'Your image has been saved successfully!',
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
              <Text>{likesCount} Likes</Text>
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
