import { graphql } from "@/gql";

export const GET_POSTS = graphql(`
  query posts($skip: Float, $take: Float) {
    posts(skip: $skip, take: $take) {
      id
      title
      thumbnail
      content
      createdAt
      slug
    }
    postCount
  }
`);

export const GET_POST_BY_ID = graphql(`
  query getPostById($id: Int!) {
    getPostById(id: $id) {
      id
      title
      thumbnail
      content
      createdAt
      published
      author {
        name
      }
      tags {
        id
        name
      }
    }
  }
`);

export const GET_USER_POSTS = graphql(`
  query GetUserPosts($skip: Int, $take: Int) {
    getUserPosts(skip: $skip, take: $take) {
      id
      title
      slug
      thumbnail
      published
      createdAt
      content
      _count {
        likes
        comments
      }
    }
    userPostCount
  }
`);

export const CREATE_POST_MUTATION = graphql(`
  mutation CreatePostMutation($input: CreatePostInput!) {
    createPost(createPostInput: $input) {
      id
    }
  }
`);

export const UPDATE_POST_MUTATION = graphql(`
  mutation UpdatePost($input: UpdatePostInput!) {
    updatePost(updatePostInput: $input) {
      id
    }
  }
`);

export const DELETE_POST_MUTATION = graphql(`
  mutation DeletePost($postId: Int!) {
    deletePost(postId: $postId)
  }
`);
