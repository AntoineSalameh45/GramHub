import {configureStore, combineReducers} from '@reduxjs/toolkit';
import likesReducer from './reducers/LikesReducer';

export type RootState = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
  likes: likesReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
