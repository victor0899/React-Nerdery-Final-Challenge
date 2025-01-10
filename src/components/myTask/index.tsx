import { useQuery } from '@apollo/client';
import { GET_MY_TASKS, GET_PROFILE } from '../graphql/queries';
import { Task } from '../Dashboard/types';
import { TaskColumn } from '../Dashboard/components/taskColumn';
import { TaskList } from '../Dashboard/components/taskList';
import { useView } from '../../context/viewContext';

const MyTaskCard = () => {
  const { data: profileData, loading: profileLoading, error: profileError } = useQuery(GET_PROFILE);
  
  console.log('Profile Data:', profileData);
  console.log('Profile Loading:', profileLoading);
  console.log('Profile Error:', profileError);
  
  const { data, loading, error } = useQuery<{ tasks: Task[] }>(GET_MY_TASKS, {
    variables: {
      input: {
        assigneeId: profileData?.profile?.id  
      }
    },
    skip: !profileData?.profile?.id
  });

  console.log('Tasks Data:', data);
  console.log('Tasks Loading:', loading);
  console.log('Tasks Error:', error);
  console.log('Current Variables:', { input: { assigneeId: profileData?.profile?.id } });

  const { view } = useView();

  const columns = [
    { id: 'BACKLOG', title: 'Backlog' },
    { id: 'TODO', title: 'To Do' },
    { id: 'IN_PROGRESS', title: 'In Progress' },
  ];

  const getTasksByStatus = (status: string) => {
    const filteredTasks = data?.tasks.filter(task => task.status === status) || [];
    console.log(`Tasks for status ${status}:`, filteredTasks);
    return filteredTasks;
  };

  if (profileLoading || loading) {
    console.log('Component is in loading state');
    return <div>Loading...</div>;
  }

  if (profileError || error) {
    console.log('Component has error:', profileError || error);
    return <div>Error loading tasks</div>;
  }

  console.log('View mode:', view);

  return (
    <div className="space-y-4">
      {view === 'list' ? (
        <div className="p-6">
          <TaskList tasks={data?.tasks || []} />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6 min-h-screen">
          {columns.map(column => (
            <TaskColumn
              key={column.id}
              title={column.title}
              tasks={getTasksByStatus(column.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyTaskCard;