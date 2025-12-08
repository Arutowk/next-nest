import ConversationFallback from "@/components/shared/conversation/ConversationFallback";
import ItemList from "@/components/shared/sidebar/item-list/ItemList";

export default function FriendsPage() {
  return (
    <>
      <ItemList title="Friends">
        <h1>Friends Component</h1>
      </ItemList>
      <ConversationFallback />
    </>
  );
}
