import { Task } from '../types';
import { TaskCard } from './taskCard';
import { useSearch } from '../../../context/searchContext';

interface TaskColumnProps {
  title: string;
  tasks: Task[];
}

export const TaskColumn = ({ title, tasks }: TaskColumnProps) => {
  const { searchTerm } = useSearch();
  
  const filteredTasks = searchTerm
    ? tasks.filter(task =>
        task.name.toLowerCase().includes(searchTerm.toLowerCase().trim())
      )
    : tasks;

  return (
    <div className="flex flex-col bg-neutral-5 rounded-lg p-4 h-[calc(100vh-48px)]">
      <h2 className="text-lg font-semibold mb-4 text-neutral-1 flex-none">
        {title} ({filteredTasks.length})
      </h2>
      
      <div className="overflow-y-auto flex-1" style={{ height: 'calc(100vh - 160px)' }}>
        <ul className="space-y-4 pr-2">
          {filteredTasks.map(task => (
            <TaskCard key={task.id} task={task} />
          ))}
        </ul>
      </div>
    </div>
  );
};