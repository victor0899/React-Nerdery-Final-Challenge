import { useMutation } from '@apollo/client';
import { CREATE_TASK, UPDATE_TASK, DELETE_TASK } from '../graphql/mutations';
import { GET_ALL_TASKS, GET_MY_TASKS } from '../graphql/queries';
import type { CreateTaskInput, UpdateTaskInput } from '../types/task.types';
import { useNotification } from '../../../shared/context/notificationContext';

export const useTaskActions = (assigneeId?: string) => {
  const { addNotification } = useNotification(); 
  const getRefetchQueries = () => {
    const queries = [
      { 
        query: GET_ALL_TASKS,
        variables: { input: {} }
      }
    ];

    if (assigneeId) {
      queries.push({
        query: GET_MY_TASKS,
        variables: { input: { assigneeId } }
      });
    }

    return queries;
  };

  const [createTask, { loading: createLoading }] = useMutation(CREATE_TASK, {
    refetchQueries: getRefetchQueries(),
  });

  const [updateTask, { loading: updateLoading }] = useMutation(UPDATE_TASK, {
    refetchQueries: getRefetchQueries(),
  });

  const [deleteTask, { loading: deleteLoading }] = useMutation(DELETE_TASK, {
    refetchQueries: getRefetchQueries(),
  });

  const handleCreateTask = async (input: CreateTaskInput) => {
    try {
      const result = await createTask({
        variables: { 
          input: {
            ...input,
            status: 'BACKLOG' 
          } 
        },
      });
      addNotification('Task created successfully!', 'success'); // Notificación de éxito
      return result.data.createTask;
    } catch (error) {
      addNotification('Error creating task. Please try again.', 'error'); // Notificación de error
      console.error('Error creating task:', error);
      throw error;
    }
  };

  const handleUpdateTask = async (input: UpdateTaskInput) => {
    try {
      const result = await updateTask({
        variables: { input },
      });
      addNotification('Task updated successfully!', 'success'); // Notificación de éxito
      return result.data.updateTask;
    } catch (error) {
      addNotification('Error updating task. Please try again.', 'error'); // Notificación de error
      console.error('Error updating task:', error);
      throw error;
    }
  };

  const handleDeleteTask = async (id: string) => {
    try {
      await deleteTask({
        variables: { input: { id } },
      });
      addNotification('Task deleted successfully!', 'success'); // Notificación de éxito
    } catch (error) {
      addNotification('Error deleting task. Please try again.', 'error'); // Notificación de error
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