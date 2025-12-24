import type { PropsWithChildren } from "react";

import { Card } from "@/components/ui/card";

export default function ConversationContainer({ children }: PropsWithChildren) {
  return (
    <Card className="w-full h-[calc(100svh-32px)] lg:h-full p-2 flex flex-col gap-2">
      {children}
    </Card>
  );
}
