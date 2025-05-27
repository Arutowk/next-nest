'use server';

import { print } from 'graphql';
import { fetchGraphQL } from '../fetchGraphQL';
import { GET_USER_BY_EMAIL, GET_USER_BY_ID } from '../graphql/user';
import { User } from '@repo/db-codesync';

export async function getUserByEmail(email: string): Promise<User> {
  const result = await fetchGraphQL(print(GET_USER_BY_EMAIL), { email });
  return result.data;
}

export async function getUserById(id: string): Promise<User> {
  const result = await fetchGraphQL(print(GET_USER_BY_ID), { id });
  return result.data;
}
