import { useParams } from "next/navigation";
import { useMemo } from "react";

export function useConversation() {
  const params = useParams();
  const conversationId = useMemo(
    () => params?.conversationId || "",
    [params?.conversationId],
  );
  const isActive = useMemo(() => !!conversationId, [conversationId]);
  return { isActive, conversationId };
}
