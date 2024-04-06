import React, {useState, useEffect} from 'react';
import {View, Text, Image} from 'react-native';
import axios from 'axios';
import styles from './styles';
import ProfileHeader from '../../components/organisms/ProfileHeader';

interface UserData {
  name: string;
  avatar: string;
  followers: number;
  following: number;
}

const ProfileScreen = () => {
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<UserData[]>(
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
            <View style={{flexDirection: 'row'}}>
              <View style={{flexDirection: 'column'}}>
                <Text style={{fontSize: 22, textAlign: 'center'}}>
                  {userData.followers}
                </Text>
                <Text style={{textAlign: 'center', marginHorizontal: 10}}>
                  Followers
                </Text>
              </View>
              <View style={{flexDirection: 'column'}}>
                <Text style={{fontSize: 22, textAlign: 'center'}}>
                  {userData.following}
                </Text>
                <Text style={{textAlign: 'center', marginHorizontal: 10}}>
                  Following
                </Text>
              </View>
            </View>
          </View>
          <Text>{userData.name}</Text>
        </>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

export default ProfileScreen;
