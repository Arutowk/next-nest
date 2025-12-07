import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query';

import type { User } from 'chat-api';

import { BACKEND_BASE_URL } from '@/lib/default';

export const authApiSlice = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${BACKEND_BASE_URL}/user` }),

  endpoints: (builder) => ({
    createUser: builder.mutation<User, Pick<User, 'email' | 'name'>>({
      query: (user) => ({
        url: '/create',
        params: { ...user },
      }),
    }),
  }),
});

export const { createUser } = authApiSlice.endpoints;
