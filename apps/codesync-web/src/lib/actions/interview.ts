'use server';

import { print } from 'graphql';
import { fetchGraphQL } from '../fetchGraphQL';
import { Interview } from '@repo/db-codesync';
import {
  CREATE_INTERVIEW,
  GET_INTERVIEWS_BY_ID,
  GET_INTERVIEWS_BY_STREAMCALLID,
} from '../graphql/interview';
import { auth } from '@/auth';
import { CreateInterview } from '../types/interview';

export async function getInterviewsById(id: string): Promise<Interview[]> {
  const result = await fetchGraphQL(print(GET_INTERVIEWS_BY_ID), { id });
  return result.data;
}

export async function getInterviews() {
  const session = await auth();
  if (!session?.user) return [];
  return getInterviewsById(session.user.id!);
}

export async function getInterviewByStreamCallId(
  streamCallId: string,
): Promise<Interview> {
  const result = await fetchGraphQL(print(GET_INTERVIEWS_BY_STREAMCALLID), {
    streamCallId,
  });
  return result.data;
}

export async function creatInterview(data: CreateInterview) {
  const result = await fetchGraphQL(print(CREATE_INTERVIEW), {
    input: { ...data },
  });
  return result.data;
}

export async function updateInterviewStatus(id: string, status: string) {}
