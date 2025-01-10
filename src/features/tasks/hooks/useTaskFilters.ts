import { useMemo } from 'react';
import { Task } from '../types/task.types';

interface UseTaskFiltersProps {
  tasks: Task[];
}

export const useTaskFilters = ({ tasks }: UseTaskFiltersProps) => {
  const groupedTasks = useMemo(() => {
    const backlogTasks = tasks.filter(task => task.status === 'BACKLOG');
    const todoTasks = tasks.filter(task => task.status === 'TODO');
    const inProgressTasks = tasks.filter(task => task.status === 'IN_PROGRESS');
    const doneTasks = tasks.filter(task => task.status === 'DONE');
    const cancelledTasks = tasks.filter(task => task.status === 'CANCELLED');

    return {
      backlog: backlogTasks,
      todo: todoTasks,
      inProgress: inProgressTasks,
      done: doneTasks,
      cancelled: cancelledTasks
    };
  }, [tasks]);

  const taskMetrics = useMemo(() => {
    return {
      totalTasks: tasks.length,
      backlogTasks: groupedTasks.backlog.length,
      todoTasks: groupedTasks.todo.length,
      inProgressTasks: groupedTasks.inProgress.length,
      doneTasks: groupedTasks.done.length,
      cancelledTasks: groupedTasks.cancelled.length
    };
  }, [tasks, groupedTasks]);

  const tasksDistribution = useMemo(() => {
    const total = taskMetrics.totalTasks || 1; // Evitar división por cero
    return {
      backlogPercentage: (taskMetrics.backlogTasks / total) * 100,
      todoPercentage: (taskMetrics.todoTasks / total) * 100,
      inProgressPercentage: (taskMetrics.inProgressTasks / total) * 100,
      donePercentage: (taskMetrics.doneTasks / total) * 100,
      cancelledPercentage: (taskMetrics.cancelledTasks / total) * 100
    };
  }, [taskMetrics]);

  return {
    groupedTasks,
    taskMetrics,
    tasksDistribution
  };
};