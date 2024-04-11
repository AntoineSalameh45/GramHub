import {combineReducers, configureStore} from '@reduxjs/toolkit';
import likesReducer from './reducers/LikesReducer';
import savedPostsReducer from './reducers/SavePostReducer';
import commentsReducer from './slices/commentsSlice';

const rootReducer = combineReducers({
  likes: likesReducer,
  savedPosts: savedPostsReducer,
  comments: commentsReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
