"use client";

import {
  startTransition,
  use,
  useActionState,
  useEffect,
  useReducer,
  useRef,
} from "react";

import { TabInstanceContext } from "@/app/admin/page";
import { Button } from "@/components/ui/button";
import { GetPostByIdQuery } from "@/gql/graphql";
import { useTabsAction } from "@/hooks/use-admin-tabs";
import { updatePost } from "@/lib/actions/postActions";
import { useQueryClient } from "@tanstack/react-query";
import PageNavbar from "./page-nav";
import UpsertPostForm from "./upsert-post-form";

type Props = {
  post: GetPostByIdQuery["getPostById"];
};

const UpdatePostContainer = ({ post }: Props) => {
  const [state, action, isPending] = useActionState(updatePost, {
    data: {
      postId: post.id,
      title: post.title,
      slug: post.slug ?? undefined,
      content: JSON.parse(post.content),
      published: post.published ? "on" : "off",
      tags: post.tags?.map((tag) => tag.name).join(","),
      existing_thumbnail: post.thumbnail ?? undefined,
    },
  });
  const ref = useRef<{ submit: () => void; reset: () => void }>(null!);
  const [publishNow, dispatch] = useReducer((checked) => !checked, false);
  const queryClient = useQueryClient();
  const { openTab, closeTab } = useTabsAction();
  const thisTabId = use(TabInstanceContext);

  useEffect(() => {
    if (state?.ok === true) {
      if (publishNow) {
        queryClient.invalidateQueries({
          queryKey: ["blog", "list"],
        });
        setTimeout(() => {
          closeTab(thisTabId);
          openTab("blog");
        }, 1000);
      } else {
        queryClient.invalidateQueries({
          queryKey: ["blog", "edit", post.id],
        });
      }
    }
  }, [state?.ok, queryClient, closeTab, openTab, thisTabId]);

  useEffect(() => {
    if (state?.ok === true) {
      const formData = new FormData();
      formData.append("props", JSON.stringify(post));
      startTransition(() => {
        action(formData);
      });
    }
  }, [post]);

  return (
    <>
      {/* 操作按钮 */}
      <PageNavbar title="编辑博客">
        <Button
          onClick={() => {
            closeTab(thisTabId);
            openTab("blog");
          }}
          type="button"
          variant="outline"
        >
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

export default UpdatePostContainer;
