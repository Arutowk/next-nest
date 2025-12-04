'use client';

import SubmitButton from '@/components/SubmitButton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { signInAction } from '@/lib/actions/auth';
import { AlertCircleIcon } from 'lucide-react';
import Link from 'next/link';
import { useActionState } from 'react';

export default function SignInForm() {
  const [state, action] = useActionState(signInAction, undefined);

  return (
    <form action={action} className="flex flex-col gap-6">
      <Field>
        <FieldLabel htmlFor="email">Email</FieldLabel>
        <Input
          defaultValue={state?.data.email}
          name="email"
          id="email"
          type="email"
          placeholder="m@example.com"
        />
      </Field>
      <Field>
        <div className="flex items-center">
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <a
            href="#"
            className="ml-auto text-sm underline-offset-4 hover:underline"
          >
            Forgot your password?
          </a>
        </div>
        <Input
          name="password"
          defaultValue={state?.data.password}
          id="password"
          type="password"
        />
      </Field>
      <Field>
        <SubmitButton>Login</SubmitButton>
        {state?.message && (
          <Alert variant="destructive">
            <AlertCircleIcon />
            <AlertTitle>Unable to sign in.</AlertTitle>
            <AlertDescription>
              <p>{state?.message}</p>
            </AlertDescription>
          </Alert>
        )}
        <FieldDescription className="text-center">
          <Link href="/sign-up">Don&apos;t have an account? Sign up</Link>
        </FieldDescription>
      </Field>
    </form>
  );
}
