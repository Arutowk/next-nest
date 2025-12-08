import type { PropsWithChildren } from "react";

import SidebarWrapper from "@/components/shared/sidebar/SidebarWrapper";

export default function UILayout({ children }: PropsWithChildren) {
  return <SidebarWrapper>{children}</SidebarWrapper>;
}
