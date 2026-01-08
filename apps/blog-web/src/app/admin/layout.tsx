"use client";

import AppSidebar from "@/components/admin/app-sidebar";
import { TabProvider } from "@/hooks/use-admin-tabs";
import { type PropsWithChildren } from "react";

export default function AdminLayout({ children }: PropsWithChildren) {
  return (
    <TabProvider>
      <main className="h-screen w-screen flex  bg-[#e4e9f5] dark:bg-[#1a1a2e] transition-all duration-500">
        <AppSidebar />
        <div className="flex flex-col w-[calc(100%-100px)]">
          <div className="@container/main flex flex-1 flex-col gap-2 ml-[300px]">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              {children}
            </div>
          </div>
        </div>
      </main>
    </TabProvider>
  );
}
