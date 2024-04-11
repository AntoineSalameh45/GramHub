import React from 'react';
import {View, Image, Text, TouchableOpacity} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {toggleSaved} from '../../../store/reducers/SavedReducer';
import styles from '../../screens/Home/styles';
import LikeSvg from '../../assets/svg/LikeSvg2.svg';
import CommentSvg from '../../assets/svg/CommentSvg.svg';
import ShareSvg from '../../assets/svg/ShareSvg.svg';
import SaveSvg from '../../assets/svg/SaveSvg2.svg';

interface Photo {
  id: number;
  image: string;
  name: string;
  avatar: string;
  caption: string;
  saved: boolean;
}

const OptimizedListItem: React.FC<{item: Photo}> = ({item}) => {
  const dispatch = useDispatch();
  const saved = useSelector((state: any) => state.saved[item.id]);

  const handleSavePress = () => {
    dispatch(toggleSaved(item.id));
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
          <LikeSvg width={25} height={25} />
          <CommentSvg width={25} height={25} />
          <ShareSvg width={25} height={25} />
        </View>
        <TouchableOpacity onPress={handleSavePress}>
          <SaveSvg width={25} height={25} fill={saved ? '#86469C' : 'none'} />
        </TouchableOpacity>
      </View>
      <View style={styles.postCaption}>
        <Text style={styles.userName}>{item.name}</Text>
        <Text style={styles.caption}> {item.caption}</Text>
      </View>
    </View>
  );
};

export default OptimizedListItem;
