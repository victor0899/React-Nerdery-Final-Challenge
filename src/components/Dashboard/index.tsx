import { useQuery } from '@apollo/client';
import { GET_ALL_TASKS } from './../graphql/queries';
import { Task } from './types';
import { TaskColumn } from './components/taskColumn';
import { TaskList } from './components/taskList';
import { useView } from '../../context/viewContext';

const DashboardCard = () => {
  const { data, loading } = useQuery<{ tasks: Task[] }>(GET_ALL_TASKS);
  const { view } = useView();

  const columns = [
    { id: 'BACKLOG', title: 'Backlog' },
    { id: 'TODO', title: 'To Do' },
    { id: 'IN_PROGRESS', title: 'In Progress' },
  ];

  const getTasksByStatus = (status: string) => {
    return data?.tasks.filter(task => task.status === status) || [];
  };

  if (loading) return <div>Loading...</div>;

  if (view === 'list') {
    return (
      <div className="p-6">
        <TaskList tasks={data?.tasks || []} />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6 min-h-screen">
      {columns.map(column => (
        <TaskColumn
          key={column.id}
          title={column.title}
          tasks={getTasksByStatus(column.id)}
        />
      ))}
    </div>
  );
};

export default DashboardCard;