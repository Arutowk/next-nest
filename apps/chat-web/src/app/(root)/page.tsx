import Image from 'next/image';
import { auth } from '../auth';
import SignOut from '@/components/SignOut';

export default async function Home() {
  const session = await auth();
  const isLoggedIn = !!session?.user;
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Chat</h1>
      <h1>page</h1>
      <h1>{JSON.stringify(session)}</h1>
      {isLoggedIn && <SignOut />}
    </main>
  );
}
