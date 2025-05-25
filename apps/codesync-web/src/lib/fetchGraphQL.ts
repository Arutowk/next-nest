import { auth } from '@/auth';
import { BACKEND_URL } from './constants';

export const fetchGraphQL = async (query: string, variables = {}) => {
  const response = await fetch(`${BACKEND_URL}/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const result = await response.json();
  if (result.errors) {
    console.error('GraphQL errors:', result.errors);
  }

  return result as { data?: any; errors?: { message: string }[] };
};

export const authFetchGraphQL = async (query: string, variables = {}) => {
  const session = await auth();

  const response = await fetch(`${BACKEND_URL}/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session?.user.accessToken}`,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const result = await response.json();
  if (result.errors) {
    console.error('GraphQL errors:', result.errors);
  }

  return result as { data?: any; errors?: { message: string }[] };
};
