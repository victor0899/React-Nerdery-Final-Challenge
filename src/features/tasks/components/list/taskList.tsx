import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Task, UpdateTaskInput, CreateTaskInput } from '../../types/task.types';
import { useTaskFilters } from '../../hooks/useTaskFilters';
import { TaskTag } from '../shared/taskTag';
import { TaskDropdown } from '../shared/taskDropdown';
import { formatDueDate, formatPointEstimate } from '../../utils/formatters';

interface TaskGroupProps {
  title: string;
  count: number;
  tasks: Task[];
  onDelete?: (id: string) => Promise<void>;
  onUpdate?: (input: UpdateTaskInput) => Promise<void>;
  onCreate?: (input: CreateTaskInput) => Promise<void>;
}

interface TaskListProps {
  tasks: Task[];
  onDelete?: (id: string) => Promise<void>;
  onUpdate?: (input: UpdateTaskInput) => Promise<void>;
  onCreate?: (input: CreateTaskInput) => Promise<void>;
}

const generateAvatarUrl = (name: string) => {
  const encodedName = encodeURIComponent(name);
  return `https://ui-avatars.com/api/?name=${encodedName}&background=random&color=fff&size=32&bold=true&format=png`;
};

const TaskRow = ({ 
  task, 
  onDelete, 
  onUpdate 
}: { 
  task: Task;
  onDelete?: (id: string) => Promise<void>;
  onUpdate?: (input: UpdateTaskInput) => Promise<void>;
}) => {
  const handleDelete = async () => {
    if (onDelete && window.confirm('Are you sure you want to delete this task?')) {
      await onDelete(task.id);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.2 }}
      className="grid grid-cols-12 gap-4 px-4 py-3 hover:bg-neutral-3 border-b border-neutral-3"
    >
      <div className="col-span-4 flex items-center justify-between text-neutral-1 border-r border-neutral-3">
        <div className="flex items-center">
          <div className="w-1 h-full bg-green-500 mr-4"/>
          {task.name}
        </div>
        <TaskDropdown 
          onEdit={() => {
            if (onUpdate) {
              onUpdate({ id: task.id, status: task.status });
            }
          }} 
          onDelete={handleDelete}
        />
      </div>
      <motion.div 
        layout
        className="col-span-2 border-r border-neutral-3"
      >
        <div className="flex flex-wrap gap-2">
          {task.tags.map(tag => (
            <TaskTag key={tag} tag={tag} />
          ))}
        </div>
      </motion.div>
      <div className="col-span-1 text-neutral-1 border-r border-neutral-3">
        {formatPointEstimate(task.pointEstimate)}
      </div>
      <div className="col-span-2 text-neutral-1 border-r border-neutral-3">
        <div className="flex items-center">
          <img
            src={generateAvatarUrl(task.assignee.fullName)}
            alt={task.assignee.fullName}
            className="w-8 h-8 rounded-full mr-2"
          />
          <span>{task.assignee.fullName}</span>
        </div>
      </div>
      <div className="col-span-3">
        <div className={`inline-flex items-center px-3 py-1 rounded ${formatDueDate(task.dueDate).className}`}>
          {formatDueDate(task.dueDate).text}
        </div>
      </div>
    </motion.div>
  );
};

const TaskGroup = ({ 
  title, 
  count, 
  tasks,
  onDelete,
  onUpdate}: TaskGroupProps) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mb-4 border border-neutral-3 rounded-lg overflow-hidden"
    >
      <div 
        className="flex items-center p-4 bg-neutral-4 cursor-pointer text-sm border-b border-neutral-3"
        onClick={() => setIsOpen(!isOpen)}
      >
        <motion.i 
          animate={{ rotate: isOpen ? 0 : -90 }}
          transition={{ duration: 0.2 }}
          className="ri-arrow-down-s-fill text-neutral-1" 
        />
        <span className="ml-2 text-neutral-1 font-medium">{title}</span>
        <span className="ml-2 text-neutral-1">({count})</span>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-neutral-4 border-t border-neutral-3"
          >
            <motion.div 
              className="divide-y divide-neutral-3"
              layout
            >
              <AnimatePresence mode="popLayout">
                {tasks.map((task) => (
                  <TaskRow 
                    key={task.id} 
                    task={task}
                    onDelete={onDelete}
                    onUpdate={onUpdate}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export const TaskList: React.FC<TaskListProps> = ({ 
  tasks,
  onDelete,
  onUpdate,
  onCreate
}) => {
  const { groupedTasks } = useTaskFilters({ tasks });

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      <motion.div 
        layout
        className="grid grid-cols-12 gap-4 px-4 py-3 text-sm text-neutral-1 bg-neutral-4 mb-4 border border-neutral-3 rounded-lg"
      >
        <div className="col-span-4 border-r border-neutral-3"># Task Name</div>
        <div className="col-span-2 border-r border-neutral-3">Task Tags</div>
        <div className="col-span-1 border-r border-neutral-3">Estimate</div>
        <div className="col-span-2 border-r border-neutral-3">Task Assign Name</div>
        <div className="col-span-3">Due Date</div>
      </motion.div>

      <AnimatePresence mode="popLayout">
        {Object.entries({
          "Backlog": groupedTasks.backlog,
          "To Do": groupedTasks.todo,
          "In Progress": groupedTasks.inProgress,
          "Done": groupedTasks.done,
          "Cancelled": groupedTasks.cancelled
        }).map(([title, tasks]) => (
          <TaskGroup 
            key={title}
            title={title}
            count={tasks.length}
            tasks={tasks}
            onDelete={onDelete}
            onUpdate={onUpdate}
            onCreate={onCreate}
          />
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

export default TaskList;