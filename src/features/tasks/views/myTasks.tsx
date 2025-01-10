import { useQuery } from '@apollo/client';
import { GET_PROFILE } from '../graphql/queries';
import { useTasks } from '../hooks/useTasks';
import { TaskColumn } from '../components/board/taskColumn';
import { TaskList } from '../components/list/taskList';
import { useView } from '../../../shared/context';
import TaskLayout from '../layout/taskLayout';  // Añade esta importación

const MyTasks = () => {
  const { data: profileData, loading: profileLoading } = useQuery(GET_PROFILE);
  const { tasks, isLoading } = useTasks({ 
    assigneeId: profileData?.profile?.id 
  });
  const { view } = useView();

  const columns = [
    { id: 'BACKLOG', title: 'Backlog' },
    { id: 'TODO', title: 'To Do' },
    { id: 'IN_PROGRESS', title: 'In Progress' },
  ];

  if (profileLoading || isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <TaskLayout>  {/* Envuelve todo el contenido en TaskLayout */}
      {view === 'list' ? (
        <div className="p-6">
          <TaskList tasks={tasks} />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6 min-h-screen">
          {columns.map(column => (
            <TaskColumn
              key={column.id}
              title={column.title}
              tasks={tasks.filter(task => task.status === column.id)}
            />
          ))}
        </div>
      )}
    </TaskLayout>
  );
};

export default MyTasks;