import React, {useState, useEffect, useCallback, PureComponent} from 'react';
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

class OptimizedListItem extends PureComponent<{item: iPhoto}> {
  render() {
    const {item} = this.props;
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
      </View>
    );
  }
}

const Home = ({navigation}: any) => {
  const [photos, setPhotos] = useState<iPhoto[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);

  const fetchData = async (pageNum: number) => {
    try {
      const response = await axios.get(
        `https://660fd81d0640280f219b9867.mockapi.io/api/hub/post?page=${pageNum}&limit=5`,
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  };

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
  }, [loadingMore, page]);

  useEffect(() => {
    const loadInitialData = async () => {
      setRefreshing(true);
      const initialData = await fetchData(1);
      setPhotos(initialData);
      setRefreshing(false);
    };

    loadInitialData();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchData(1).then(data => {
      setPhotos(data);
      setPage(1);
      setRefreshing(false);
    });
  }, []);

  return (
    <View style={styles.viewContainer}>
      <AppHeader navigation={navigation} />
      <FlatList
        ListHeaderComponent={<StoryBar />}
        data={photos}
        renderItem={({item}) => <OptimizedListItem item={item} />}
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
