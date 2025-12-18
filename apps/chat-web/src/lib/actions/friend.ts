// "use server";

import { User } from "chat-api";
import { apiRequest } from "../utils";
import { AddFriednSchema } from "../zodSchemas/addFriendSchema";

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
      target?: User;
    }
  | undefined;

export async function searchFriendAction(
  state: AddFriendFormState,
  formData: FormData | undefined,
): Promise<AddFriendFormState> {
  if (formData === undefined) {
    return undefined;
  }

  const fields = Object.fromEntries(formData!.entries());
  const validatedFields = AddFriednSchema.safeParse(fields);
  if (!validatedFields.success)
    return {
      data: fields,
      errors: validatedFields.error.flatten().fieldErrors,
    };

  try {
    const response = await apiRequest<User>(`/user/find`, {
      params: validatedFields.data,
    });
    console.log(response);
    return {
      data: fields,
      message: "success",
      target: response,
    };
  } catch (error) {
    console.log(error);
    return {
      data: fields,
      message: "wrong",
    };
  }
}

type RequestState = {
  success: boolean;
  error: null | string;
};

export async function requestFriendAction(
  prevState: RequestState,
  friendId: string,
): Promise<RequestState> {
  console.log("friendId:", friendId);

  try {
    const response = await apiRequest(`/friend/add/${friendId}`, {
      method: "POST",
    });
    console.log("response:", response);
    return { success: true, error: null };
  } catch (e) {
    return { success: false, error: "请求失败" };
  }
}

export async function acceptFriendAction(
  prevState: RequestState,
  friendShipId: string,
): Promise<RequestState> {
  console.log("friendShipId:", friendShipId);

  try {
    const response = await apiRequest(`/friend/add/${friendShipId}`, {
      method: "POST",
    });
    console.log("response:", response);
    return { success: true, error: null };
  } catch (e) {
    return { success: false, error: "请求失败" };
  }
}

export async function refuseFriendAction(
  prevState: RequestState,
  friendShipId: string,
): Promise<RequestState> {
  console.log("friendShipId:", friendShipId);

  try {
    const response = await new Promise((resolve) => {
      setTimeout(() => {
        resolve(1);
      }, 3000);
    });
    return { success: true, error: null };
  } catch (e) {
    return { success: false, error: "请求失败" };
  }
}
