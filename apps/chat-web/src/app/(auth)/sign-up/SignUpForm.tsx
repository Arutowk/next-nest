'use client';

import SubmitButton from '@/components/SubmitButton';
import { Button } from '@/components/ui/button';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { signUpAction } from '@/lib/actions/auth';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import Link from 'next/link';
import { useActionState, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { redirect } from 'next/navigation';

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [state, action, isPending] = useActionState(signUpAction, undefined);

  useEffect(() => {
    if (state?.message === 'success') {
      toast.success('Signup successful!');
      redirect('/sign-in');
    } else {
      state?.errors && toast.info('Please fix the errors and try again.');
      state?.message && toast.error(state?.message);
    }
  }, [state]);

  return (
    <form action={action}>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            defaultValue={state?.data.email}
            id="email"
            type="email"
            name="email"
            placeholder="m@example.com"
            disabled={isPending}
          />
          <FieldDescription>
            {state?.errors?.email ? (
              <span className="text-red-500">{state.errors.email[0]}</span>
            ) : null}
          </FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <div className="relative">
            <Input
              defaultValue={state?.data.password}
              name="password"
              id="password"
              type={showPassword ? 'text' : 'password'}
              disabled={isPending}
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? (
                <EyeIcon className="h-4 w-4" aria-hidden="true" />
              ) : (
                <EyeOffIcon className="h-4 w-4" aria-hidden="true" />
              )}
              <span className="sr-only">
                {showPassword ? 'Hide password' : 'Show password'}
              </span>
            </Button>
          </div>
          <FieldDescription>
            {state?.errors?.password ? (
              <span className="text-red-500">{state.errors.password[0]}</span>
            ) : null}
          </FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor="name">Name</FieldLabel>
          <Input
            defaultValue={state?.data.name}
            id="name"
            name="name"
            disabled={isPending}
          />
          <FieldDescription>
            {state?.errors?.name ? (
              <span className="text-red-500">{state.errors.name[0]}</span>
            ) : null}
          </FieldDescription>
        </Field>
        <FieldGroup>
          <Field>
            <SubmitButton>Create Account</SubmitButton>
            <FieldDescription className="px-6 text-center">
              Already have an account? <Link href="/sign-in">Sign in</Link>
            </FieldDescription>
          </Field>
        </FieldGroup>
      </FieldGroup>
    </form>
  );
}
