"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useGetFriendListQuery } from "@/lib/features/friend/friendApi";
import { Circle, MessageSquare, MoreVertical, Search } from "lucide-react";
import { redirect } from "next/navigation";
import { useState } from "react";
import { contacts } from "./mock";

export default function FriendList() {
  const { data } = useGetFriendListQuery();

  const [searchQuery, setSearchQuery] = useState("");

  // 根据搜索过滤好友
  const filteredContacts = contacts.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // 状态颜色映射
  const statusColors = {
    online: "text-green-500 fill-green-500",
    offline: "text-gray-400 fill-gray-400",
    busy: "text-red-500 fill-red-500",
  };

  return (
    <div className="flex flex-col  w-full max-w-sm border-r bg-white dark:bg-slate-950">
      {/* 搜索栏 */}
      <div className="p-4 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="搜索好友..."
            className="pl-9 bg-slate-50 border-none focus-visible:ring-1"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* 列表区域 */}
      <ScrollArea className="flex-1">
        <div className="px-2">
          {data?.length ? (
            <div className="space-y-1">
              {data.map((contact) => (
                <div
                  key={contact.id}
                  className="group flex items-center gap-3 p-3 rounded-xl cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
                >
                  {/* 头像及状态指示器 */}
                  <div className="relative">
                    <Avatar className="h-11 w-11 border">
                      <AvatarImage src={contact.image || ""} />
                      <AvatarFallback className="bg-slate-200">
                        {contact.name?.slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute bottom-0 right-0 p-0.5 bg-white dark:bg-slate-950 rounded-full">
                      <Circle
                        className={`h-2.5 w-2.5 ${statusColors["online" as keyof typeof statusColors]}`}
                      />
                    </div>
                  </div>

                  {/* 好友信息 */}
                  <div className="flex-1 overflow-hidden">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-sm truncate">
                        {contact.name}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground truncate italic">
                      {"hold on"}
                    </p>
                  </div>

                  {/* 悬浮操作按钮 */}
                  <div className="hidden group-hover:flex items-center gap-1">
                    <Button
                      onClick={() => redirect(`/friends/${contact.id}`)}
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-full text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                    >
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-full text-muted-foreground"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-10 text-muted-foreground">
              <p className="text-sm">未找到相关好友</p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}

// 辅助图标
function UserPlus(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <line x1="19" x2="19" y1="8" y2="14" />
      <line x1="22" x2="16" y1="11" y2="11" />
    </svg>
  );
}
