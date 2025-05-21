'use server';

import { signIn, signOut } from '@/lib/auth';

export const loginWithGithub = async () => {
  await signIn('github', { redirectTo: '/' });
};

export const logout = async () => {
  await signOut({ redirectTo: '/' });
};

export const signInAction = async (formData: FormData) => {};

export const signUpAction = async (formData: FormData) => {};
