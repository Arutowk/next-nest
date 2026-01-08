import { type PropsWithChildren } from "react";

import SideBar from "./site/SideBar";

type Props = PropsWithChildren;

const MobileNavbar = (props: Props) => {
  return (
    <div className="md:hidden">
      <SideBar>{props.children}</SideBar>
    </div>
  );
};

export default MobileNavbar;
