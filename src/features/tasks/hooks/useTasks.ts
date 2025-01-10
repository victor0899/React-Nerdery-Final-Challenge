import { useQuery } from '@apollo/client';
import { GET_ALL_TASKS, GET_MY_TASKS } from '../graphql/queries';
import type { Task } from '../types/task.types';

interface UseTasksOptions {
  assigneeId?: string;
}

export const useTasks = (options: UseTasksOptions = {}) => {
  const { assigneeId } = options;

  const queryConfig = assigneeId 
    ? {
        query: GET_MY_TASKS,
        variables: { input: { assigneeId } }
      }
    : {
        query: GET_ALL_TASKS,
        variables: { input: {} }
      };

  const { data, loading, error } = useQuery<{ tasks: Task[] }>(
    queryConfig.query,
    {
      variables: queryConfig.variables,
      skip: assigneeId === undefined && options.assigneeId !== undefined
    }
  );

  const getTasksByStatus = (status: string) => {
    return data?.tasks.filter(task => task.status === status) || [];
  };

  return {
    tasks: data?.tasks || [],
    getTasksByStatus,
    isLoading: loading,
    error
  };
};