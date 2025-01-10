import { Task, UpdateTaskInput, CreateTaskInput } from '../../types/task.types';
import { TaskCard } from '../shared/taskCard';

interface TaskColumnProps {
  title: string;
  tasks: Task[];
  onDelete?: (id: string) => Promise<void>;
  onUpdate?: (input: UpdateTaskInput) => Promise<void>;
  onCreate?: (input: CreateTaskInput) => Promise<void>;
}

export const TaskColumn = ({ 
  title, 
  tasks, 
  onDelete, 
  onUpdate, 
  onCreate 
}: TaskColumnProps) => {
  return (
    <div className="w-full min-w-[250px] flex flex-col bg-neutral-w rounded-lg p-4 h-full">
      <h2 className="text-lg font-semibold mb-4 text-neutral-1">
        {title} ({tasks.length})
      </h2>
      
      <div className="overflow-y-auto min-h-0 flex-1">
        <ul className="space-y-4 pr-2 pb-4">
          {tasks.map(task => (
            <TaskCard 
              key={task.id} 
              task={task}
              onDelete={onDelete}
              onUpdate={onUpdate}
              onCreate={onCreate}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TaskColumn;