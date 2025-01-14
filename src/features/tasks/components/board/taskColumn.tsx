import { motion, AnimatePresence } from 'framer-motion';
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
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full min-w-[250px] flex flex-col bg-neutral-w rounded-lg p-4 h-[calc(100vh-180px)]"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    > 
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center justify-between mb-4"
      >
        <h2 className="text-lg font-semibold text-neutral-1">
          {title} ({tasks.length})
        </h2>
      </motion.div>
      
      <div className="flex-1 overflow-hidden"> 
        <div className="h-full overflow-y-auto pr-2"> 
          <AnimatePresence mode="popLayout">
            <motion.ul 
              className="space-y-4 pb-4"
              layout
            >
              {tasks.map(task => (
                <motion.div
                  key={task.id}
                  layout
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 25,
                    duration: 0.3
                  }}
                >
                  <TaskCard 
                    task={task}
                    onDelete={onDelete}
                    onUpdate={onUpdate}
                    onCreate={onCreate}
                  />
                </motion.div>
              ))}
            </motion.ul>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default TaskColumn;