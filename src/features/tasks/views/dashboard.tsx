import { useTasks } from '../hooks/useTasks';
import { TaskColumn } from '../components/board/taskColumn';
import { TaskList } from '../components/list/taskList';
import { useView } from '../../../shared/context';
import { useSearch } from '../../../shared/context';
import TaskLayout from '../layout/taskLayout';
import { TASK_COLUMNS } from '../constants/columns';
import { useTaskActions } from '../hooks/useTaskActions';
import { useNotification } from '../../../shared/context/notificationContext';
import { UpdateTaskInput } from '../types/task.types';

const Dashboard = () => {
  const { debouncedSearchTerm } = useSearch();
  const { tasks, isLoading } = useTasks({ 
    searchTerm: debouncedSearchTerm || undefined 
  });
  const { view } = useView();
  const { updateTask, deleteTask } = useTaskActions(); 
  const { addNotification } = useNotification();

  const handleUpdateTask = async (input: UpdateTaskInput) => {
    try {
      await updateTask(input);
      addNotification('Task status updated successfully', 'success');
    } catch (error) {
      console.error('Error updating task:', error);
      addNotification('Error updating task status. Please try again.', 'error');
    }
  };

  const handleDeleteTask = async (id: string) => {
    try {
      await deleteTask(id);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <TaskLayout>
      {view === 'list' ? (
        <div className="py-6">
          <TaskList 
            tasks={tasks} 
            onUpdate={handleUpdateTask}
            onDelete={handleDeleteTask} 
          />
        </div>
      ) : (
<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 min-h-screen">
          {TASK_COLUMNS.map(column => (
            <TaskColumn
              key={column.id}
              title={column.title}
              status={column.id}
              tasks={tasks.filter(task => task.status === column.id)}
              onUpdate={handleUpdateTask}
              onDelete={handleDeleteTask} 
            />
          ))}
        </div>
      )}
    </TaskLayout>
  );
};

export default Dashboard;