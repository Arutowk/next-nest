"use server";

import type { PostFormState } from "../types/formState";

import { GetPostByIdQuery, UpdatePostInput } from "@/gql/graphql";
import { authFetchGraphQL, fetchGraphQL, fetchUpload } from "../fetchGraphQL";
import {
  CREATE_POST_MUTATION,
  DELETE_POST_MUTATION,
  GET_POST_BY_ID,
  GET_POSTS,
  GET_USER_POSTS,
  UPDATE_POST_MUTATION,
} from "../graphql/post";
import { transformTakeSkip } from "../helpers";
import { PostFormSchema } from "../zodSchemas/postFormSchema";

export const fetchPosts = async ({
  page,
  pageSize,
}: {
  page?: number;
  pageSize?: number;
}) => {
  const { skip, take } = transformTakeSkip({ page, pageSize });
  const data = (await fetchGraphQL(GET_POSTS, { skip, take }))?.data!;

  return {
    posts: data.posts,
    totalPosts: data.postCount,
  };
};

export const fetchPostById = async (id: number) => {
  const data = (await fetchGraphQL(GET_POST_BY_ID, { id }))?.data;

  return data?.getPostById;
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
    await authFetchGraphQL(GET_USER_POSTS, {
      take,
      skip,
    })
  )?.data;

  return {
    posts: data?.getUserPosts,
    totalPosts: data?.userPostCount,
  };
}

export async function saveNewPost(
  state: PostFormState,
  formData: FormData,
): Promise<PostFormState> {
  const validatedFields = PostFormSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );
  console.log("server action", validatedFields);
  if (!validatedFields.success) {
    return {
      data: Object.fromEntries(formData.entries()),
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  let thumbnailUrl = "";
  // Upload Thumbnail
  if (validatedFields.data.thumbnail) {
    const result = await fetchUpload("image", validatedFields.data.thumbnail);
    console.log("upload result:", result);
    if (result?.url) {
      thumbnailUrl = result?.url;
    }
  }

  // call garphql api
  const { postId, ...resDtata } = validatedFields.data;
  const result = await authFetchGraphQL(CREATE_POST_MUTATION, {
    input: {
      ...resDtata,
      thumbnail: thumbnailUrl,
    },
  });
  if (result.data) return { message: "Success! New Post Saved", ok: true };
  return {
    message: "Oops, Something Went Wrong",
    data: Object.fromEntries(formData.entries()),
  };
}

export async function updatePost(
  state: PostFormState,
  formData: FormData,
): Promise<PostFormState> {
  //reset latest post data
  if (state?.ok && formData.get("props")) {
    const post = JSON.parse(
      formData.get("props") as string,
    ) as GetPostByIdQuery["getPostById"];
    return {
      data: {
        postId: post.id,
        title: post.title,
        slug: post.slug ?? undefined,
        content: JSON.parse(post.content),
        published: post.published ? "on" : "off",
        tags: post.tags?.map((tag) => tag.name).join(","),
        previousThumbnailUrl: post.thumbnail ?? undefined,
      },
    };
  }

  const validatedFields = PostFormSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!validatedFields.success)
    return {
      data: Object.fromEntries(formData.entries()),
      errors: validatedFields.error.flatten().fieldErrors,
    };

  // Todo: check if thumbnail has been changed
  const { thumbnail, ...inputs } = validatedFields.data;

  let thumbnailUrl = "";
  // Todo:Upload Thumbnail to ali-oss
  if (thumbnail) {
    const result = await fetchUpload("image", validatedFields.data.thumbnail!);
    console.log("upload result:", result);
    if (result?.url) {
      thumbnailUrl = result?.url;
    }
  }

  const data = await authFetchGraphQL(UPDATE_POST_MUTATION, {
    input: {
      ...inputs,
      ...(thumbnailUrl && { thumbnail: thumbnailUrl }),
    } as UpdatePostInput,
  });

  if (data) return { message: "Success! The Post Updated", ok: true };
  return {
    message: "Oops, Something Went Wrong",
    data: Object.fromEntries(formData.entries()),
  };
}

export async function deletePost(postId: number) {
  const data = (
    await authFetchGraphQL(DELETE_POST_MUTATION, {
      postId,
    })
  )?.data!;

  return data.deletePost;
}
