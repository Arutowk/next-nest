import PostListItem from './PostListItem';

import Pagination from '@/components/pagination';
import { type PostType } from '@/lib/types/modelTypes';

type Props = {
  posts:{
      id: number;
      title: string;
      slug: string | null;
      thumbnail: string | null;
      published: boolean;
      createdAt: Date;
      updatedAt: Date;
      publishedAt: Date | null;
      content: string;
      _count: {
          likes: number;
          comments: number;
    };
  }[];
  currentPage: number;
  totalPages: number;
};
const PostList = ({ posts, currentPage, totalPages }: Props) => {
  return (
    <>
      <div className="grid grid-cols-8 rounded-md shadow-md m-3 p-3 text-center">
        <div className="col-span-2"></div>
        <div></div>
        <div>Date</div>
        <div>Published</div>
        <div>Likes</div>
        <div>Comments</div>
        <div></div>
      </div>

      {posts.map((post) => (
        <PostListItem post={post} key={post.id} />
      ))}
      <Pagination {...{ currentPage, totalPages }} className="my-4" />
    </>
  );
};

export default PostList;
