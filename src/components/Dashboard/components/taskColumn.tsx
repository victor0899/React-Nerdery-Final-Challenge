import { Task } from '../types';
import { TaskCard } from './taskCard';

interface TaskColumnProps {
  title: string;
  tasks: Task[];
}

export const TaskColumn = ({ title, tasks }: TaskColumnProps) => {
  return (
    <div className="bg-neutral-5 rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-4 text-neutral-1">
        {title} ({tasks.length})
      </h2>
      <ul className="space-y-4">
        {tasks.map(task => (
          <TaskCard key={task.id} task={task} />
        ))}
      </ul>
    </div>
  );
};