import { authClient } from "../auth-client";
import { InfoState, type SignFormState } from "../types/formState";

import { LoginFormSchema } from "../zodSchemas/loginFormSchema";
import { SignUpFormSchema } from "../zodSchemas/signUpFormSchema";

export async function signInAction(
  state: SignFormState,
  formData: FormData,
): Promise<SignFormState> {
  if (state?.message === InfoState.SUCCESS) return state;

  const fields = Object.fromEntries(formData.entries());
  const validatedFields = LoginFormSchema.safeParse(fields);

  if (!validatedFields.success)
    return {
      data: fields,
      errors: validatedFields.error.flatten().fieldErrors,
      message: InfoState.VALID,
    };

  const { data, error } = await authClient.signIn.email({
    ...validatedFields.data,
  });
  console.log(data);
  if (error)
    return {
      data: fields,
      message: error.message || InfoState.FAILED,
    };
  else
    return {
      data: fields,
      message: InfoState.SUCCESS,
    };
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
      message: InfoState.VALID,
    };

  const { data, error } = await authClient.signUp.email(validateFields.data);
  console.log(data);
  if (error)
    return {
      data: fields,
      message: error.message || InfoState.FAILED,
    };
  else
    return {
      data: fields,
      message: InfoState.SUCCESS,
    };
}
