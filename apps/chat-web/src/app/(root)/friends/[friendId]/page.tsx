"use client";

import { useSocket } from "@/components/provider/socket-provider";
import ChatMessage from "@/components/shared/conversation/ChatMessage";
import ConversationContainer from "@/components/shared/conversation/ConversationContainer";
import MessageInput from "@/components/shared/conversation/MessageInput";
import { authClient } from "@/lib/auth-client";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

export default function PrivateChatPage() {
  const { data } = authClient.useSession();
  const currentUserId = data?.session.id!;
  const params = useParams();
  const friendId = params.friendId as string;
  // 生成与后端一致的 roomId
  const roomId = [currentUserId, friendId].sort().join("_");

  const { socket, isConnected } = useSocket();
  const [messages, setMessages] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!socket) return;

    // 监听新消息
    socket.on("new_message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off("new_message");
    };
  }, [socket]);

  const onNewMessage = useCallback(
    (content: string) => {
      setMessages((prev) => [...prev, content]);
      socket?.emit("send_direct_message", {
        roomId,
        content,
        senderId: currentUserId,
      });
    },
    [socket, currentUserId, friendId],
  );

  return (
    <ConversationContainer>
      <div>
        {/* 渲染消息列表和输入框 */}
        <p>user:{currentUserId}</p>
        <p>friend:{friendId}</p>
        <ChatMessage localMessages={messages} />
        <MessageInput sendMessage={onNewMessage} ref={inputRef} />
      </div>
    </ConversationContainer>
  );
}
