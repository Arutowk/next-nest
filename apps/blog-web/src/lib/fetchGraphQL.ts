import { type TypedDocumentNode } from "@graphql-typed-document-node/core";
import { print } from "graphql";

import { BACKEND_URL } from "./constants";
import { getSession } from "./session";

export async function fetchGraphQL<TResult, TVariables>(
  query: TypedDocumentNode<TResult, TVariables>,
  variables: TVariables extends Record<string, never> ? {} : TVariables,
) {
  const response = await fetch(`${BACKEND_URL}/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: print(query),
      variables,
    }),
  });

  const result = await response.json();
  if (result.errors) {
    console.error("GraphQL errors:", result.errors);
  }

  return result as { data?: TResult; errors?: { message: string }[] };
}

export async function authFetchGraphQL<TResult, TVariables>(
  query: TypedDocumentNode<TResult, TVariables>,
  variables: TVariables extends Record<string, never> ? {} : TVariables,
) {
  const session = await getSession();
  const response = await fetch(`${BACKEND_URL}/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.accessToken}`,
    },
    body: JSON.stringify({
      query: print(query),
      variables,
    }),
  });

  const result = await response.json();
  if (result.errors) {
    console.error("GraphQL errors:", result.errors);
  }

  return result as { data?: TResult; errors?: { message: string }[] };
}
