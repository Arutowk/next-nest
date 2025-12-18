import ConversationFallback from "@/components/shared/conversation/ConversationFallback";
import ItemList from "@/components/shared/sidebar/item-list/ItemList";
import AddFriendDialog from "./_components/AddFriendDialog";
import FriendRequestList from "./_components/FriendRequestList";

export default function FriendsPage() {
  return (
    <>
      <ItemList title="Friends" action={<AddFriendDialog />}>
        <FriendRequestList />
      </ItemList>
      <ConversationFallback />
    </>
  );
}
