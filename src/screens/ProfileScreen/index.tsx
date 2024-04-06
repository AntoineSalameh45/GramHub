import React, {useState, useEffect} from 'react';
import {View, Text, Image, ActivityIndicator, Pressable} from 'react-native';
import axios from 'axios';
import styles from './styles';
import ProfileHeader from '../../components/organisms/ProfileHeader';
import ProfileNavigation from '../../navigation/ProfileNavigation';

export interface iUserData {
  name: string;
  avatar: string;
  followers: number;
  following: number;
  bio: string;
  posts: iPostData[];
}

export interface iPostData {
  id: string;
  image: string;
  caption: string;
}

const ProfileScreen = () => {
  const [userData, setUserData] = useState<iUserData | null>(null);

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
    <View style={styles.viewContainer}>
      <ProfileHeader />
      {userData ? (
        <>
          <View style={styles.userDataContainer}>
            <View>
              <Image source={{uri: userData.avatar}} style={styles.avatar} />
            </View>
            <View style={styles.ffContainer}>
              <View style={styles.ffCol}>
                <Text style={styles.ffNumbers}>{userData.followers}</Text>
                <Text style={styles.ffLabel}>Followers</Text>
              </View>
              <View style={styles.ffCol}>
                <Text style={styles.ffNumbers}>{userData.following}</Text>
                <Text style={styles.ffLabel}>Following</Text>
              </View>
            </View>
          </View>
          <Text>{userData.name}</Text>
          <Text>{userData.bio}</Text>
          <View style={styles.profileButtonsContainer}>
            <Pressable>
              <View style={styles.profileButtons}>
                <Text style={styles.buttonTitles}>Edit Profile</Text>
              </View>
            </Pressable>
            <Pressable>
              <View style={styles.profileButtons}>
                <Text style={styles.buttonTitles}>Share Profile</Text>
              </View>
            </Pressable>
          </View>
          <ProfileNavigation />
          {/* <View style={styles.postsContainer}>
            {userData.posts.map(post => (
              <View key={post.id}>
                <Image
                  source={{uri: `${post.image}`}}
                  style={{width: imageWidth, height: imageWidth}}
                />
              </View>
            ))}
          </View> */}
        </>
      ) : (
        <ActivityIndicator />
      )}
    </View>
  );
};

export default ProfileScreen;
