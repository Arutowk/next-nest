'use server';

import { print } from 'graphql';
import { fetchGraphQL } from '../fetchGraphQL';
import { PostType } from '../types/modelTypes';
import { GET_POSTS } from '../graphql/gqlQueries';
import { transformTakeSkip } from '../helpers';

export const fetchPosts = async ({
  page,
  pageSize,
}: {
  page?: number;
  pageSize?: number;
}) => {
  const { skip, take } = transformTakeSkip({ page, pageSize });
  const data = await fetchGraphQL(print(GET_POSTS), { skip, take });

  return { posts: data.posts as PostType[], totalPosts: data.postCount };
};
