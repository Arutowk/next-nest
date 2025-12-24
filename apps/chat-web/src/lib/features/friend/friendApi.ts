import { BACKEND_BASE_URL } from "@/lib/default";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Friendship, User } from "chat-api";

export const friendApiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `${BACKEND_BASE_URL}/friend`,
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
    },
    credentials: "include",
  }),
  reducerPath: "friendApi",
  // Tag types are used for caching and invalidation.
  tagTypes: ["Friend"],
  endpoints: (build) => ({
    // Supply generics for the (1)return type and the (2)expected query argument.
    // If there is no argument, use `void`for the argument type instead.
    getAddMeList: build.query<Array<{ user: User } & Friendship>, void>({
      query: () => "addMeList",
      // `providesTags` determines which 'tag' is attached to the
      // cached data returned by the query.
      providesTags: (result) => [{ type: "Friend" }],
    }),
    getFriendList: build.query<User[], void>({
      query: () => "",
      providesTags: (result) => [{ type: "Friend" }],
    }),
  }),
});

export const { useGetAddMeListQuery, useGetFriendListQuery } = friendApiSlice;
