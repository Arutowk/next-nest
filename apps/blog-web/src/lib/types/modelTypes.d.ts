import { type Post, Tag, User, Comment } from '@repo/database';

export type PostType = Post & {
  _count: {
    likes: number;
    comments: number;
  };
  tags: Tag[];
};

export type UserType = Omit<User, 'password'>;

export type TagType = Tag;

export type CommentType = Comment;
