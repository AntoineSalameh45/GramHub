import React, {useState} from 'react';
import {
  View,
  FlatList,
  Text,
  Pressable,
  TextInput,
  Image,
  ActivityIndicator,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../../../store';
import {addComment, clearComments} from '../../../store/slices/commentsSlice';
import styles from './styles';

const CommentScreen = ({route}: any) => {
  const {post} = route.params;
  const [inputText, setInputText] = useState('');
  const [isPosting, setIsPosting] = useState(false);
  const comments = useSelector((state: RootState) => state.comments.comments);
  const dispatch = useDispatch();

  const handleAddComment = () => {
    if (inputText.trim() !== '') {
      setIsPosting(true);
      setTimeout(() => {
        dispatch(addComment({id: Math.random().toString(), text: inputText}));
        setInputText('');
        setIsPosting(false);
      }, 2000);
    }
  };

  const handleClearComments = () => {
    dispatch(clearComments());
  };

  const isButtonDisabled = !inputText || isPosting; // Updated condition

  return (
    <View style={styles.viewContainer}>
      <View style={styles.postHeader}>
        <Image source={{uri: post.avatar}} style={styles.avatar} />
        <Text style={styles.userName}>{post.name}</Text>
      </View>
      <View style={styles.imageContainer}>
        <Image source={{uri: post.image}} style={styles.image} />
      </View>
      <FlatList
        data={comments}
        renderItem={({item}) => <Text>{item.text}</Text>}
        keyExtractor={item => item.id}
      />
      <View>
        <View style={styles.inputContainer}>
          <TextInput
            value={inputText}
            onChangeText={setInputText}
            placeholder="Type your comment here"
            style={styles.input}
          />
          <Pressable
            onPress={handleAddComment}
            style={[styles.button, isButtonDisabled && styles.disabled]}
            disabled={isButtonDisabled}>
            {isPosting ? (
              <ActivityIndicator color="#7E30E1" />
            ) : (
              <Text style={styles.buttonText}>Post</Text>
            )}
          </Pressable>
        </View>
        <Pressable onPress={handleClearComments}>
          <Text>Clear Comments</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default CommentScreen;
