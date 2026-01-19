"use client";

import { useRouter } from "next/navigation";
import { useActionState, useEffect, useReducer, useRef } from "react";

import { GetPostByIdQuery } from "@/gql/graphql";
import { updatePost } from "@/lib/actions/postActions";
import UpsertPostForm from "./upsert-post-form";

type Props = {
  post: GetPostByIdQuery["getPostById"];
};

const UpdatePostContainer = ({ post }: Props) => {
  const [state, action] = useActionState(updatePost, {
    data: {
      postId: post.id,
      title: post.title,
      slug: post.slug ?? undefined,
      content: JSON.parse(post.content),
      published: post.published ? "on" : "off",
      tags: post.tags?.map((tag) => tag.name).join(","),
      previousThumbnailUrl: post.thumbnail ?? undefined,
    },
  });
  const ref = useRef<{ submit: () => void }>(null!);
  const [publishNow, dispatch] = useReducer((checked) => !checked, false);
  const router = useRouter();
  useEffect(() => {
    if (state?.ok === true) {
      setTimeout(() => {
        router.push("/user/posts");
      }, 500);
    }
  }, [state?.ok, router]);
  return (
    <UpsertPostForm
      ref={ref}
      state={state}
      formAction={action}
      dispatch={dispatch}
    />
  );
};

export default UpdatePostContainer;
