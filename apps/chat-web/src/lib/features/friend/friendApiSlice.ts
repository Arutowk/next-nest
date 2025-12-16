import { BACKEND_BASE_URL } from "@/lib/default";
import { UserFriend } from "@/lib/zodSchemas/addFriendSchema";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";
import { User } from "chat-api";

export const friendApiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: BACKEND_BASE_URL }),
  reducerPath: "friendApi",
  // Tag types are used for caching and invalidation.
  tagTypes: ["Friend"],
  endpoints: (build) => ({
    // Supply generics for the return type (in this case `QuotesApiResponse`)
    // and the expected query argument. If there is no argument, use `void`
    // for the argument type instead.
    searchFriend: build.query<User, UserFriend>({
      query: (body) => ({
        url: `user`,
        params: body,
      }),
      // `providesTags` determines which 'tag' is attached to the
      // cached data returned by the query.
      providesTags: (result) => [{ type: "Friend", id: result?.id! }],
    }),
  }),
});
