'use server';

import { print } from 'graphql';
import { fetchGraphQL } from '../fetchGraphQL';
import { Interview } from '@repo/db-codesync';
import { GET_INTERVIEWS_BY_ID } from '../graphql/interview';
import { auth } from '@/auth';

export async function getInterviewsById(id: string): Promise<Interview[]> {
  const result = await fetchGraphQL(print(GET_INTERVIEWS_BY_ID), { id });
  return result.data;
}

export async function getInterviews() {
  const session = await auth();
  if (!session?.user) return [];
  return getInterviewsById(session.user.id!);
}
