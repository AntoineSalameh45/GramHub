import React, {useEffect, useState} from 'react';
import {
  View,
  FlatList,
  Image,
  Dimensions,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import styles from './styles';
import {iUserData} from '../ProfileScreen';
import axios from 'axios';

const PostsScreen = ({navigation}: any) => {
  const [userData, setUserData] = useState<iUserData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const {width} = Dimensions.get('window');
  const imageWidth = width / 3;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<iUserData[]>(
          'https://6617aab9ed6b8fa43483619c.mockapi.io/api/hub/user',
        );
        if (response.data && response.data.length > 0) {
          setUserData(response.data[0]);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const renderPostItem = ({item}: {item: {id: string; image: string}}) => (
    <View key={item.id}>
      <Pressable
        onPress={() => {
          navigation.navigate('Details', {postId: item.id});
        }}>
        <Image
          source={{uri: `${item.image}`}}
          style={{width: imageWidth, height: imageWidth}}
        />
      </Pressable>
    </View>
  );

  return (
    <View style={styles.viewContainer}>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={userData?.posts || []}
          renderItem={renderPostItem}
          keyExtractor={item => item.id.toString()}
          numColumns={3}
        />
      )}
    </View>
  );
};

export default PostsScreen;
