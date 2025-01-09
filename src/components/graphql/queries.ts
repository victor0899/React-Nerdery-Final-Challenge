import { gql } from '@apollo/client';

export const GET_ALL_TASKS = gql`
 query GetTasks {
 tasks(input: {}) {
   id
   name
   status
   dueDate
   pointEstimate
   assignee {
     fullName
     email
     avatar
   }
   tags
 }
 }
`;

export const GET_PROFILE = gql`
 query GetProfile {
   profile {
     id
     fullName
     email
     avatar
     type
     createdAt
     updatedAt
   }
 }
`;

export const GET_USERS = gql`
  query GetUsers {
    users {
      id
      fullName
      email
      avatar
      type
    }
  }
`;