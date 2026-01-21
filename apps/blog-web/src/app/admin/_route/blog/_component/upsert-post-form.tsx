"use client";

import {
  type ActionDispatch,
  type RefObject,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { toast, Toaster } from "sonner";

import { NativeSwitch } from "@/components/admin/native-switch";
import { Input } from "@/components/ui/input";
import { type PostFormState } from "@/lib/types/formState";
import { Editor } from "./DynamicEditor";
import { FormRow } from "./form-row";
import { ImageUpload } from "./image-uploader";

type Props = {
  state: PostFormState;
  formAction: (payload: FormData) => void;
  ref: RefObject<{ submit: () => void; reset: () => void }>;
  dispatch: ActionDispatch<[]>;
};

const UpsertPostForm = ({ state, formAction, ref, dispatch }: Props) => {
  const [content, setContent] = useState(state?.data?.content || undefined);

  const formRef = useRef<HTMLFormElement>(null);

  useImperativeHandle(
    ref,
    () => ({
      submit: () => {
        // 触发原生提交，这会自动调用 action 里的 formAction
        formRef.current?.requestSubmit();
      },
      reset: () => {
        formRef.current?.reset();
      },
    }),
    [formRef],
  );

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
      <form
        ref={formRef}
        action={formAction}
        className="container max-w-4xl py-4 mx-auto"
      >
        {/* id和content需要隐藏在表单中 */}
        <input hidden name="postId" defaultValue={state?.data?.postId} />
        <input
          hidden
          name="content"
          value={JSON.stringify(content) || ""}
          readOnly
        />

        {/* 标题 */}
        <FormRow
          label="文章标题"
          id="title"
          errors={state?.errors?.title}
          description="吸引读者的第一印象"
        >
          <Input
            id="title"
            name="title"
            placeholder="例如：Next.js 入门指南"
            defaultValue={state?.data?.title}
          />
        </FormRow>

        {/* 缩略图 */}
        <FormRow
          label="文章封面"
          id="thumbnail"
          errors={state?.errors?.thumbnail}
          description="建议尺寸 1200x630px"
        >
          <ImageUpload
            name="thumbnail"
            defaultValue={state?.data?.existing_thumbnail}
          />
        </FormRow>

        {/* Slug */}
        <FormRow
          label="自定义链接 (Slug)"
          id="slug"
          errors={state?.errors?.slug}
          description="文章的 URL 后缀，用-隔开单词"
        >
          <Input
            id="slug"
            name="slug"
            placeholder="nextjs-guide-2024"
            defaultValue={state?.data?.slug}
          />
        </FormRow>

        {/* Tags */}
        <FormRow
          label="标签"
          id="tags"
          errors={state?.errors?.tags}
          description="文章的分类标签，用逗号隔开"
        >
          <Input
            id="tags"
            name="tags"
            placeholder="技术分享、项目实践、经验总结..."
            defaultValue={state?.data?.tags}
          />
        </FormRow>

        {/* 是否立即发布 */}
        <FormRow
          label="是否立即发布"
          id="published"
          errors={state?.errors?.published}
          description="存为草稿或直接发布"
        >
          <NativeSwitch
            id="published"
            name="published"
            defaultChecked={state?.data?.published === "on" ? true : false}
            onCheckedChange={dispatch}
          />
        </FormRow>
      </form>

      {!!state?.errors?.content && (
        <p className="text-destructive animate-shake">{state.errors.content}</p>
      )}
      <Editor
        value={content}
        updateContent={setContent}
        defaultContent={state?.data?.content}
      />
    </>
  );
};

export default UpsertPostForm;
