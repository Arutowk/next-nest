'use server';

import { print } from 'graphql';
import { fetchGraphQL } from '../fetchGraphQL';
import { GET_USER_BY_EMAIL, GET_USER_BY_ID } from '../graphql/user';

export const getUserByEmail = async (email: string) => {
  const result = await fetchGraphQL(print(GET_USER_BY_EMAIL), { email });
  return result.data;
};

export const getUserById = async (id: string) => {
  const result = await fetchGraphQL(print(GET_USER_BY_ID), { id });
  return result.data;
};
