import { gql } from '@apollo/client';

export const CREATE_TASK = gql`
  mutation CreateTask($input: CreateTaskInput!) {
    createTask(input: $input) {
      id
      name
      status
      dueDate
      pointEstimate
      assignee {
        id
        fullName
        avatar
      }
      creator {
        id
        fullName
      }
      position
      tags
      createdAt
    }
  }
`;

export const UPDATE_TASK = gql`
  mutation UpdateTask($input: UpdateTaskInput!) {
    updateTask(input: $input) {
      id
      status
    }
  }
`;

export const DELETE_TASK = gql`
  mutation DeleteTask($input: DeleteTaskInput!) {
    deleteTask(input: $input) {
      id
    }
  }
`;

export interface DeleteTaskInput {
  id: string;
}

export interface CreateTaskInput {
  name: string;
  status: string;
  dueDate: string;
  pointEstimate: string;
  assignee: string;
  tags: string[];
}