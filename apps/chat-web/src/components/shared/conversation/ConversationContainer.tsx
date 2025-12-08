import { Card } from "@/components/ui/card";
import type { PropsWithChildren } from "react";

export default function ConversationContainer({ children }: PropsWithChildren) {
  return (
    <Card className="w-full h-[calc(100svh-32px)] lg:h-full p-2 flex flex-col gap-2">
      <h1>ConversationContainer Component</h1>
      {children}
    </Card>
  );
}
