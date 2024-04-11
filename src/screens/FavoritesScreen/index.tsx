import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  Image,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native'; // Import useFocusEffect
import styles from './styles';
import axios from 'axios';

const FavoriteScreen = () => {
  const [savedPosts, setSavedPosts] = useState([]);
  const {width} = Dimensions.get('window');
  const imageWidth = width / 3;

  const fetchSavedPosts = async () => {
    try {
      const response = await fetch(
        'https://6617aab9ed6b8fa43483619c.mockapi.io/api/hub/posts',
      );
      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }
      const posts = await response.json();
      const savedPosts = posts.filter((post: {saved: any}) => post.saved);
      setSavedPosts(savedPosts);
    } catch (error) {
      console.error('Error fetching saved posts:', error);
    }
  };

  useEffect(() => {
    fetchSavedPosts();
  }, []); // Fetch data only on initial render

  // Fetch data every time the screen gains focus
  useFocusEffect(
    useCallback(() => {
      fetchSavedPosts();
    }, []),
  );

  const handleRemoveFromFavorites = async (postId: string) => {
    try {
      const response = await axios.put(
        `https://6617aab9ed6b8fa43483619c.mockapi.io/api/hub/posts/${postId}`,
        {saved: false},
      );
      if (response.status === 200) {
        fetchSavedPosts(); // Refresh data after removing from favorites
      }
    } catch (error) {
      console.error('Error removing post from favorites:', error);
    }
  };

  const renderItem = ({item}: {item: {id: string; image: string}}) => (
    <TouchableOpacity onPress={() => handleRemoveFromFavorites(item.id)}>
      <View key={item.id}>
        <Image
          source={{uri: item.image}}
          style={{width: imageWidth, height: imageWidth}}
        />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.viewContainer}>
      <FlatList
        data={savedPosts}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        numColumns={3}
      />
    </View>
  );
};

export default FavoriteScreen;
