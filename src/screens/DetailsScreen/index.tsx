import {View, Text, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import styles from './styles';
import LikeSvg from '../../assets/svg/LikeSvg.svg';
import CommentSvg from '../../assets/svg/CommentSvg.svg';
import ShareSvg from '../../assets/svg/ShareSvg.svg';
import SaveSvg from '../../assets/svg/SaveSvg.svg';

const DetailsScreen = ({route}: {route: any}) => {
  const {postId} = route.params;
  const [userData, setUserData] = useState<any>(null);
  const [postData, setPostData] = useState<any>(null);

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
              <LikeSvg width={25} height={25} />
              <CommentSvg width={25} height={25} />
              <ShareSvg width={25} height={25} />
            </View>
            <View>
              <SaveSvg width={25} height={25} />
            </View>
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
