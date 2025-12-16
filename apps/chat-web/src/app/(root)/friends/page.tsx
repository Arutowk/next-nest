import ConversationFallback from "@/components/shared/conversation/ConversationFallback";
import ItemList from "@/components/shared/sidebar/item-list/ItemList";
import AddFriendDialog from "./_components/AddFriendDialog";

export default function FriendsPage() {
  return (
    <>
      <ItemList title="Friends" action={<AddFriendDialog />}>
        <h1>Friends Component</h1>
      </ItemList>
      <ConversationFallback />
    </>
  );
}
