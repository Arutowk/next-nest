import type { PropsWithChildren } from "react";

import { SocketProvider } from "@/components/provider/socket-provider";
import SidebarWrapper from "@/components/shared/sidebar/SidebarWrapper";

export default function UILayout({ children }: PropsWithChildren) {
  return (
    <SocketProvider>
      <SidebarWrapper>{children}</SidebarWrapper>
    </SocketProvider>
  );
}
