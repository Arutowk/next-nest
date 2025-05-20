import { type JSONContent } from '@tiptap/react';

export type SignUpFormState =
  | {
      data: {
        name?: string;
        email?: string;
        password?: string;
      };
      errors?: {
        name?: string[];
        email?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;

export type CreateCommentFormState =
  | {
      data?: {
        content?: string;
        postId?: number;
      };
      errors?: {
        content?: string[];
      };
      message?: string;
      ok?: boolean;
    }
  | undefined;

export type PostFormState =
  | {
      data?: {
        postId?: number;
        title?: string;
        content?: string | JSONContent;
        thumbnail?: File | null;
        tags?: string;
        published?: string;
        previousThumbnailUrl?: string;
      };

      errors?: {
        title?: string[];
        content?: string[];
        thumbnail?: string[];
        tags?: string[];
        published?: string[];
      };
      message?: string;
      ok?: boolean;
    }
  | undefined;
