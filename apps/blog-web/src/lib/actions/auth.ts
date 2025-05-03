'use server';

import { print } from 'graphql';
import { fetchGraphQL } from '../fetchGraphQL';
import { SignUpFormState } from '../types/formState';
import { SignUpFormSchema } from '../zodSchemas/signUpFormSchema';
import { CREATE_USER_MUTATION, SIGN_IN_MUTATION } from '../graphql/user';
import { redirect } from 'next/navigation';
import { LoginFormSchema } from '../zodSchemas/loginFormSchema';
import { revalidatePath } from 'next/cache';

export async function signUp(
  state: SignUpFormState,
  formData: FormData,
): Promise<SignUpFormState> {
  const validateFields = SignUpFormSchema.safeParse(
    //formData is map
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
  redirect('/auth/signin');
}

export async function signIn(
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
  // Todo: create a session

  revalidatePath('/');
  redirect('/');
}
