"use client";

import { useRouter } from "next/navigation";
import { useActionState, useEffect, useReducer, useRef } from "react";

import { Button } from "@/components/ui/button";
import { saveNewPost } from "@/lib/actions/postActions";
import PageNavbar from "./page-nav";
import UpsertPostForm from "./upsert-post-form";

const CreatePostContainer = () => {
  const [state, action, isPending] = useActionState(saveNewPost, undefined);
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
    <>
      {/* 操作按钮 */}
      <PageNavbar title="新增博客">
        <Button type="button" variant="outline">
          返回列表
        </Button>
        <Button onClick={() => ref.current?.submit()} disabled={isPending}>
          {publishNow ? "发布博客" : "保存草稿"}
        </Button>
      </PageNavbar>
      <UpsertPostForm
        ref={ref}
        state={state}
        formAction={action}
        dispatch={dispatch}
      />
    </>
  );
};

export default CreatePostContainer;
