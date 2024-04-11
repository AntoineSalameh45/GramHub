import {combineReducers, configureStore} from '@reduxjs/toolkit';
import likesReducer from './reducers/LikesReducer';

const rootReducer = combineReducers({
  likes: likesReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
