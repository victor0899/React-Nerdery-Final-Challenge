import { useMutation } from '@apollo/client';
import { CREATE_TASK, UPDATE_TASK, DELETE_TASK } from '../graphql/mutations';
import { GET_ALL_TASKS } from '../graphql/queries'; // Necesitaré ver este archivo
import type { CreateTaskInput, UpdateTaskInput } from '../types/task.types';

export const useTaskActions = () => {
  const [createTask, { loading: createLoading }] = useMutation(CREATE_TASK, {
    refetchQueries: [{ query: GET_ALL_TASKS }],
  });

  const [updateTask, { loading: updateLoading }] = useMutation(UPDATE_TASK, {
    refetchQueries: [{ query: GET_ALL_TASKS }],
  });

  const [deleteTask, { loading: deleteLoading }] = useMutation(DELETE_TASK, {
    refetchQueries: [{ query: GET_ALL_TASKS }],
  });

  const handleCreateTask = async (input: CreateTaskInput) => {
    try {
      const result = await createTask({
        variables: { input },
      });
      return result.data.createTask;
    } catch (error) {
      console.error('Error creating task:', error);
      throw error;
    }
  };

  const handleUpdateTask = async (input: UpdateTaskInput) => {
    try {
      const result = await updateTask({
        variables: { input },
      });
      return result.data.updateTask;
    } catch (error) {
      console.error('Error updating task:', error);
      throw error;
    }
  };

  const handleDeleteTask = async (id: string) => {
    try {
      await deleteTask({
        variables: { input: { id } },
      });
    } catch (error) {
      console.error('Error deleting task:', error);
      throw error;
    }
  };

  return {
    createTask: handleCreateTask,
    updateTask: handleUpdateTask,
    deleteTask: handleDeleteTask,
    isLoading: createLoading || updateLoading || deleteLoading,
  };
};