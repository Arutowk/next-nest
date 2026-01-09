"use client";

import { type JSONContent } from "@tiptap/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast, Toaster } from "sonner";

import Editor from "@/components/blog-editor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { type PostFormState } from "@/lib/types/formState";
import { FormRow } from "./form-row";
import { ImageUpload } from "./ImageUploader";

type Props = {
  state: PostFormState;
  formAction: (payload: FormData) => void;
};

const UpsertPostForm = ({ state, formAction }: Props) => {
  const [imageUrl, setImageUrl] = useState("");
  const router = useRouter();
  const [content, setContent] = useState(state?.data?.content || "");

  useEffect(() => {
    if (state?.message && state?.ok === true) {
      toast.success("Success", { description: state?.message });
    }
    if (state?.message && state?.ok === false) {
      toast.error("Oops!", { description: state?.message });
    }
  }, [state]);

  return (
    <>
      <Toaster richColors={true} />
      <form onSubmit={(e) => {}} className="container max-w-4xl py-10 mx-auto">
        {/* 标题 */}
        <FormRow label="文章标题" id="title" description="吸引读者的第一印象。">
          <Input
            id="title"
            name="title"
            placeholder="例如：Next.js 入门指南"
            required
          />
        </FormRow>

        {/* Slug */}
        <FormRow
          label="自定义链接 (Slug)"
          id="slug"
          description="文章的 URL 后缀，留空则自动生成。"
        >
          <Input id="slug" name="slug" placeholder="nextjs-guide-2024" />
        </FormRow>

        {/* 缩略图 */}
        <FormRow
          label="文章封面"
          id="thumbnail"
          description="建议尺寸 1200x630px。"
        >
          <ImageUpload name="thumbnail" />
        </FormRow>

        {/* 发布状态 */}
        <FormRow
          label="立即发布"
          id="published"
          description="开启后文章将对公众可见。"
        >
          <div className="flex items-center space-x-2">
            {/* <Switch id="published" name="published" /> */}
          </div>
        </FormRow>

        {/* 操作按钮 */}
        <div className="flex justify-end gap-4 pt-4">
          <Button type="button" variant="outline">
            保存草稿
          </Button>
          <Button type="submit">创建博客</Button>
        </div>
      </form>
      <div className="w-full">
        {!!state?.errors?.content && (
          <p className="text-red-500 animate-shake">{state.errors.content}</p>
        )}
        <Editor
          updateContent={setContent}
          defaultContent={state?.data?.content as JSONContent}
        />
      </div>
    </>
  );
};

export default UpsertPostForm;
