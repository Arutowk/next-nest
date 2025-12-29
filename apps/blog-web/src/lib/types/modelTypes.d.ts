import type { Comment, Post, Tag, User } from "blog-api";

export type PostType = Post & {
  _count: {
    likes: number;
    comments: number;
  };
  author: UserType;
  tags?: Tag[];
};

export type UserType = Omit<User, "password" | "avatar"> & { avatar?: string };

export type TagType = Tag;

export type CommentType = Comment & { author: UserType };
