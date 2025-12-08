import ConversationContainer from "@/components/shared/conversation/ConversationContainer";

type PageProps = {
  propName?: string;
};

export default function ConversationPage({ propName }: PageProps) {
  return <ConversationContainer>Id page Component</ConversationContainer>;
}
