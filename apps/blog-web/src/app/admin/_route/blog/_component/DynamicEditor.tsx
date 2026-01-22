"use client";

import dynamic from "next/dynamic";

export const Editor = dynamic(() => import("@/components/blog-editor"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-gray-100 animate-pulse rounded-lg" />
  ),
});
