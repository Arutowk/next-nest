"use client";

import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";

import { saveNewPost } from "@/lib/actions/postActions";
import UpsertPostForm from "./upsert-post-form";

const CreatePostContainer = () => {
  const [state, action] = useActionState(saveNewPost, undefined);
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

export default CreatePostContainer;
