import { useTasks } from '../hooks/useTasks';
import { TaskColumn } from '../components/board/taskColumn';
import { TaskList } from '../components/list/taskList';
import { useView } from '../../../shared/context';
import TaskLayout from '../layout/taskLayout';
import { TASK_COLUMNS } from '../constants/columns';

const Dashboard = () => {
  const { tasks, isLoading } = useTasks();
  const { view } = useView();

  if (isLoading) return <div>Loading...</div>;

  return (
    <TaskLayout>
      {view === 'list' ? (
        <div className="p-6">
          <TaskList tasks={tasks} />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6 min-h-screen">
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