import gql from 'graphql-tag';

export const CREATE_INTERVIEW = gql`
  mutation createInterview($input: CreateInterviewInput!) {
    createInterview(createInterviewInput: $input) {
      id
    }
  }
`;

export const GET_INTERVIEWS_BY_ID = gql`
  query getInterviewsById($id: ID!) {
    getInterviewsById(id: $id) {
      id
      title
      description
      status
      startTime
      endTime
      createdAt
    }
  }
`;

export const GET_INTERVIEWS_BY_STREAMCALLID = gql`
  query getInterviewByStreamCallId($streamCallId: String!) {
    getInterviewByStreamCallId(streamCallId: $streamCallId) {
      id
      title
      description
      status
      startTime
      endTime
      createdAt
    }
  }
`;
