export const GET_IN_PROGRESS_TASKS = `
  query GetTasks {
    tasks(input: { status: IN_PROGRESS }) {
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