"use server";

import { BACKEND_BASE_URL } from "../default";
import { BaseSchema } from "../zodSchemas/addFriendSchema";

type AddFriendFormState =
  | {
      data: {
        email?: string;
        name?: string;
      };
      errors?: {
        email?: string[];
        name?: string[];
      };
      message?: string;
    }
  | undefined;

export async function addFriendAction(
  state: AddFriendFormState,
  formData: FormData,
): Promise<AddFriendFormState> {
  const fields = Object.fromEntries(formData.entries());
  const validatedFields = BaseSchema.safeParse(fields);
  if (!validatedFields.success)
    return {
      data: fields,
      errors: validatedFields.error.flatten().fieldErrors,
    };

  try {
    const response = await fetch(
      `${BACKEND_BASE_URL}/user/find/?email=${validatedFields.data.email}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    const friend = await response.json();
    console.log(friend);
    return {
      data: fields,
      message: "success",
    };
  } catch (error) {
    return {
      data: fields,
      message: "wrong",
    };
  }
}
