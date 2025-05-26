import { type Post, Tag, User, Comment } from '.prisma/blog-client';

export type PostType = Post & {
  _count: {
    likes: number;
    comments: number;
  };
  author: UserType;
  tags?: Tag[];
};

export type UserType = Omit<User, 'password' | 'avatar'> & { avatar?: string };

export type TagType = Tag;

export type CommentType = Comment & { author: UserType };
