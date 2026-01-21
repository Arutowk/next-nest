"use server";

import { authFetchGraphQL, fetchGraphQL } from "../fetchGraphQL";
import { CREATE_COMMENT_MUTATION, GET_POST_COMMENTS } from "../graphql/comment";
import { type CreateCommentFormState } from "../types/formState";
import { CommentFormSchema } from "../zodSchemas/commentFormSchema";

export async function getPostComments({
  postId,
  skip,
  take,
}: {
  postId: number;
  skip: number;
  take: number;
}) {
  const result = await fetchGraphQL(GET_POST_COMMENTS, {
    postId,
    take,
    skip,
  });

  return {
    comments: result?.data?.getPostComments,
    count: result?.data?.postCommentCount,
  };
}

export async function saveComment(
  state: CreateCommentFormState,
  formData: FormData,
): Promise<CreateCommentFormState> {
  const validatedFields = CommentFormSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!validatedFields.success)
    return {
      data: Object.fromEntries(formData.entries()),
      errors: validatedFields.error.flatten().fieldErrors,
    };

  const result = await authFetchGraphQL(CREATE_COMMENT_MUTATION, {
    input: {
      ...validatedFields.data,
    },
  });

  console.log(result.data);

  if (result.data)
    return {
      message: "Success! Your comment saved!",
      ok: true,
    };

  return {
    message: "Oops! Something went wrong!",
    ok: false,
    data: Object.fromEntries(formData.entries()),
  };
}
