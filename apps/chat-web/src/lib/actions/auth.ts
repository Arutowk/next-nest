'use server';

import { SignFormState } from '../types/formState';
import { LoginFormSchema } from '../zodSchemas/loginFormSchema';
import { SignUpFormSchema } from '../zodSchemas/signUpFormSchema';
import { APIError } from 'better-auth';
import { auth } from '../auth';
import { headers } from 'next/headers';

export async function signInAction(
  state: SignFormState,
  formData: FormData,
): Promise<SignFormState> {
  const fields = Object.fromEntries(formData.entries());
  const validatedFields = LoginFormSchema.safeParse(fields);

  if (!validatedFields.success)
    return {
      data: fields,
      errors: validatedFields.error.flatten().fieldErrors,
    };

  try {
    const result = await auth.api.signInEmail({
      body: { ...validatedFields.data },
      headers: await headers(),
    });
    console.log('result:', result);
    return {
      data: fields,
      message: 'success',
    };
  } catch (error) {
    if (error instanceof APIError) {
      return {
        data: fields,
        message: error.message,
      };
    }
  }
}

export async function signUpAction(
  state: SignFormState,
  formData: FormData,
): Promise<SignFormState> {
  const fields = Object.fromEntries(formData.entries());
  const validateFields = SignUpFormSchema.safeParse(fields);
  if (!validateFields.success)
    return {
      data: fields,
      errors: validateFields.error.flatten().fieldErrors,
    };

  try {
    await auth.api.signUpEmail({
      body: {
        ...validateFields.data,
      },
    });
    return {
      data: fields,
      message: 'success',
    };
  } catch (error) {
    if (error instanceof APIError) {
      return {
        data: fields,
        message: error.message,
      };
    }
  }
}
