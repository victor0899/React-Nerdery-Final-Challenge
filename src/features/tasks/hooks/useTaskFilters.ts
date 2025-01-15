import { useMemo } from 'react';
import { Task } from '../types/task.types';

interface UseTaskFiltersProps {
  tasks: Task[];
  searchTerm?: string;
  status?: string;
}

export const useTaskFilters = ({ tasks, searchTerm, status }: UseTaskFiltersProps) => {
  const filteredTasks = useMemo(() => {
    let filtered = [...tasks];

    if (status) {
      filtered = filtered.filter(task => task.status === status);
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase().trim();
      filtered = filtered.filter(task => 
        task.name.toLowerCase().includes(term)
      );
    }

    return filtered;
  }, [tasks, searchTerm, status]);

  const groupedTasks = useMemo(() => ({
    backlog: filteredTasks.filter(task => task.status === 'BACKLOG'),
    todo: filteredTasks.filter(task => task.status === 'TODO'),
    inProgress: filteredTasks.filter(task => task.status === 'IN_PROGRESS'),
  }), [filteredTasks]);

  return {
    filteredTasks,
    groupedTasks,
    totalTasks: filteredTasks.length,
  };
};