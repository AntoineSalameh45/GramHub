import React, {useState, useEffect} from 'react';
import {View, FlatList, Image, RefreshControl, Text} from 'react-native';
import axios from 'axios';
import styles from './styles';
import LikeSvg from '../../assets/svg/LikeSvg.svg';
import CommentSvg from '../../assets/svg/CommentSvg.svg';
import ShareSvg from '../../assets/svg/ShareSvg.svg';
import SaveSvg from '../../assets/svg/SaveSvg.svg';
import StoryBar from '../../components/organisms/StoryBar';
import AppHeader from '../../components/organisms/AppHeader';

interface iPhoto {
  id: number;
  image: string;
  name: string;
  avatar: string;
  caption: string;
}

const Home = () => {
  const [photos, setPhotos] = useState<iPhoto[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);

  const fetchData = async (page: number) => {
    try {
      const response = await axios.get(
        `https://660fd81d0640280f219b9867.mockapi.io/api/hub/post?page=${page}&limit=5`,
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  };

  const loadMoreData = async () => {
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
  };

  useEffect(() => {
    const loadInitialData = async () => {
      setRefreshing(true);
      const initialData = await fetchData(1);
      setPhotos(initialData);
      setRefreshing(false);
    };

    loadInitialData();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchData(1).then(data => {
      setPhotos(data);
      setPage(1);
      setRefreshing(false);
    });
  };

  const renderItem = ({item}: {item: iPhoto}) => (
    <>
      <View style={styles.postHeader}>
        <Image source={{uri: `${item.avatar}`}} style={styles.avatar} />
        <Text style={styles.userName}>{item.name}</Text>
      </View>
      <View style={styles.imageContainer}>
        <Image source={{uri: `${item.image}`}} style={styles.image} />
      </View>
      <View style={styles.postBottom}>
        <View style={styles.postIcons}>
          <LikeSvg width={25} height={25} />
          <CommentSvg width={25} height={25} />
          <ShareSvg width={25} height={25} />
        </View>
        <View>
          <SaveSvg width={25} height={25} />
        </View>
      </View>
      <View style={styles.postCaption}>
        <Text style={styles.userName}>{item.name}</Text>
        <Text style={styles.caption}> {item.caption}</Text>
      </View>
    </>
  );

  return (
    <View style={styles.viewContainer}>
      <AppHeader />
      <FlatList
        ListHeaderComponent={<StoryBar />}
        data={photos}
        renderItem={renderItem}
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
