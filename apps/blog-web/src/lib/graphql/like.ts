import { graphql } from "@/gql";

export const POST_LIKES = graphql(`
  query PostLikeData($postId: Int!) {
    postLikesCount(postId: $postId)
    userLikedPost(postId: $postId)
  }
`);

export const LIKE_POST_MUTATION = graphql(`
  mutation LikePost($postId: Int!) {
    likePost(postId: $postId)
  }
`);

export const UNLIKE_POST_MUTATION = graphql(`
  mutation UnLikePost($postId: Int!) {
    unlikePost(postId: $postId)
  }
`);
