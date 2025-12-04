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
import { useActionState, useState } from 'react';

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [state, action] = useActionState(signUpAction, undefined);

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
          />
          <FieldDescription>
            {state?.errors?.email ? (
              state.errors.email.map((err, idx) => (
                <span key={idx} className="text-red-500">
                  {err + '. '}
                </span>
              ))
            ) : (
              <span>We&apos;ll use this to contact you.</span>
            )}
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
              state.errors.password.map((err, idx) => (
                <span key={idx} className="text-red-500">
                  {err + '. '}
                </span>
              ))
            ) : (
              <span>Must be at least 8 characters long.</span>
            )}
          </FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor="name">Name</FieldLabel>
          <Input defaultValue={state?.data.name} id="name" name="name" />
          <FieldDescription>
            {state?.errors?.name ? (
              state.errors.name.map((err, idx) => (
                <span key={idx} className="text-red-500">
                  {err + '. '}
                </span>
              ))
            ) : (
              <span>Please input your nickname.</span>
            )}
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
