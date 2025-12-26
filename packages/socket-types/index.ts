export type EventPayload<T, K extends keyof T> = T[K] extends (
  ...args: infer P
) => any
  ? P[0]
  : never;

export interface ChatMessage {
  content: string;
  userId: string;
  targetId: string;
}

export interface Message {
  id: string;
  content: string;
  userId: string;
  roomId: string;
  createdAt: Date;
  user: {
    email: string;
    image: string | null;
    name: string;
    id: string;
    createdAt: Date;
    emailVerified: boolean;
    updatedAt: Date;
  };
}

export interface ServerToClientEvents {
  new_message: (message: Message) => void;
  user_joined: (message: string) => void;
}

export interface ClientToServerEvents {
  join_chat: (payload: { targetUserId: string; currentUserId: string }) => void;
  send_direct_message: (payload: ChatMessage) => void;
}
