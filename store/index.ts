import {combineReducers, configureStore} from '@reduxjs/toolkit';
import likesReducer from './reducers/LikesReducer';
import savedPostsReducer from './reducers/SavePostReducer';

const rootReducer = combineReducers({
  likes: likesReducer,
  savedPosts: savedPostsReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
