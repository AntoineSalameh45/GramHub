import React, {useEffect, useState} from 'react';
import {View, Image, FlatList, Dimensions} from 'react-native';
import styles from './styles';

const FavoriteScreen = () => {
  const [savedPosts, setSavedPosts] = useState([]);
  const {width} = Dimensions.get('window');
  const imageWidth = width / 3;

  useEffect(() => {
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

    fetchSavedPosts();
  }, []);

  const renderItem = ({item}: {item: {id: string; image: string}}) => (
    <View key={item.id}>
      <Image
        source={{uri: item.image}}
        style={{width: imageWidth, height: imageWidth}}
      />
    </View>
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
