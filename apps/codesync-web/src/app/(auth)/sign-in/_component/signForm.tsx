'use client';

import SubmitButton from '@/components/SubmitButton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { SignUpFormState } from '@/lib/types/formState';
import { AlertCircleIcon } from 'lucide-react';
import { useActionState } from 'react';

type Props = {
  text: string;
  formAction: (
    state: SignUpFormState,
    formData: FormData,
  ) => Promise<SignUpFormState>;
};
const SignForm = ({ formAction, text }: Props) => {
  const [state, action] = useActionState(formAction, undefined);
  return (
    <form className="space-y-4" action={action}>
      {text === 'Sign Up' && (
        <Input
          name="name"
          placeholder="Name"
          required
          defaultValue={state?.data.name}
        />
      )}
      {text === 'Sign Up' && !!state?.errors?.name && (
        <p className="text-red-500 text-sm">{state.errors.name}</p>
      )}
      <Input
        name="email"
        placeholder="Email"
        type="email"
        required
        autoComplete="email"
        defaultValue={state?.data.email}
      />
      {!!state?.errors?.email && (
        <p className="text-red-500 text-sm">{state.errors.email}</p>
      )}
      <Input
        name="password"
        placeholder="Password"
        type="password"
        required
        autoComplete="current-password"
        defaultValue={state?.data.password}
      />
      {!!state?.errors?.password && (
        <p className="text-red-500 text-sm">{state.errors.password}</p>
      )}
      {state?.message && (
        <Alert variant="destructive">
          <AlertCircleIcon />
          <AlertTitle>Unable to sign in.</AlertTitle>
          <AlertDescription>
            <p>{state?.message}</p>
          </AlertDescription>
        </Alert>
      )}
      <SubmitButton className="w-full">{text}</SubmitButton>
    </form>
  );
};

export default SignForm;
