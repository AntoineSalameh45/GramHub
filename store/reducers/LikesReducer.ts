import {LikesActionTypes} from '../actions/LikesActions';

interface Post {
  id: string;
  likes: number;
}

interface LikesState {
  posts: Post[];
}

const initialState: LikesState = {
  posts: [],
};

const likesReducer = (
  state: LikesState = initialState,
  action: LikesActionTypes,
): LikesState => {
  switch (action.type) {
    case 'INCREMENT_LIKES':
      return {
        ...state,
        posts: state.posts.map(post =>
          post.id === action.postId ? {...post, likes: post.likes + 1} : post,
        ),
      };
    case 'DECREMENT_LIKES':
      return {
        ...state,
        posts: state.posts.map(post =>
          post.id === action.postId
            ? {...post, likes: Math.max(0, post.likes - 1)}
            : post,
        ),
      };
    default:
      return state;
  }
};

export default likesReducer;
