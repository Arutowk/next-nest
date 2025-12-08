"use client";

import type { PropsWithChildren, ReactNode } from "react";

import { Card } from "@/components/ui/card";
import { useConversation } from "@/lib/hooks/useConversation";
import { cn } from "@/lib/utils";

type ItemListProps = {
  title: string;
  action?: ReactNode;
};

export default function ItemList({
  title,
  action: Action,
  children,
}: PropsWithChildren<ItemListProps>) {
  const { isActive } = useConversation();
  return (
    <Card
      className={cn("hidden h-full w-full lg:flex-none lg:w-80 p-2", {
        //小屏时，激活了对话不显示列表，否则显示
        block: !isActive,
        //大屏时
        "lg:block": isActive,
      })}
    >
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        {Action ? Action : null}
      </div>
      <div className="w-full h-full flex flex-col items-center justify-start gap-2">
        {children}
      </div>
    </Card>
  );
}
