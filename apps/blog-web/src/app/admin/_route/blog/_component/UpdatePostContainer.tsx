"use client";

import { useRouter } from "next/navigation";
import { useActionState, useEffect, useReducer, useRef } from "react";

import { type Tag } from "blog-api";

import { updatePost } from "@/lib/actions/postActions";
import { type PostType } from "@/lib/types/modelTypes";
import UpsertPostForm from "./upsert-post-form";

type Props = {
  post: Omit<PostType, "slug" | "updatedAt" | "_count" | "authorId">;
};

const UpdatePostContainer = ({ post }: Props) => {
  console.log({ post });
  const [state, action] = useActionState(updatePost, {
    data: {
      postId: post.id,
      title: post.title,
      content: JSON.parse(post?.content).json ?? post.content,
      published: post.published ? "on" : undefined,
      tags: post.tags?.map((tag: Tag) => tag.name).join(","),
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
