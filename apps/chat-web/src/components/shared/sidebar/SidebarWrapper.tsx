import type { PropsWithChildren } from "react";

import DesktopNav from "./nav/DesktopNav";
import MobileNav from "./nav/MobileNav";

export default function SidebarWrapper({ children }: PropsWithChildren) {
  return (
    <div className="h-[calc(100%-32px)] w-full p-4 flex flex-col lg:flex-row gap-4 ">
      <DesktopNav />
      <MobileNav />
      <div className="h-[calc(100%-80px)] lg:h-full w-full flex gap-4 ">
        {children}
      </div>
    </div>
  );
}
