"use client";

import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";

import type { Tag } from "blog-api";

import UpsertPostForm from "@/app/(site)/user/create-post/_components/upsertPostForm";
import { updatePost } from "@/lib/actions/postActions";

type Props = {
  post:  {
    id: number;
    title: string;
    slug: string | null;
    thumbnail: string | null;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    publishedAt: Date | null;
    published: boolean;
    author: {
        name: string;
    };
    tags: {
        id: number;
        name: string;
    }[];
};
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
      existing_thumbnail: post.thumbnail ?? undefined,
    },
  });
  const router = useRouter();
  useEffect(() => {
    if (state?.ok === true) {
      setTimeout(() => {
        router.push("/user/posts");
      }, 500);
    }
  }, [state?.ok, router]);
  return <UpsertPostForm state={state} formAction={action} />;
};

export default UpdatePostContainer;
