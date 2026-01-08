import Navbar from "@/components/navbar";
import NavBarContainer from "@/components/NavBarContainer";
import type { PropsWithChildren } from "react";

export default function SiteLayout({ children }: PropsWithChildren) {
  return (
    <>
      <NavBarContainer>
        <Navbar />
      </NavBarContainer>
      {children}
    </>
  );
}
