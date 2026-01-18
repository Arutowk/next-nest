/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  query getPostComments($postId: Int!, $take: Int, $skip: Int) {\n    getPostComments(postId: $postId, take: $take, skip: $skip) {\n      id\n      content\n      createdAt\n      author {\n        name\n        avatar\n      }\n    }\n    postCommentCount(postId: $postId)\n  }\n": typeof types.GetPostCommentsDocument,
    "\n  mutation createComment($input: CreateCommentInput!) {\n    createComment(createCommentInput: $input) {\n      id\n    }\n  }\n": typeof types.CreateCommentDocument,
    "\n  query PostLikeData($postId: Int!) {\n    postLikesCount(postId: $postId)\n    userLikedPost(postId: $postId)\n  }\n": typeof types.PostLikeDataDocument,
    "\n  mutation LikePost($postId: Int!) {\n    likePost(postId: $postId)\n  }\n": typeof types.LikePostDocument,
    "\n  mutation UnLikePost($postId: Int!) {\n    unlikePost(postId: $postId)\n  }\n": typeof types.UnLikePostDocument,
    "\n  query posts($skip: Float, $take: Float) {\n    posts(skip: $skip, take: $take) {\n      id\n      title\n      thumbnail\n      content\n      createdAt\n      slug\n    }\n    postCount\n  }\n": typeof types.PostsDocument,
    "\n  query getPostById($id: Int!) {\n    getPostById(id: $id) {\n      id\n      title\n      thumbnail\n      content\n      createdAt\n      published\n      author {\n        name\n      }\n      tags {\n        id\n        name\n      }\n    }\n  }\n": typeof types.GetPostByIdDocument,
    "\n  query GetUserPosts($skip: Int, $take: Int) {\n    getUserPosts(skip: $skip, take: $take) {\n      id\n      title\n      slug\n      thumbnail\n      published\n      createdAt\n      updatedAt\n      publishedAt\n      content\n      _count {\n        likes\n        comments\n      }\n    }\n    userPostCount\n  }\n": typeof types.GetUserPostsDocument,
    "\n  mutation CreatePostMutation($input: CreatePostInput!) {\n    createPost(createPostInput: $input) {\n      id\n    }\n  }\n": typeof types.CreatePostMutationDocument,
    "\n  mutation UpdatePost($input: UpdatePostInput!) {\n    updatePost(updatePostInput: $input) {\n      id\n    }\n  }\n": typeof types.UpdatePostDocument,
    "\n  mutation DeletePost($postId: Int!) {\n    deletePost(postId: $postId)\n  }\n": typeof types.DeletePostDocument,
    "\n  mutation createUser($input: CreateUserInput!) {\n    createUser(createUserInput: $input) {\n      id\n    }\n  }\n": typeof types.CreateUserDocument,
    "\n  mutation signIn($input: SignInInput!) {\n    signIn(signInInput: $input) {\n      id\n      name\n      avatar\n      accessToken\n    }\n  }\n": typeof types.SignInDocument,
};
const documents: Documents = {
    "\n  query getPostComments($postId: Int!, $take: Int, $skip: Int) {\n    getPostComments(postId: $postId, take: $take, skip: $skip) {\n      id\n      content\n      createdAt\n      author {\n        name\n        avatar\n      }\n    }\n    postCommentCount(postId: $postId)\n  }\n": types.GetPostCommentsDocument,
    "\n  mutation createComment($input: CreateCommentInput!) {\n    createComment(createCommentInput: $input) {\n      id\n    }\n  }\n": types.CreateCommentDocument,
    "\n  query PostLikeData($postId: Int!) {\n    postLikesCount(postId: $postId)\n    userLikedPost(postId: $postId)\n  }\n": types.PostLikeDataDocument,
    "\n  mutation LikePost($postId: Int!) {\n    likePost(postId: $postId)\n  }\n": types.LikePostDocument,
    "\n  mutation UnLikePost($postId: Int!) {\n    unlikePost(postId: $postId)\n  }\n": types.UnLikePostDocument,
    "\n  query posts($skip: Float, $take: Float) {\n    posts(skip: $skip, take: $take) {\n      id\n      title\n      thumbnail\n      content\n      createdAt\n      slug\n    }\n    postCount\n  }\n": types.PostsDocument,
    "\n  query getPostById($id: Int!) {\n    getPostById(id: $id) {\n      id\n      title\n      thumbnail\n      content\n      createdAt\n      published\n      author {\n        name\n      }\n      tags {\n        id\n        name\n      }\n    }\n  }\n": types.GetPostByIdDocument,
    "\n  query GetUserPosts($skip: Int, $take: Int) {\n    getUserPosts(skip: $skip, take: $take) {\n      id\n      title\n      slug\n      thumbnail\n      published\n      createdAt\n      updatedAt\n      publishedAt\n      content\n      _count {\n        likes\n        comments\n      }\n    }\n    userPostCount\n  }\n": types.GetUserPostsDocument,
    "\n  mutation CreatePostMutation($input: CreatePostInput!) {\n    createPost(createPostInput: $input) {\n      id\n    }\n  }\n": types.CreatePostMutationDocument,
    "\n  mutation UpdatePost($input: UpdatePostInput!) {\n    updatePost(updatePostInput: $input) {\n      id\n    }\n  }\n": types.UpdatePostDocument,
    "\n  mutation DeletePost($postId: Int!) {\n    deletePost(postId: $postId)\n  }\n": types.DeletePostDocument,
    "\n  mutation createUser($input: CreateUserInput!) {\n    createUser(createUserInput: $input) {\n      id\n    }\n  }\n": types.CreateUserDocument,
    "\n  mutation signIn($input: SignInInput!) {\n    signIn(signInInput: $input) {\n      id\n      name\n      avatar\n      accessToken\n    }\n  }\n": types.SignInDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getPostComments($postId: Int!, $take: Int, $skip: Int) {\n    getPostComments(postId: $postId, take: $take, skip: $skip) {\n      id\n      content\n      createdAt\n      author {\n        name\n        avatar\n      }\n    }\n    postCommentCount(postId: $postId)\n  }\n"): (typeof documents)["\n  query getPostComments($postId: Int!, $take: Int, $skip: Int) {\n    getPostComments(postId: $postId, take: $take, skip: $skip) {\n      id\n      content\n      createdAt\n      author {\n        name\n        avatar\n      }\n    }\n    postCommentCount(postId: $postId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createComment($input: CreateCommentInput!) {\n    createComment(createCommentInput: $input) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation createComment($input: CreateCommentInput!) {\n    createComment(createCommentInput: $input) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query PostLikeData($postId: Int!) {\n    postLikesCount(postId: $postId)\n    userLikedPost(postId: $postId)\n  }\n"): (typeof documents)["\n  query PostLikeData($postId: Int!) {\n    postLikesCount(postId: $postId)\n    userLikedPost(postId: $postId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation LikePost($postId: Int!) {\n    likePost(postId: $postId)\n  }\n"): (typeof documents)["\n  mutation LikePost($postId: Int!) {\n    likePost(postId: $postId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UnLikePost($postId: Int!) {\n    unlikePost(postId: $postId)\n  }\n"): (typeof documents)["\n  mutation UnLikePost($postId: Int!) {\n    unlikePost(postId: $postId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query posts($skip: Float, $take: Float) {\n    posts(skip: $skip, take: $take) {\n      id\n      title\n      thumbnail\n      content\n      createdAt\n      slug\n    }\n    postCount\n  }\n"): (typeof documents)["\n  query posts($skip: Float, $take: Float) {\n    posts(skip: $skip, take: $take) {\n      id\n      title\n      thumbnail\n      content\n      createdAt\n      slug\n    }\n    postCount\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getPostById($id: Int!) {\n    getPostById(id: $id) {\n      id\n      title\n      thumbnail\n      content\n      createdAt\n      published\n      author {\n        name\n      }\n      tags {\n        id\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  query getPostById($id: Int!) {\n    getPostById(id: $id) {\n      id\n      title\n      thumbnail\n      content\n      createdAt\n      published\n      author {\n        name\n      }\n      tags {\n        id\n        name\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetUserPosts($skip: Int, $take: Int) {\n    getUserPosts(skip: $skip, take: $take) {\n      id\n      title\n      slug\n      thumbnail\n      published\n      createdAt\n      updatedAt\n      publishedAt\n      content\n      _count {\n        likes\n        comments\n      }\n    }\n    userPostCount\n  }\n"): (typeof documents)["\n  query GetUserPosts($skip: Int, $take: Int) {\n    getUserPosts(skip: $skip, take: $take) {\n      id\n      title\n      slug\n      thumbnail\n      published\n      createdAt\n      updatedAt\n      publishedAt\n      content\n      _count {\n        likes\n        comments\n      }\n    }\n    userPostCount\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreatePostMutation($input: CreatePostInput!) {\n    createPost(createPostInput: $input) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation CreatePostMutation($input: CreatePostInput!) {\n    createPost(createPostInput: $input) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdatePost($input: UpdatePostInput!) {\n    updatePost(updatePostInput: $input) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation UpdatePost($input: UpdatePostInput!) {\n    updatePost(updatePostInput: $input) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeletePost($postId: Int!) {\n    deletePost(postId: $postId)\n  }\n"): (typeof documents)["\n  mutation DeletePost($postId: Int!) {\n    deletePost(postId: $postId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createUser($input: CreateUserInput!) {\n    createUser(createUserInput: $input) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation createUser($input: CreateUserInput!) {\n    createUser(createUserInput: $input) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation signIn($input: SignInInput!) {\n    signIn(signInInput: $input) {\n      id\n      name\n      avatar\n      accessToken\n    }\n  }\n"): (typeof documents)["\n  mutation signIn($input: SignInInput!) {\n    signIn(signInInput: $input) {\n      id\n      name\n      avatar\n      accessToken\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;