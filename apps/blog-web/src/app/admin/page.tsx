"use client";

import TabsManager from "@/components/admin/tab-panel";
import { useTabsAction, useTabsState } from "@/hooks/use-admin-tabs";
import { cn } from "@/lib/tiptap-utils";
import { Activity } from "react";
import { MENU_ITEMS } from "./menu_items";

export default function MultiTabManager() {
  const { activeTabId, openTabIds } = useTabsState();
  const { openTab } = useTabsAction();

  return (
    <div className="flex flex-col h-full">
      {/* 标签栏 */}
      <TabsManager />

      {/* 内容区域：使用 Activity 缓存 */}
      <main
        className={cn(
          "flex-1 relative p-6 bg-white rounded-lg shadow-sm border border-slate-200 max-h-[calc(100vh-80px)] overflow-y-auto",
          "[&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-300 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-slate-400",
        )}
      >
        {MENU_ITEMS.map((tab) => {
          // 只有被打开过的标签才会进入 Activity
          if (!openTabIds.includes(tab.id)) return null;
          return (
            <Activity
              key={tab.id}
              mode={activeTabId === tab.id ? "visible" : "hidden"}
            >
              <section className={activeTabId === tab.id ? "block" : "hidden"}>
                {tab.component}
              </section>
            </Activity>
          );
        })}
      </main>
    </div>
  );
}
