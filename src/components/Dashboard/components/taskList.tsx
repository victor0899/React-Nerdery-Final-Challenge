import { useState } from 'react';
import { Task } from '../types';
import { formatDueDate, formatPointEstimate } from '../utils/formatters';
import { TaskTag } from './taskTag';

interface TaskGroupProps {
  title: string;
  count: number;
  tasks: Task[];
}

const generateAvatarUrl = (name: string) => {
  const encodedName = encodeURIComponent(name);
  return `https://ui-avatars.com/api/?name=${encodedName}&background=random&color=fff&size=32&bold=true&format=png`;
};

const TagsDisplay = ({ tags }: { tags: string[] }) => {
  const [showAllTags, setShowAllTags] = useState(false);
  
  if (tags.length <= 1) {
    return (
      <div className="flex flex-wrap gap-2">
        {tags.map(tag => (
          <TaskTag key={tag} tag={tag} />
        ))}
      </div>
    );
  }

  if (showAllTags) {
    return (
      <div className="flex flex-wrap gap-2">
        {tags.map(tag => (
          <TaskTag key={tag} tag={tag} />
        ))}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowAllTags(false);
          }}
          className="text-sm text-neutral-1 hover:bg-neutral-2 rounded"
        >
          Close
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <TaskTag tag={tags[0]} />
      <button
        onClick={(e) => {
          e.stopPropagation();
          setShowAllTags(true);
        }}
        className="px-4 py-1 text-sm bg-neutral-2 rounded text-neutral-1 hover:bg-neutral-3"
      >
        +{tags.length - 1}
      </button>
    </div>
  );
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
              <div 
                key={task.id} 
                className="grid grid-cols-12 gap-4 px-4 py-3 hover:bg-neutral-3 border-b border-neutral-3"
              >
                <div className="col-span-4 flex items-center text-neutral-1 border-r border-neutral-3">
                  <div className="w-1 h-full bg-green-500 mr-4"/>
                  {task.name}
                </div>
                <div className="col-span-2 border-r border-neutral-3">
                  <TagsDisplay tags={task.tags} />
                </div>
                <div className="col-span-1 text-neutral-1 border-r border-neutral-3">
                  {formatPointEstimate(task.pointEstimate)} Points
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
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export const TaskList = ({ tasks }: { tasks: Task[] }) => {
  const backlogTasks = tasks.filter(task => task.status === 'BACKLOG');
  const todoTasks = tasks.filter(task => task.status === 'TODO');
  const inProgressTasks = tasks.filter(task => task.status === 'IN_PROGRESS');

  return (
    <div className="w-full">
      <div className="grid grid-cols-12 gap-4 px-4 py-3 text-sm text-neutral-1 bg-neutral-4 mb-4 border border-neutral-3 rounded-lg">
        <div className="col-span-4 border-r border-neutral-3"># Task Name</div>
        <div className="col-span-2 border-r border-neutral-3">Task Tags</div>
        <div className="col-span-1 border-r border-neutral-3">Estimate</div>
        <div className="col-span-2 border-r border-neutral-3">Task Assign Name</div>
        <div className="col-span-3">Due Date</div>
      </div>

      <TaskGroup title="Backlog" count={backlogTasks.length} tasks={backlogTasks} />
      <TaskGroup title="To Do" count={todoTasks.length} tasks={todoTasks} />
      <TaskGroup title="In Progress" count={inProgressTasks.length} tasks={inProgressTasks} />
    </div>
  );
};

export default TaskList;