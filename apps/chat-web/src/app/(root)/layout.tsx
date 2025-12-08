import SidebarWrapper from "@/components/shared/sidebar/SidebarWrapper";
import type { PropsWithChildren } from "react";

export default function UILayout({ children }: PropsWithChildren) {
  return <SidebarWrapper>{children}</SidebarWrapper>;
}
