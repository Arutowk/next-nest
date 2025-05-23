import { fetchPostById } from '@/lib/actions/postActions';
import UpdatePostContainer from './_components/UpdatePostContainer';

type Props = {
  params: Promise<{ id: string }>;
};

const UpdatePostPage = async (props: Props) => {
  const params = await props.params;
  const post = await fetchPostById(parseInt(params.id));
  return (
    <>
      <h2 className="text-lg text-center font-bold text-slate-700">
        Update Your Post
      </h2>
      <UpdatePostContainer post={post} />
    </>
  );
};

export default UpdatePostPage;
