import { BACKEND_BASE_URL } from "@/lib/default";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Message, User } from "chat-api";

export const msgApiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `${BACKEND_BASE_URL}/msg`,
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
    },
    credentials: "include",
  }),
  reducerPath: "msgApi",
  // Tag types are used for caching and invalidation.
  tagTypes: ["Msg"],
  endpoints: (build) => ({
    getPrivateChatMessageList: build.query<
      Array<{ user: User } & Message>,
      string
    >({
      query: (id) => `friend/${id}`,
      providesTags: (result) => [{ type: "Msg" }],
    }),
  }),
});

export const { useGetPrivateChatMessageListQuery } = msgApiSlice;
