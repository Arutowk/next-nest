'use client';

import { Button } from '@/components/ui/button';
import { authClient } from '@/lib/auth-client';
import { redirect } from 'next/navigation';
import { useState } from 'react';

export default function SignOut() {
  const [pending, setPending] = useState(false);
  const logout = async () => {
    setPending(true);
    await authClient
      .signOut({
        fetchOptions: {
          onSuccess: () => {
            redirect('/'); // redirect to login page
          },
        },
      })
      .finally(() => {
        setPending(false);
      });
  };
  return (
    <Button
      type="button"
      disabled={pending}
      variant="destructive"
      onClick={logout}
    >
      {pending ? '...' : 'Sign Out'}
    </Button>
  );
}
