"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { fetchGraphQL } from "../fetchGraphQL";
import { CREATE_USER_MUTATION, SIGN_IN_MUTATION } from "../graphql/user";
import { createSession } from "../session";
import { type SignUpFormState } from "../types/formState";
import { LoginFormSchema } from "../zodSchemas/loginFormSchema";
import { SignUpFormSchema } from "../zodSchemas/signUpFormSchema";

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

  const result = await fetchGraphQL(CREATE_USER_MUTATION, {
    input: {
      ...validateFields.data,
    },
  });
  if (result.errors)
    return {
      data: Object.fromEntries(formData.entries()),
      message:
        result.errors.map((item) => item.message).join(",") ||
        "Something went wrong",
    };
  redirect("/auth/signin");
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

  const result = await fetchGraphQL(SIGN_IN_MUTATION, {
    input: {
      ...validatedFields.data,
    },
  });

  if (result.errors) {
    return {
      data: Object.fromEntries(formData.entries()),
      message:
        result.errors.map((item) => item.message).join(",") ||
        "Invalid Credentials",
    };
  }
  // create a session
  await createSession({
    user: {
      id: result.data.signIn.id.toString(),
      name: result.data.signIn.name,
      avatar: result.data.signIn.avatar as string,
    },
    accessToken: result.data.signIn.accessToken,
  });

  revalidatePath("/");
  redirect("/");
}
