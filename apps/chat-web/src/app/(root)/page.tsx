"use client";
import SignOut from "@/components/SignOut";
import { authClient } from "@/lib/auth-client";

export default function Home() {
  const { data: session } = authClient.useSession();
  const isLoggedIn = !!session?.user;
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Chat</h1>
      <h1>{session?.user.name}</h1>
      <h1>page</h1>
      {isLoggedIn && <SignOut />}
    </main>
  );
}
