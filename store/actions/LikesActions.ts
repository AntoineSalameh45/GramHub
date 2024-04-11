import {Action} from 'redux';

export interface IncrementLikesAction extends Action {
  type: 'INCREMENT_LIKES';
  postId: string;
}

export interface DecrementLikesAction extends Action {
  type: 'DECREMENT_LIKES';
  postId: string;
}

export type LikesActionTypes = IncrementLikesAction | DecrementLikesAction;

export const incrementLikes = (postId: string): IncrementLikesAction => ({
  type: 'INCREMENT_LIKES',
  postId,
});

export const decrementLikes = (postId: string): DecrementLikesAction => ({
  type: 'DECREMENT_LIKES',
  postId,
});
