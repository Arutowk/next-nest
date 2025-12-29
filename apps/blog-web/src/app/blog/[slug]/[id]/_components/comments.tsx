'use client';

import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import AddComment from './addComment';
import CommentCard from './commentCard';
import CommentCardSkeleton from './commentCardSkeleton';
import CommentPagination from './CommentPagination';

import { getPostComments } from '@/lib/actions/commentActions';
import { DEFAULT_PAGE_SIZE } from '@/lib/constants';
import { type SessionUser } from '@/lib/session';


type Props = {
  postId: number;
  user?: SessionUser;
};

const Comments = ({ postId, user }: Props) => {
  const [page, setPage] = useState(1);
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['GET_POST_COMMENTS', postId, page],
    queryFn: async () =>
      getPostComments({
        postId,
        skip: (page - 1) * DEFAULT_PAGE_SIZE,
        take: DEFAULT_PAGE_SIZE,
      }),
  });

  const totalPages = Math.ceil((data?.count ?? 0) / DEFAULT_PAGE_SIZE);
  return (
    <div className="p-2 rounded-md shadow-md">
      <button onClick={() => refetch()}></button>
      <h6 className="text-lg text-slate-700 ">Comments</h6>
      {!!user && <AddComment user={user} postId={postId} refetch={refetch} />}
      <div className="flex flex-col gap-4">
        {isLoading
          ? Array.from({ length: 12 }).map((_, index) => (
              <CommentCardSkeleton key={index} />
            ))
          : data?.comments.map((comment) => (
              <CommentCard key={comment.id} comment={comment} />
            ))}
      </div>
      <CommentPagination
        className="p-2"
        currentPage={page}
        setCurrentPage={(p) => setPage(p)}
        totalPages={totalPages}
      />
    </div>
  );
};

export default Comments;
