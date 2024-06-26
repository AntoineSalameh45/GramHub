import React, {useState, useEffect} from 'react';
import {View, Text, Image, ActivityIndicator, Pressable} from 'react-native';
import axios from 'axios';
import styles from './styles';
import ProfileNavigation from '../../navigation/ProfileNavigation';
import Clipboard from '@react-native-clipboard/clipboard';

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

const ProfileScreen = ({navigation}: any) => {
  const [userData, setUserData] = useState<iUserData | null>(null);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<iUserData[]>(
          'https://6617aab9ed6b8fa43483619c.mockapi.io/api/hub/user',
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<iUserData[]>(
          'https://6617aab9ed6b8fa43483619c.mockapi.io/api/hub/user',
        );
        if (response.data && response.data.length > 0) {
          setUserData(response.data[0]);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    const unsubscribe = navigation.addListener('focus', () => {
      fetchData();
    });

    return unsubscribe;
  }, [navigation]);

  const copyToClipboard = () => {
    Clipboard.setString('gramhub://profile');
    setShowToast(true); // Show toast when link is copied
    setTimeout(() => setShowToast(false), 2000); // Hide toast after 2 seconds
  };

  return (
    <View style={styles.viewContainer}>
      {userData ? (
        <>
          <View style={styles.userDataContainer}>
            <View>
              <Image source={{uri: userData.avatar}} style={styles.avatar} />
            </View>
            <View style={styles.ffContainer}>
              <View style={styles.ffCol}>
                <Text style={styles.ffNumbers}>{userData.posts.length}</Text>
                <Text style={styles.ffLabel}>Posts</Text>
              </View>
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
          <View style={styles.changeable}>
            <View style={styles.username}>
              <Text style={styles.text}>{userData.name}</Text>
            </View>
            <View style={styles.bio}>
              <Text style={styles.text}>{userData.bio}</Text>
            </View>
          </View>
          <View style={styles.profileButtonsContainer}>
            <Pressable
              onPress={() => {
                navigation.navigate('About Account');
              }}>
              <View style={styles.profileButtons}>
                <Text style={styles.buttonTitles}>Edit Profile</Text>
              </View>
            </Pressable>
            <Pressable onPress={copyToClipboard}>
              <View style={styles.profileButtons}>
                <Text style={styles.buttonTitles}>Share Profile</Text>
              </View>
            </Pressable>
          </View>
          <ProfileNavigation />
        </>
      ) : (
        <ActivityIndicator />
      )}
      {showToast && (
        <View style={styles.toast}>
          <Text style={styles.toastText}>Link copied to clipboard!</Text>
        </View>
      )}
    </View>
  );
};

export default ProfileScreen;
