export const toggleSaved = (postId: string) => ({
  type: 'TOGGLE_SAVED',
  payload: postId,
});
