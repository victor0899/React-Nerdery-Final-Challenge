import { useQuery } from '@apollo/client';
import { GET_PROFILE } from '../graphql/queries';
import { useTasks } from '../hooks/useTasks';
import { useTaskActions } from '../hooks/useTaskActions'; 
import { TaskColumn } from '../components/board/taskColumn';
import { TaskList } from '../components/list/taskList';
import { useView, useSearch } from '../../../shared/context';
import TaskLayout from '../layout/taskLayout';

const MyTasks = () => {
  const { debouncedSearchTerm } = useSearch();
  const { data: profileData, loading: profileLoading } = useQuery(GET_PROFILE);
  const { tasks, isLoading } = useTasks({ 
    assigneeId: profileData?.profile?.id,
    searchTerm: debouncedSearchTerm || undefined
  });

  const { deleteTask, createTask, updateTask } = useTaskActions(profileData?.profile?.id);

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
    <TaskLayout> 
      {view === 'list' ? (
        <div className="p-6">
          <TaskList 
            tasks={tasks} 
            onDelete={deleteTask}
            onUpdate={updateTask}
            onCreate={createTask}
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 min-h-screen">
          {columns.map(column => (
            <TaskColumn
              key={column.id}
              title={column.title}
              tasks={tasks.filter(task => task.status === column.id)}
              onDelete={deleteTask}
              onUpdate={updateTask}
              onCreate={createTask}
            />
          ))}
        </div>
      )}
    </TaskLayout>
  );
};

export default MyTasks;