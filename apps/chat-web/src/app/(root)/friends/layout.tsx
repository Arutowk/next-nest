import ItemList from "@/components/shared/sidebar/item-list/ItemList";
import type { PropsWithChildren } from "react";
import AddFriendDialog from "./_components/AddFriendDialog";
import FriendList from "./_components/FriendList";
import FriendRequestList from "./_components/FriendRequestList";

export default function FriendLayout({ children }: PropsWithChildren<void>) {
  return (
    <>
      <ItemList title="Friends" action={<AddFriendDialog />}>
        <FriendList />
        <FriendRequestList />
      </ItemList>
      {children}
    </>
  );
}
