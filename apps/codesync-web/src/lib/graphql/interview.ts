import gql from 'graphql-tag';

export const GET_INTERVIEWS_BY_ID = gql`
  mutation getInterviewsById($id: ID!) {
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
