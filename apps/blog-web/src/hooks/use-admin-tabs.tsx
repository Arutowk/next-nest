"use client";

import { MENU_ITEMS } from "@/app/admin/menu_items";
import { useRouter, useSearchParams } from "next/navigation";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  useTransition,
} from "react";

// 1. 纯数据 Context
const TabStateContext = createContext<
  | {
      activeTabId: string;
      openTabIds: string[];
      isPending: boolean;
      refreshSignals: Record<string, number>;
    }
  | undefined
>(undefined);

// 2. 纯方法 Context (引用保持不变，避免子组件重渲染)
const TabApiContext = createContext<
  | {
      openTab: (id: string) => void;
      closeTab: (id: string) => void;
      refreshCurrentTab: (id: string) => void;
    }
  | undefined
>(undefined);

export function TabProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const INITIAL_TAB = MENU_ITEMS[0]!.id;

  const activeTabId = searchParams.get("tab") || INITIAL_TAB;
  const [openTabIds, setOpenTabIds] = useState<string[]>([INITIAL_TAB]);

  const [refreshSignals, setRefreshSignals] = useState<Record<string, number>>(
    {},
  );

  const refreshCurrentTab = useCallback((id: string) => {
    setRefreshSignals((prev) => ({
      ...prev,
      [id]: Date.now(), // 使用时间戳强制触发更新
    }));
  }, []);

  const openTab = useCallback(
    (id: string) => {
      if (!openTabIds.includes(id)) {
        setOpenTabIds((prev) => [...prev, id]);
      }
      startTransition(() => {
        router.push(`?tab=${id}`, { scroll: false });
      });
    },
    [openTabIds],
  );

  const closeTab = useCallback(
    (id: string) => {
      if (id === INITIAL_TAB) return; // 禁止关闭首页
      const newTabs = openTabIds.filter((t) => t !== id);
      setOpenTabIds(newTabs);
      if (activeTabId === id && newTabs.length > 0) {
        openTab(newTabs[newTabs.length - 1]!);
      }
    },
    [openTabIds, activeTabId, openTab],
  );

  useEffect(() => {
    if (!openTabIds.includes(activeTabId)) {
      setOpenTabIds((prev) => [...prev, activeTabId]);
    }
  }, [router, activeTabId]);

  return (
    <TabApiContext.Provider value={{ openTab, closeTab, refreshCurrentTab }}>
      <TabStateContext.Provider
        value={{ activeTabId, openTabIds, isPending, refreshSignals }}
      >
        {children}
      </TabStateContext.Provider>
    </TabApiContext.Provider>
  );
}

// 自定义 Hook，方便子组件调用
export const useTabsState = () => {
  const context = useContext(TabStateContext);
  if (!context)
    throw new Error("useTabsState must be used within a TabProvider");
  return context;
};

export const useTabsAction = () => {
  const context = useContext(TabApiContext);
  if (!context)
    throw new Error("useTabsAction must be used within a TabProvider");
  return context;
};
