import {
  View,
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';

interface iStory {
  id: number;
  name: string;
  avatar: string;
}

const StoryBar = () => {
  const [story, setStory] = useState<iStory[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const fetchData = async () => {
    try {
      const response = await axios.get(
        'https://660fd81d0640280f219b9867.mockapi.io/api/hub/post',
      );
      setStory(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  const renderItem = ({item}: {item: iStory}) => (
    <>
      <View style={styles.storyContainer}>
        <Image source={{uri: `${item.avatar}`}} style={styles.storyAvatar} />
        <Text style={styles.storyUser}>{item.name}</Text>
      </View>
    </>
  );

  return (
    <View style={styles.viewContainer}>
      <FlatList
        data={story}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        horizontal={true}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

export default StoryBar;

const styles = StyleSheet.create({
  viewContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#444',
    marginBottom: 5,
    paddingVertical: 10,
  },
  storyContainer: {marginHorizontal: 11},
  storyAvatar: {height: 75, width: 75, borderRadius: 100 / 2},
  storyUser: {fontSize: 10, textAlign: 'center'},
});
