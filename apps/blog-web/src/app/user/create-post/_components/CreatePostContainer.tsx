'use client';

import { saveNewPost } from '@/lib/actions/postActions';
import { useActionState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import UpsertPostForm from './upsertPostForm';

const CreatePostContainer = () => {
  const [state, action] = useActionState(saveNewPost, undefined);
  const router = useRouter();
  useEffect(() => {
    if (state?.ok === true) {
      setTimeout(() => {
        router.push('/user/posts');
      }, 500);
    }
  }, [state?.ok]);

  return <UpsertPostForm state={state} formAction={action} />;
};

export default CreatePostContainer;
