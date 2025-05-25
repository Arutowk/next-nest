'use server';

import { print } from 'graphql';
import { signIn, signOut } from '@/auth';
import { SignUpFormState } from '../types/formState';
import { SignUpFormSchema } from '../zodSchemas/signUpFormSchema';
import { fetchGraphQL } from '../fetchGraphQL';
import { CREATE_USER_MUTATION, SIGN_IN_MUTATION } from '../graphql/user';
import { redirect } from 'next/navigation';
import { LoginFormSchema } from '../zodSchemas/loginFormSchema';

export const loginWithGithub = async () => {
  await signIn('github', { redirectTo: '/' });
};

export const logout = async () => {
  await signOut({ redirectTo: '/sign-in' });
};

export async function signUpAction(
  state: SignUpFormState,
  formData: FormData,
): Promise<SignUpFormState> {
  const validateFields = SignUpFormSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );
  if (!validateFields.success)
    return {
      data: Object.fromEntries(formData.entries()),
      errors: validateFields.error.flatten().fieldErrors,
    };

  const result = await fetchGraphQL(print(CREATE_USER_MUTATION), {
    input: {
      ...validateFields.data,
    },
  });
  if (result.errors)
    return {
      data: Object.fromEntries(formData.entries()),
      message:
        result.errors.map((item) => item.message).join(',') ||
        'Something went wrong',
    };
  redirect('/sign-in');
}

export async function signInAction(
  state: SignUpFormState,
  formData: FormData,
): Promise<SignUpFormState> {
  const validatedFields = LoginFormSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!validatedFields.success)
    return {
      data: Object.fromEntries(formData.entries()),
      errors: validatedFields.error.flatten().fieldErrors,
    };

  const result = await fetchGraphQL(print(SIGN_IN_MUTATION), {
    input: {
      ...validatedFields.data,
    },
  });

  if (result.errors) {
    return {
      data: Object.fromEntries(formData.entries()),
      message:
        result.errors.map((item) => item.message).join(',') ||
        'Invalid Credentials',
    };
  }
}
