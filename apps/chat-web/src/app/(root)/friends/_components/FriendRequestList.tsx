"use client";

import ActionButton from "@/components/ActionButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { acceptFriendAction, refuseFriendAction } from "@/lib/actions/friend";
import { useGetAddMeListQuery } from "@/lib/features/friend/friendApi";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";
import { Check, ChevronsDownUp, ChevronsUpDown, Mail, X } from "lucide-react";
import { Activity, useState } from "react";
import { toast } from "sonner";

export default function FriendRequestList() {
  const { data, error, isLoading, isUninitialized, refetch } =
    useGetAddMeListQuery();
  const [open, setOpen] = useState(false);

  const onActionSuccess = () => {
    toast.success("已添加好友");
    refetch();
  };

  const remain =
    data?.filter((item: any) => item.status === "PENDING").length ?? 0;

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg border-muted/40 py-2 gap-1">
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle className="font-bold flex items-center gap-2">
          <Button
            variant="outline"
            type="button"
            size={"lg"}
            onClick={() => setOpen((open) => !open)}
          >
            <Mail />
            <span className="font-bold">好友申请</span>
            {open ? <ChevronsDownUp /> : <ChevronsUpDown />}
          </Button>
        </CardTitle>
        <Badge variant="secondary" className="rounded-full">
          {remain ? `${remain} 条待处理` : "没有新消息"}
        </Badge>
      </CardHeader>
      <div
        className={cn(
          "transition-[max-height,opacity] duration-500 ease-in-out overflow-hidden",
          open ? "max-h-125 opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <Activity mode={open ? "visible" : "hidden"}>
          <CardContent className="px-2 ">
            <ScrollArea className=" px-4">
              <div className="space-y-4">
                {data?.map((request) => (
                  <div
                    key={request.id}
                    className="flex flex-col space-y-3 p-3 rounded-lg border border-transparent hover:border-slate-100 hover:bg-slate-50 transition-all group"
                  >
                    <div className="flex items-start gap-3">
                      {/* 头像部分 */}
                      <Avatar className="h-12 w-12 border-2 border-background shadow-sm">
                        <AvatarImage
                          src={request.user.image!}
                          alt={request.user.name}
                        />
                        <AvatarFallback className="bg-blue-100 text-blue-700 font-medium">
                          {request.user.name.slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>

                      {/* 信息内容 */}
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-semibold leading-none">
                            {request.user.name}
                          </p>
                          <span className="text-xs text-muted-foreground">
                            {dayjs(request.createdAt).format(
                              "YYYY-MM-DD HH:mm:ss",
                            )}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {"add me please!"}
                        </p>
                      </div>
                    </div>

                    {/* 交互按钮 */}
                    {request.status === "PENDING" && (
                      <form className="flex items-center gap-2 pl-15">
                        <ActionButton
                          data={request.user.id}
                          actionFn={acceptFriendAction}
                          onSuccess={onActionSuccess}
                          className="h-8 flex-1"
                          size="sm"
                        >
                          <Check className="mr-1 h-4 w-4" /> 接受
                        </ActionButton>
                        <ActionButton
                          data={request.user.id}
                          actionFn={refuseFriendAction}
                          onSuccess={onActionSuccess}
                          className="h-8 flex-1 border-slate-200"
                          size="sm"
                          variant="outline"
                        >
                          <X className="mr-1 h-4 w-4" /> 忽略
                        </ActionButton>
                      </form>
                    )}
                    {request.status === "ACCEPTED" && (
                      <div className="flex items-center gap-2 pl-15 justify-end">
                        <Button disabled className="w-1/2">
                          已添加
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Activity>
      </div>
    </Card>
  );
}
