"use client";

import { useSocket } from "@/components/provider/socket-provider";
import ChatMessage from "@/components/shared/conversation/ChatMessage";
import ConversationContainer from "@/components/shared/conversation/ConversationContainer";
import MessageInput from "@/components/shared/conversation/MessageInput";
import { authClient } from "@/lib/auth-client";
import { useGetPrivateChatMessageListQuery } from "@/lib/features/msg/msgApi";
import { Message, User } from "chat-api";
import dayjs from "dayjs";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

export default function PrivateChatPage() {
  const { data } = authClient.useSession();
  const currentUserId = data?.session.userId!;
  const params = useParams();
  const friendId = params.friendId as string;
  // 生成与后端一致的 roomId
  const roomId = [currentUserId, friendId].sort().join("_");

  const { socket, isConnected } = useSocket();
  const { data: messagesData } = useGetPrivateChatMessageListQuery(friendId);
  const [messages, setMessages] = useState<Array<Message & { user?: User }>>(
    [],
  );
  const inputRef = useRef<HTMLInputElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (messagesData) {
      console.log("messagesData:", messagesData);

      setMessages(messagesData);
    }
  }, [messagesData]);

  useEffect(() => {
    if (!socket) return;

    // 监听新消息
    socket.on("new_message", (data) => {
      // 如果这条消息的发送者是我自己，就不再重复添加到列表
      if (data.userId === currentUserId) return;
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off("new_message");
    };
  }, [socket, currentUserId]);

  const onNewMessage = useCallback(
    (content: string) => {
      setMessages((prev) => [
        ...prev,
        {
          id: dayjs().valueOf().toString(),
          userId: currentUserId,
          createdAt: new Date(),
          content,
          roomId,
        },
      ]);
      console.log("content:", content);

      socket?.emit("send_direct_message", {
        targetId: friendId,
        content,
        userId: currentUserId,
      });
    },
    [socket, currentUserId, friendId],
  );

  return (
    <ConversationContainer>
      <div>
        {/* 渲染消息列表和输入框 */}
        <ChatMessage
          localMessages={messages}
          currentUserId={currentUserId}
          ref={scrollRef}
        />
        <MessageInput sendMessage={onNewMessage} ref={inputRef} />
      </div>
    </ConversationContainer>
  );
}
