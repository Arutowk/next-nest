'use server';

import { print } from 'graphql';
import { fetchGraphQL } from '../fetchGraphQL';
import { PostType } from '../types/modelTypes';
import { GET_POST_BY_ID, GET_POSTS } from '../graphql/post';
import { transformTakeSkip } from '../helpers';

export const fetchPosts = async ({
  page,
  pageSize,
}: {
  page?: number;
  pageSize?: number;
}) => {
  const { skip, take } = transformTakeSkip({ page, pageSize });
  const data = (await fetchGraphQL(print(GET_POSTS), { skip, take }))?.data;

  return { posts: data.posts as PostType[], totalPosts: data.postCount };
};

export const fetchPostById = async (id: number) => {
  const data = (await fetchGraphQL(print(GET_POST_BY_ID), { id }))?.data;

  return data.getPostById as Omit<
    PostType,
    'slug' | 'updatedAt' | '_count' | 'authorId'
  >;
};
