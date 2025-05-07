'use server';

import { print } from 'graphql';
import { authFetchGraphQL, fetchGraphQL } from '../fetchGraphQL';
import { PostType } from '../types/modelTypes';
import {
  CREATE_POST_MUTATION,
  GET_POST_BY_ID,
  GET_POSTS,
  GET_USER_POSTS,
} from '../graphql/post';
import { transformTakeSkip } from '../helpers';
import { PostFormState } from '../types/formState';
import { PostFormSchema } from '../zodSchemas/postFormSchema';
import { uploadThumbnail } from '../upload';

export const fetchPosts = async ({
  page,
  pageSize,
}: {
  page?: number;
  pageSize?: number;
}) => {
  const { skip, take } = transformTakeSkip({ page, pageSize });
  const data = (await fetchGraphQL(print(GET_POSTS), { skip, take }))?.data;

  return {
    posts: data.posts as PostType[],
    totalPosts: data.postCount as number,
  };
};

export const fetchPostById = async (id: number) => {
  const data = (await fetchGraphQL(print(GET_POST_BY_ID), { id }))?.data;

  return data?.getPostById as Omit<
    PostType,
    'slug' | 'updatedAt' | '_count' | 'authorId'
  >;
};

export async function fetchUserPosts({
  page,
  pageSize,
}: {
  page?: number;
  pageSize: number;
}) {
  const { take, skip } = transformTakeSkip({ page, pageSize });
  const data = (
    await authFetchGraphQL(print(GET_USER_POSTS), {
      take,
      skip,
    })
  )?.data;

  return {
    posts: data?.getUserPosts as PostType[],
    totalPosts: data?.userPostCount as number,
  };
}

export async function saveNewPost(
  state: PostFormState,
  formData: FormData,
): Promise<PostFormState> {
  const validatedFields = PostFormSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!validatedFields.success)
    return {
      data: Object.fromEntries(formData.entries()),
      errors: validatedFields.error.flatten().fieldErrors,
    };
  let thumbnailUrl = '';
  // Todo:Upload Thumbnail to supabase
  if (validatedFields.data.thumbnail)
    thumbnailUrl = await uploadThumbnail(validatedFields.data.thumbnail);

  // Todo: call garphql api
  const { postId, ...resDtata } = validatedFields.data;
  const result = await authFetchGraphQL(print(CREATE_POST_MUTATION), {
    input: {
      ...resDtata,
      thumbnail: thumbnailUrl,
    },
  });

  if (result.data) return { message: 'Success! New Post Saved', ok: true };
  return {
    message: 'Oops, Something Went Wrong',
    data: Object.fromEntries(formData.entries()),
  };
}
