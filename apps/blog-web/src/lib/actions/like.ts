"use server";

import { authFetchGraphQL } from "../fetchGraphQL";
import {
  LIKE_POST_MUTATION,
  POST_LIKES,
  UNLIKE_POST_MUTATION,
} from "../graphql/like";

export async function getPostLikeData(postId: number) {
  const data = (
    await authFetchGraphQL(POST_LIKES, {
      postId,
    })
  ).data;

  return {
    likeCount: data?.postLikesCount,
    userLikedPost: data?.userLikedPost,
  };
}

export async function likePost(postId: number) {
  const data = (
    await authFetchGraphQL(LIKE_POST_MUTATION, {
      postId,
    })
  ).data;
}

export async function unLikePost(postId: number) {
  const data = (
    await authFetchGraphQL(UNLIKE_POST_MUTATION, {
      postId,
    })
  ).data;
}
