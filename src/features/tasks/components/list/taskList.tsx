import { useState } from 'react';
import { Task, UpdateTaskInput, CreateTaskInput } from '../../types/task.types';
import { useTaskFilters } from '../../hooks/useTaskFilters';
import { TaskTag } from '../shared/taskTag';
import { formatDueDate, formatPointEstimate } from '../../utils/formatters';

interface TaskGroupProps {
  title: string;
  count: number;
  tasks: Task[];
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

const TaskGroup = ({ title, count, tasks }: TaskGroupProps) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="mb-4 border border-neutral-3 rounded-lg overflow-hidden">
      <div 
        className="flex items-center p-4 bg-neutral-4 cursor-pointer text-sm border-b border-neutral-3"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <i className="ri-arrow-down-s-fill text-neutral-1" />
        ) : (
          <i className="ri-arrow-down-s-fill transform rotate-[-90deg] text-neutral-1" />
        )}
        <span className="ml-2 text-neutral-1 font-medium">{title}</span>
        <span className="ml-2 text-neutral-1">({count})</span>
      </div>

      {isOpen && (
        <div className="bg-neutral-4 border-t border-neutral-3">
          <div className="divide-y divide-neutral-3">
            {tasks.map((task) => (
              <TaskRow key={task.id} task={task} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const TaskRow = ({ task }: { task: Task }) => (
  <div className="grid grid-cols-12 gap-4 px-4 py-3 hover:bg-neutral-3 border-b border-neutral-3">
    <div className="col-span-4 flex items-center text-neutral-1 border-r border-neutral-3">
      <div className="w-1 h-full bg-green-500 mr-4"/>
      {task.name}
    </div>
    <div className="col-span-2 border-r border-neutral-3">
      <div className="flex flex-wrap gap-2">
        {task.tags.map(tag => (
          <TaskTag key={tag} tag={tag} />
        ))}
      </div>
    </div>
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
  </div>
);

export const TaskList: React.FC<TaskListProps> = ({ 
  tasks}) => {
  const { groupedTasks } = useTaskFilters({ tasks });

  return (
    <div className="w-full">
      <div className="grid grid-cols-12 gap-4 px-4 py-3 text-sm text-neutral-1 bg-neutral-4 mb-4 border border-neutral-3 rounded-lg">
        <div className="col-span-4 border-r border-neutral-3"># Task Name</div>
        <div className="col-span-2 border-r border-neutral-3">Task Tags</div>
        <div className="col-span-1 border-r border-neutral-3">Estimate</div>
        <div className="col-span-2 border-r border-neutral-3">Task Assign Name</div>
        <div className="col-span-3">Due Date</div>
      </div>

      <TaskGroup title="Backlog" count={groupedTasks.backlog.length} tasks={groupedTasks.backlog} />
      <TaskGroup title="To Do" count={groupedTasks.todo.length} tasks={groupedTasks.todo} />
      <TaskGroup title="In Progress" count={groupedTasks.inProgress.length} tasks={groupedTasks.inProgress} />
    </div>
  );
};

export default TaskList;