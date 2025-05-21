'use client';

import { Button } from '@/components/ui/button';
import { Github } from '@/components/ui/github';
import { loginWithGithub } from '@/lib/actions/auth';

const GithubSignIn = () => {
  return (
    <form action={async () => loginWithGithub()}>
      <Button className="w-full" variant="outline">
        <Github />
        Continue with GitHub
      </Button>
    </form>
  );
};

export { GithubSignIn };
