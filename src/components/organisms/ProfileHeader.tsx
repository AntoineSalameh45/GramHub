import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import GearSvg from '../../assets/svg/GearSvg.svg';
import NotifSvg from '../../assets/svg/BellSvg.svg';
import {iUserData} from '../../screens/ProfileScreen';

const ProfileHeader = () => {
  const [userName, setUserName] = useState<iUserData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<iUserData[]>(
          'https://660fd81d0640280f219b9867.mockapi.io/api/hub/user',
        );
        if (response.data && response.data.length > 0) {
          setUserName(response.data[0]);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []);
  return (
    <View style={styles.viewContainer}>
      <Text style={styles.title}>@{userName?.name}</Text>
      <View style={styles.viewButtonsContainer}>
        <NotifSvg width={30} height={30} />
        <GearSvg width={30} height={30} />
      </View>
    </View>
  );
};

export default ProfileHeader;

const styles = StyleSheet.create({
  viewContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 10,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  title: {
    fontSize: 24,
    fontFamily: 'Montserrat-VariableFont_wght',
    marginLeft: 10,
  },
  viewButtonsContainer: {
    flex: 0.4,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
