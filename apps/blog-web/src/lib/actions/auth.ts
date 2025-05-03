'use server';

import { print } from 'graphql';
import { fetchGraphQL } from '../fetchGraphQL';
import { SignUpFormState } from '../types/formState';
import { SignUpFormSchema } from '../zodSchemas/signUpFormSchema';
import { CREATE_USER_MUTATION } from '../graphql/user';
import { redirect } from 'next/navigation';

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

  const data = await fetchGraphQL(print(CREATE_USER_MUTATION), {
    input: {
      ...validateFields.data,
    },
  });
  if (data.errors)
    return {
      data: Object.fromEntries(formData.entries()),
      message: 'Something went wrong',
    };
  redirect('/auth/signin');
}
