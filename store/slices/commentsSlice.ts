import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../index';

interface Comment {
  id: string;
  text: string;
}

interface CommentsState {
  comments: Comment[];
}

const initialState: CommentsState = {
  comments: [],
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addComment(state, action: PayloadAction<Comment>) {
      state.comments.push(action.payload);
    },
    clearComments(state) {
      state.comments = [];
    },
  },
});

export const {addComment, clearComments} = commentsSlice.actions;

export const selectComments = (state: RootState) => state.comments.comments;

export default commentsSlice.reducer;
