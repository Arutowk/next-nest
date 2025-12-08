import type { PropsWithChildren } from "react";

import ItemList from "@/components/shared/sidebar/item-list/ItemList";

export default function ConversationsLayout({ children }: PropsWithChildren) {
  return (
    <>
      <ItemList title="Conversations">Conversations Layout</ItemList>
      {children}
    </>
  );
}
