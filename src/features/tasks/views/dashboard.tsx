import { useTasks } from '../hooks/useTasks';
import { TaskColumn } from '../components/board/taskColumn';
import { TaskList } from '../components/list/taskList';
import { useView } from '../../../shared/context';
import { useSearch } from '../../../shared/context';
import TaskLayout from '../layout/taskLayout';
import { TASK_COLUMNS } from '../constants/columns';

const Dashboard = () => {
  const { debouncedSearchTerm } = useSearch();
  const { tasks, isLoading } = useTasks({ 
    searchTerm: debouncedSearchTerm || undefined 
  });
  const { view } = useView();

  if (isLoading) return <div>Loading...</div>;

  return (
    <TaskLayout>
      {view === 'list' ? (
        <div className="p-6">
          <TaskList tasks={tasks} />
        </div>
      ) : (
        <div className="flex gap-8 w-full h-full">
          {TASK_COLUMNS.map(column => (
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

export default Dashboard;