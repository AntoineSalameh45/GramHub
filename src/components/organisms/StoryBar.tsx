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
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);

  const fetchStoryData = async (page: number) => {
    try {
      const response = await axios.get(
        `https://660fd81d0640280f219b9867.mockapi.io/api/hub/post?page=${page}&limit=10`,
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  };

  const fetchData = async () => {
    setLoading(true);
    const newData = await fetchStoryData(pageNumber);
    setStory(prevStory => [...prevStory, ...newData]);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [pageNumber]);

  const onRefresh = () => {
    setRefreshing(true);
    setPageNumber(1);
    setStory([]);
    fetchData();
    setRefreshing(false);
  };

  const handleLoadMore = () => {
    if (!loading) {
      setPageNumber(page => page + 1);
    }
  };

  const renderItem = ({item}: {item: iStory}) => (
    <View style={styles.storyContainer}>
      <Image source={{uri: `${item.avatar}`}} style={styles.storyAvatar} />
      <Text style={styles.storyUser}>{item.name}</Text>
    </View>
  );

  return (
    <View style={styles.viewContainer}>
      <FlatList
        data={story}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        onEndReachedThreshold={1}
        onEndReached={handleLoadMore}
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
