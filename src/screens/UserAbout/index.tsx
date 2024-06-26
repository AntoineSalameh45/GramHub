import React, {useState, useEffect} from 'react';
import {View, Text, Pressable, TextInput, Alert} from 'react-native';
import styles from './styles';
import axios from 'axios';

const AboutAccount = ({navigation}: any) => {
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(
        'https://6617aab9ed6b8fa43483619c.mockapi.io/api/hub/user',
      );
      const userData = response.data[0];

      setUsername(userData.name);
      setBio(userData.bio);
      setUserId(userData.id);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleSave = async () => {
    try {
      await axios.put(
        `https://6617aab9ed6b8fa43483619c.mockapi.io/api/hub/user/${userId}`,
        {
          name: username,
          bio: bio,
        },
      );

      Alert.alert('Success', 'Changes saved successfully.', [
        {text: 'OK', onPress: () => navigation.navigate('Profile')},
      ]);
    } catch (error) {
      console.error('Error saving changes:', error);
      Alert.alert('Error', 'Failed to save changes. Please try again later.');
    }
  };

  return (
    <View style={styles.viewContainer}>
      <View>
        <View style={styles.infoContainer}>
          <Text style={styles.text}>E-mail:</Text>
          <TextInput
            placeholder="use******@gmail.com"
            placeholderTextColor={'#999'}
            readOnly={true}
            style={styles.inputStyle}
          />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.text}>Password:</Text>
          <TextInput
            placeholder="********"
            placeholderTextColor={'#999'}
            readOnly={true}
            style={styles.inputStyle}
          />
        </View>
      </View>
      <View style={styles.changeableInfo}>
        <View style={styles.infoContainer}>
          <Text style={styles.text}>Username:</Text>
          <TextInput
            value={username}
            onChangeText={text => setUsername(text)}
            placeholder="Enter username"
            placeholderTextColor={'#999'}
            style={styles.inputStyle}
          />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.text}>Bio:</Text>
          <TextInput
            value={bio}
            onChangeText={text => setBio(text)}
            placeholder="Enter bio"
            placeholderTextColor={'#999'}
            style={styles.inputStyle}
          />
        </View>
        <Pressable
          onPress={handleSave}
          style={({pressed}) => [
            {
              backgroundColor: pressed ? '#6C2492' : '#7E30E1',
              borderRadius: 5,
              paddingVertical: 10,
              paddingHorizontal: 20,
              marginTop: 20,
              marginRight: 25,
              alignSelf: 'flex-end',
            },
          ]}>
          <Text style={styles.saveButtonText}>Save</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default AboutAccount;
