'use server';

import { signIn, signOut } from '@/app/auth';
import { DEFAULT_LOGIN_REDIRECT } from '@/app/routeConfig';
import { SignFormState } from '../types/formState';
import { AuthError } from 'next-auth';
import { LoginFormSchema } from '../zodSchemas/loginFormSchema';
import { SignUpFormSchema } from '../zodSchemas/signUpFormSchema';
import { redirect } from 'next/navigation';
import { BACKEND_BASE_URL } from '../features/baseUrl';

export const loginWithGithub = async () => {
  await signIn('github', { redirectTo: '/' });
};

export const loginWithGoogle = async () => {
  await signIn('google', { redirectTo: '/' });
};

export const logout = async () => {
  await signOut({ redirectTo: '/sign-in' });
};

export async function signInAction(
  state: SignFormState,
  formData: FormData,
): Promise<SignFormState> {
  const validatedFields = LoginFormSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!validatedFields.success)
    return {
      data: Object.fromEntries(formData.entries()),
      errors: validatedFields.error.flatten().fieldErrors,
    };
  const { email, password } = validatedFields.data;
  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return {
            data: Object.fromEntries(formData.entries()),
            message: 'Invalid credentials',
          };
        default:
          return {
            data: Object.fromEntries(formData.entries()),
            message: 'Something went wrong',
          };
      }
    }
    throw error;
  }
}

export async function signUpAction(
  state: SignFormState,
  formData: FormData,
): Promise<SignFormState> {
  const validateFields = SignUpFormSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );
  if (!validateFields.success)
    return {
      data: Object.fromEntries(formData.entries()),
      errors: validateFields.error.flatten().fieldErrors,
    };

  const result = await fetch(`${BACKEND_BASE_URL}/user/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...validateFields.data,
    }),
  })
    .then((res) => res.json())
    .catch(() => ({ errors: [{ message: 'Network error' }] }));

  if (result.errors)
    return {
      data: Object.fromEntries(formData.entries()),
      message:
        result.errors
          .map((item: { message: string }) => item.message)
          .join(',') || 'Something went wrong',
    };
  redirect('/sign-in');
}
