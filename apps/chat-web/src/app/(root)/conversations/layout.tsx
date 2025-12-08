import ItemList from "@/components/shared/sidebar/item-list/ItemList";
import type { PropsWithChildren } from "react";

export default function ConversationsLayout({ children }: PropsWithChildren) {
  return (
    <>
      <ItemList title="Conversations">Conversations Layout</ItemList>
      {children}
    </>
  );
}
