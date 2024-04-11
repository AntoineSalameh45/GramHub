import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  FlatList,
  Image,
  RefreshControl,
  Text,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native'; // Import useFocusEffect
import axios from 'axios';
import styles from './styles';
import LikeSvg from '../../assets/svg/LikeSvg2.svg';
import CommentSvg from '../../assets/svg/CommentSvg.svg';
import ShareSvg from '../../assets/svg/ShareSvg.svg';
import SaveSvg from '../../assets/svg/SaveSvg2.svg';
import StoryBar from '../../components/organisms/StoryBar';
import AppHeader from '../../components/organisms/AppHeader';

interface Photo {
  id: number;
  image: string;
  name: string;
  avatar: string;
  caption: string;
  saved: boolean;
}

const OptimizedListItem: React.FC<{
  item: Photo;
  onSaveToggle: (id: number) => void;
  navigation: any;
}> = ({item, onSaveToggle, navigation}) => {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const handleLikePress = async () => {
    setIsLiked(!isLiked);
  };
  const handleSaveToggle = () => {
    onSaveToggle(item.id);
  };

  return (
    <View>
      <View style={styles.postHeader}>
        <Image source={{uri: item.avatar}} style={styles.avatar} />
        <Text style={styles.userName}>{item.name}</Text>
      </View>
      <View style={styles.imageContainer}>
        <Image source={{uri: item.image}} style={styles.image} />
      </View>
      <View style={styles.postBottom}>
        <View style={styles.postIcons}>
          <TouchableOpacity onPress={handleLikePress}>
            <LikeSvg
              width={25}
              height={25}
              fill={isLiked ? '#86469C' : 'none'}
            />
          </TouchableOpacity>
          <Pressable
            onPress={() => navigation.navigate('Comments', {post: item})}>
            <CommentSvg width={25} height={25} />
          </Pressable>
          <ShareSvg width={25} height={25} />
        </View>
        <TouchableOpacity onPress={handleSaveToggle}>
          <SaveSvg
            width={25}
            height={25}
            fill={item.saved ? '#86469C' : 'none'}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.postCaption}>
        <Text style={styles.userName}>{item.name}</Text>
        <Text style={styles.caption}> {item.caption}</Text>
      </View>
    </View>
  );
};

const Home = ({navigation}: any) => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);

  const fetchData = useCallback(async (pageNum: number) => {
    try {
      const response = await axios.get(
        `https://6617aab9ed6b8fa43483619c.mockapi.io/api/hub/posts?page=${pageNum}&limit=5`,
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  }, []);

  const loadMoreData = useCallback(async () => {
    if (!loadingMore) {
      setLoadingMore(true);
      const nextPage = page + 1;
      const newData = await fetchData(nextPage);
      if (newData.length > 0) {
        setPhotos(prevPhotos => [...prevPhotos, ...newData]);
        setPage(nextPage);
      }
      setLoadingMore(false);
    }
  }, [loadingMore, page, fetchData]);

  useEffect(() => {
    const loadInitialData = async () => {
      setRefreshing(true);
      const initialData = await fetchData(1);
      setPhotos(initialData);
      setRefreshing(false);
    };

    loadInitialData();
  }, [fetchData]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchData(1).then(data => {
      setPhotos(data);
      setPage(1);
      setRefreshing(false);
    });
  }, [fetchData]);

  const handleSaveToggle = async (id: number) => {
    try {
      const updatedPhotos = photos.map(photo => {
        if (photo.id === id) {
          return {...photo, saved: !photo.saved};
        }
        return photo;
      });
      setPhotos(updatedPhotos);
      await axios.put(
        `https://6617aab9ed6b8fa43483619c.mockapi.io/api/hub/posts/${id}`,
        {saved: !photos.find(photo => photo.id === id)?.saved},
      );
    } catch (error) {
      console.error('Error toggling save status:', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      const refreshData = async () => {
        setRefreshing(true);
        const data = await fetchData(1);
        setPhotos(data);
        setPage(1);
        setRefreshing(false);
      };
      refreshData();
    }, [fetchData]),
  );

  return (
    <View style={styles.viewContainer}>
      <AppHeader navigation={navigation} />
      <FlatList
        ListHeaderComponent={<StoryBar />}
        data={photos}
        renderItem={({item}) => (
          <OptimizedListItem
            item={item}
            onSaveToggle={handleSaveToggle}
            navigation={navigation}
          />
        )}
        keyExtractor={item => item.id.toString()}
        horizontal={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        onEndReached={loadMoreData}
        onEndReachedThreshold={2}
      />
    </View>
  );
};

export default Home;
