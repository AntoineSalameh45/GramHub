import {View, Image, Dimensions, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './styles';
import {iUserData} from '../ProfileScreen';
import axios from 'axios';

const PostsScreen = () => {
  const [userData, setUserData] = useState<iUserData | null>(null);

  const {width} = Dimensions.get('window');
  const imageWidth = width / 3;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<iUserData[]>(
          'https://660fd81d0640280f219b9867.mockapi.io/api/hub/user',
        );
        if (response.data && response.data.length > 0) {
          setUserData(response.data[0]);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <View style={styles.viewContainer}>
        <View style={styles.postsContainer}>
          {userData ? (
            userData.posts.map(post => (
              <View key={post.id}>
                <Image
                  source={{uri: `${post.image}`}}
                  style={{width: imageWidth, height: imageWidth}}
                />
              </View>
            ))
          ) : (
            <ActivityIndicator />
          )}
        </View>
      </View>
    </>
  );
};

export default PostsScreen;
