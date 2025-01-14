import { Task, UpdateTaskInput, CreateTaskInput, TaskStatus } from '../../types/task.types';
import { TaskCard } from '../shared/taskCard';

interface TaskColumnProps {
  title: string;
  tasks: Task[];
  status: TaskStatus;
  onDelete?: (id: string) => Promise<void>;
  onUpdate?: (input: UpdateTaskInput) => Promise<void>;
  onCreate?: (input: CreateTaskInput) => Promise<void>;
}

export const TaskColumn = ({ 
  title, 
  tasks, 
  status, 
  onDelete, 
  onUpdate, 
  onCreate 
}: TaskColumnProps) => {
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.classList.add('bg-neutral-5/50');
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.classList.remove('bg-neutral-5/50');
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.classList.remove('bg-neutral-5/50');
  
    const taskId = e.dataTransfer.getData('taskId');
    const sourceStatus = e.dataTransfer.getData('sourceStatus') as TaskStatus;
    
    if (sourceStatus !== status && taskId && onUpdate) {
      await onUpdate({
        id: taskId,
        status
      });
    }
  };
  return (
    <div 
      className="w-full min-w-[250px] flex flex-col bg-neutral-w rounded-lg p-4 h-[calc(100vh-180px)]"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    > 
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-neutral-1">
          {title} ({tasks.length})
        </h2>
      </div>
      
      <div className="flex-1 overflow-hidden"> 
        <div className="h-full overflow-y-auto pr-2"> 
          <ul className="space-y-4 pb-4">
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
    </div>
  );
};

export default TaskColumn;