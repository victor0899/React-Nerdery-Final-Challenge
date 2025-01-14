import { useQuery } from '@apollo/client';
import { GET_ALL_TASKS } from '../graphql/queries';
import type { Task, TaskStatus } from '../types/task.types';
interface UseTasksOptions {
  assigneeId?: string;
  status?: TaskStatus;
  searchTerm?: string;
}

export const useTasks = (options: UseTasksOptions = {}) => {
  const { assigneeId, status, searchTerm } = options;

  const filterInput = {
    ...(assigneeId && { assigneeId }),
    ...(status && { status }),
    ...(searchTerm && { name: searchTerm })
  };

  const { data, loading, error } = useQuery<{ tasks: Task[] }>(
    GET_ALL_TASKS,
    {
      variables: { 
        input: filterInput
      },
      skip: assigneeId === undefined && options.assigneeId !== undefined
    }
  );

  return {
    tasks: data?.tasks || [],
    isLoading: loading,
    error
  };
};
