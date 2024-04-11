import React, {useState, useEffect} from 'react';
import {View, FlatList, Image, RefreshControl, Dimensions} from 'react-native';
import axios from 'axios';
import styles from './styles';
import SearchBar from '../../components/organisms/SearchBar';

interface iPhoto {
  id: number;
  image: string;
}

const OnlineGallery = () => {
  const [photos, setPhotos] = useState<iPhoto[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const {width} = Dimensions.get('window');
  const imageWidth = width / 3;

  const fetchData = async () => {
    try {
      const response = await axios.get(
        'https://6617aab9ed6b8fa43483619c.mockapi.io/api/hub/posts',
      );
      setPhotos(response.data);
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

  const shuffleArray = (array: any[]) => {
    let currentIndex = array.length,
      temporaryValue,
      randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  };

  const shuffledPhotos = shuffleArray(photos);

  const renderItem = ({item}: {item: iPhoto}) => (
    <View style={styles.renderContainer}>
      <Image
        source={{
          uri: `${item.image}`,
        }}
        style={{width: imageWidth, height: imageWidth}}
      />
    </View>
  );

  return (
    <View style={styles.viewContainer}>
      <SearchBar />
      <FlatList
        data={shuffledPhotos}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        horizontal={false}
        numColumns={3}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

export default OnlineGallery;
