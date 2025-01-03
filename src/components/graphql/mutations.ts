import { gql } from '@apollo/client';

export const UPDATE_TASK_STATUS = gql`
  mutation UpdateTask($input: UpdateTaskInput!) {
    updateTask(input: $input) {
      id
      status
    }
  }
`;

export const CREATE_TASK = gql`
  mutation CreateTask($input: CreateTaskInput!) {
    createTask(input: $input) {
      id
      name
      status
      dueDate
      pointEstimate
      assignee {
        fullName
        email
      }
      tags
    }
  }
`;

export interface CreateTaskInput {
  name: string;
  status: string;
  dueDate: string;
  pointEstimate: string;
  assignee: string;
  tags: string[];
}