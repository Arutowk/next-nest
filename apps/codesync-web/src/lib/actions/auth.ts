'use server';

import { signIn, signOut } from '@/auth';

export const loginWithGithub = async () => {
  await signIn('github', { redirectTo: '/' });
};

export const logout = async () => {
  await signOut({ redirectTo: '/sign-in' });
};

export const signInAction = async (formData: FormData) => {};

export const signUpAction = async (formData: FormData) => {};
