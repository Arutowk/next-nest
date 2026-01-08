"use client";

import TabsManager from "@/components/admin/TabPanel";
import { useTabsAction, useTabsState } from "@/hooks/use-admin-tabs";
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
      <main className="flex-1 relative">
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
