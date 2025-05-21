'use client';
import { Button } from '@/components/ui/button';
import { logout } from '@/lib/actions/auth';

const SignOut = () => {
  const handleSignOut = async () => logout();

  return (
    <div className="flex justify-center">
      <Button variant="destructive" onClick={handleSignOut}>
        Sign Out
      </Button>
    </div>
  );
};

export { SignOut };
