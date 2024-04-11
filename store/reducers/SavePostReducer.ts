const initialState = {
  savedPosts: [],
};

const savedPostsReducer = (
  state = initialState,
  action: {type: any; payload: any},
) => {
  switch (action.type) {
    case 'TOGGLE_SAVED':
      const postId = action.payload;
      const isPostSaved = state.savedPosts.includes(postId);
      return {
        ...state,
        savedPosts: isPostSaved
          ? state.savedPosts.filter(id => id !== postId)
          : [...state.savedPosts, postId],
      };
    default:
      return state;
  }
};

export default savedPostsReducer;
