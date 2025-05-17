'use client';

import SubmitButton from '@/components/SubmitButton';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PostFormState } from '@/lib/types/formState';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { toast, Toaster } from 'sonner';
import { Editor } from './DynamicEditor';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

type Props = {
  state: PostFormState;
  formAction: (payload: FormData) => void;
};

const UpsertPostForm = ({ state, formAction }: Props) => {
  const [imageUrl, setImageUrl] = useState('');
  const router = useRouter();
  const [content, setContent] = useState(state?.data?.content || '');

  useEffect(() => {
    if (state?.message && state?.ok === true) {
      toast.success('Success', { description: state?.message });
    }
    if (state?.message && state?.ok === false) {
      toast.error('Oops!', { description: state?.message });
    }
  }, [state]);

  return (
    <>
      <Toaster richColors={true} />
      <div>
        {!!imageUrl || !!state?.data?.previousThumbnailUrl ? (
          <Image
            src={(imageUrl || state?.data?.previousThumbnailUrl) ?? ''}
            alt="post thumbnail"
            width={200}
            height={150}
          />
        ) : (
          <Image
            src="/no-image.jpg"
            alt="post thumbnail"
            width={200}
            height={150}
          />
        )}
      </div>
      <form
        action={formAction}
        className="flex flex-col  md:grid md:grid-cols-3 gap-5 [&>div>label]:text-slate-500 [&>div>input]:transition"
      >
        <input hidden name="postId" defaultValue={state?.data?.postId} />
        <input
          hidden
          name="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <input hidden name="published" defaultValue={'off'} />

        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            name="title"
            placeholder="Enter The Title of Your Post"
            defaultValue={state?.data?.title}
          />
          {!!state?.errors?.title && (
            <p className="text-red-500 animate-shake">{state.errors.title}</p>
          )}
        </div>

        <div>
          <Label htmlFor="thumbnail">Thumbnail</Label>
          <Input
            type="file"
            name="thumbnail"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files)
                setImageUrl(URL.createObjectURL(e.target.files[0]!));
            }}
          />
          {!!state?.errors?.thumbnail && (
            <p className="text-red-500 animate-shake">
              {state.errors.thumbnail}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="tags">Tags (comma-separated)</Label>
          <Input
            name="tags"
            placeholder="Enter tags (comma-separated)"
            defaultValue={state?.data?.tags}
          />
          {!!state?.errors?.tags && (
            <p className="text-red-500 animate-shake">{state.errors.tags}</p>
          )}
        </div>

        <div className="flex justify-between items-center">
          <div className="flex flex-col items-center">
            <div className="flex">
              <input
                className="mx-2 w-4 h-4"
                type="checkbox"
                name="published"
                defaultChecked={state?.data?.published === 'on' ? true : false}
              />
              <Label htmlFor="published">Published Now</Label>
              {!!state?.errors?.published && (
                <p className="text-red-500 animate-shake">
                  {state.errors.published}
                </p>
              )}
            </div>
          </div>
        </div>
        <div></div>
        <div className="flex justify-around items-center">
          <Button
            className="w-20"
            onClick={(e) => {
              e.preventDefault();
              router.back();
            }}
          >
            return
          </Button>
          <SubmitButton className="w-20">Save</SubmitButton>
        </div>
      </form>
      <div className="w-2/3">
        {!!state?.errors?.content && (
          <p className="text-red-500 animate-shake">{state.errors.content}</p>
        )}
        <Editor
          updateContent={setContent}
          defaultContent={state?.data?.content}
        />
      </div>
    </>
  );
};

export default UpsertPostForm;
