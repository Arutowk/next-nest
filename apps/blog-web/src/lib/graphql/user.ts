import { graphql } from "@/gql";

export const CREATE_USER_MUTATION = graphql(`
  mutation createUser($input: CreateUserInput!) {
    createUser(createUserInput: $input) {
      id
    }
  }
`);

export const SIGN_IN_MUTATION = graphql(`
  mutation signIn($input: SignInInput!) {
    signIn(signInInput: $input) {
      id
      name
      avatar
      accessToken
    }
  }
`);
