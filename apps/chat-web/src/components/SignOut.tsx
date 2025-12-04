import { Button } from '@/components/ui/button';
import { logout } from '@/lib/actions/auth';

export default function SignOut() {
  return (
    <div className="flex justify-center">
      <Button variant="destructive" onClick={logout}>
        Sign Out
      </Button>
    </div>
  );
}
