'use client';

import Link from 'next/link';
import { Button } from './ui/button';
import { SparklesIcon } from 'lucide-react';
import { useSession } from 'next-auth/react';

function DasboardBtn() {
  const session = useSession();
  const isLoggedIn = !!session.data?.user;
  const isCandidate = session.data?.user.role === 'CANDIDATE';

  if (!isLoggedIn || isCandidate) return null;

  return (
    <Link href={'/dashboard'}>
      <Button className="gap-2 font-medium" size={'sm'}>
        <SparklesIcon className="size-4" />
        Dashboard
      </Button>
    </Link>
  );
}
export default DasboardBtn;
