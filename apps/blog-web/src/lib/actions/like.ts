'use server';

import { print } from 'graphql';
import { authFetchGraphQL } from '../fetchGraphQL';
import {
  LIKE_POST_MUTATION,
  POST_LIKES,
  UNLIKE_POST_MUTATION,
} from '../graphql/like';

export async function getPostLikeData(postId: number) {
  const data = (
    await authFetchGraphQL(print(POST_LIKES), {
      postId,
    })
  ).data;

  return {
    likeCount: data.postLikesCount as number,
    userLikedPost: data.userLikedPost as boolean,
  };
}

export async function likePost(postId: number) {
  const data = (
    await authFetchGraphQL(print(LIKE_POST_MUTATION), {
      postId,
    })
  ).data;
}

export async function unLikePost(postId: number) {
  const data = (
    await authFetchGraphQL(print(UNLIKE_POST_MUTATION), {
      postId,
    })
  ).data;
}
