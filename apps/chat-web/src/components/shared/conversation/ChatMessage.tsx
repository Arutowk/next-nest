"use client";

import { cn } from "@/lib/utils";
import { Message, User } from "chat-api";
import { type RefObject, useEffect, useState } from "react";

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
  const [user, setUser] = useState(currentUserId);

  useEffect(() => {
    if (currentUserId) setUser(currentUserId);
  }, [currentUserId]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [localMessages]);

  return (
    <div
      ref={scrollRef}
      className="h-[100%-75px] flex-1 overflow-y-auto p-4 space-y-4 bg-orange-700 custom-scrollbar"
    >
      {localMessages.map((msg) => {
        const isMe = msg.userId === user;
        return (
          <div key={msg.id}>
            <div className={cn(isMe ? "text-right" : "text-left")}>
              {msg.user?.name}
            </div>
            <div className="w-full h-20 relative">
              <div
                className={cn(
                  "absolute  w-70 h-20",
                  isMe ? "right-5 left-auto" : "left-5 right-auto",
                )}
              >
                <div
                  className={cn(
                    "relative w-full h-full flex",
                    isMe ? "flex-row-reverse ml-auto" : "flex-row mr-auto",
                  )}
                >
                  {/* 背景层容器 - 负责形状、颜色和动画 */}
                  <div
                    className={cn(
                      "absolute inset-0 z-0 transition-transform duration-300",
                      isMe ? "scale-x-[-1]" : "", // 左右对称的核心：镜像翻转
                    )}
                  >
                    {/* 白色箭头 */}
                    <div
                      className={cn(
                        "absolute w-6 h-6 top-10 -left-4.25 z-10",
                        "clip-arrow-white",
                        "animate-arrow-white-shake",
                        isMe ? "bg-black" : "bg-white",
                      )}
                    ></div>
                    {/* 黑色箭头 */}
                    <div
                      className={cn(
                        "absolute w-7 h-5 top-10 -left-4.25 z-20",
                        "clip-arrow-black",
                        "animate-arrow-black-shake",
                        isMe ? "bg-white" : "bg-black",
                      )}
                    ></div>
                    {/* 白色背景 */}
                    <div
                      className={cn(
                        "absolute w-75 h-20 z-0",
                        "clip-background-white",
                        "animate-background-white-shake",
                        isMe ? "bg-black" : "bg-white",
                      )}
                    ></div>
                    {/* 黑色背景 */}
                    <div
                      className={cn(
                        "absolute w-70 h-17 ml-1 mr-5 mt-1 mb-2 z-5",
                        "clip-background-black",
                        "animate-background-black-shake",
                        isMe ? "bg-white" : "bg-black",
                      )}
                    ></div>
                  </div>
                  {/* 对话内容 */}
                  <div
                    className={cn(
                      "relative z-30",
                      " text-xl  leading-[1.2em]",
                      "ml-1 mr-1.25 mt-1.25 mb-1.75 pl-5.5 pr-5.5 pt-3.75 pb-5",
                      isMe ? "text-black" : "text-white",
                    )}
                  >
                    {msg.content}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
