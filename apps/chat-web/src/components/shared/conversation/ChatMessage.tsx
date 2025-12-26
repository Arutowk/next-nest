"use client";

import { cn } from "@/lib/utils";
import { Message, User } from "chat-api";
import dayjs from "dayjs";
import { type RefObject, useEffect } from "react";

type ChatMessageProps = {
  localMessages: Array<Message & { user?: User }>;
  currentUserId: string;
  ref: RefObject<HTMLDivElement | null>;
};

export default function ChatMessage({
  localMessages,
  currentUserId,
  ref: scrollRef,
}: ChatMessageProps) {
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [localMessages]);

  return (
    <div
      ref={scrollRef}
      className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 custom-scrollbar"
    >
      {localMessages.map((msg) => {
        const isMe = msg.userId === currentUserId;
        return (
          <div
            key={msg.id}
            className={cn(
              "flex w-full items-end gap-2",
              isMe ? "flex-row-reverse" : "flex-row",
            )}
          >
            {/* 头像 */}
            <div className="shrink-0 w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs">
              {msg.user?.name.charAt(0)}
            </div>

            {/* 消息内容区 */}
            <div
              className={cn(
                "flex flex-col max-w-[70%]",
                isMe ? "items-end" : "items-start",
              )}
            >
              {/* 名字 */}
              {!isMe && (
                <span className="text-[10px] text-gray-500 ml-1 mb-1">
                  {msg.user?.name}
                </span>
              )}

              {/* 气泡 */}
              <div
                className={cn(
                  "px-4 py-2 rounded-2xl text-sm shadow-sm",
                  isMe
                    ? "bg-blue-600 text-white rounded-br-none"
                    : "bg-white text-gray-800 border border-gray-200 rounded-bl-none",
                )}
              >
                {msg.content}
              </div>

              {/* 时间戳 */}
              <span className="text-[10px] text-gray-400 mt-1 px-1">
                {dayjs(msg.createdAt).format("HH:mm")}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
