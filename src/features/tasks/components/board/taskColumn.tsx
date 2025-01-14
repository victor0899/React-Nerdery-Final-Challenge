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
    <div className="w-full min-w-[250px] flex flex-col bg-neutral-w rounded-lg p-4 h-[calc(100vh-180px)]"> {/* Altura fija ajustada */}
      {/* Header de la columna - fijo */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-neutral-1">
          {title} ({tasks.length})
        </h2>
      </div>
      
      {/* Contenedor scrollable */}
      <div className="flex-1 overflow-hidden"> {/* Contenedor padre */}
        <div className="h-full overflow-y-auto pr-2"> {/* Contenedor con scroll */}
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