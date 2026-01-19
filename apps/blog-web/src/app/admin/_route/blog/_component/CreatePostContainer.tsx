"use client";

import { use, useActionState, useEffect, useReducer, useRef } from "react";

import { TabInstanceContext } from "@/app/admin/page";
import { Button } from "@/components/ui/button";
import { useTabsAction } from "@/hooks/use-admin-tabs";
import { saveNewPost } from "@/lib/actions/postActions";
import { useQueryClient } from "@tanstack/react-query";
import PageNavbar from "./page-nav";
import UpsertPostForm from "./upsert-post-form";

const CreatePostContainer = () => {
  const [state, action, isPending] = useActionState(saveNewPost, undefined);
  const ref = useRef<{ submit: () => void }>(null!);
  const [publishNow, dispatch] = useReducer((checked) => !checked, false);
  const queryClient = useQueryClient();
  const { openTab, closeTab } = useTabsAction();
  const thisTabId = use(TabInstanceContext);

  useEffect(() => {
    if (state?.ok === true) {
      queryClient.invalidateQueries({
        queryKey: ["blog", "list"],
      });
      closeTab(thisTabId);
      openTab("blog");
    }
  }, [state?.ok, queryClient, closeTab, openTab, thisTabId]);

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
