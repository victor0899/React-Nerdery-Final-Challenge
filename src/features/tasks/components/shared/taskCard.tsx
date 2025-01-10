import { useState } from 'react';
import { Task } from '../../types/task.types';
import { formatDueDate, formatPointEstimate } from '../../utils/formatters';
import { TaskTag } from './taskTag';
import { TaskDropdown } from './taskDropdown';
import { useTaskActions } from '../../hooks/useTaskActions';
import TaskModal from '../../../../shared/components/modal/taskModal';

interface TaskCardProps {
  task: Task;
}

const generateAvatarUrl = (name: string) => {
  const encodedName = encodeURIComponent(name);
  return `https://ui-avatars.com/api/?name=${encodedName}&background=random&color=fff&size=32&bold=true&format=png`;
};

export const TaskCard = ({ task }: TaskCardProps) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { deleteTask } = useTaskActions();

  const handleEdit = () => {
    setIsEditModalOpen(true);
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this task?')) {
      return;
    }

    try {
      await deleteTask(task.id);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <>
<li className="bg-neutral-4 p-4 rounded shadow-sm min-h-fit">
        <div className="flex justify-between items-start">
          <h3 className="font-medium text-neutral-1">{task.name}</h3>
          <TaskDropdown onEdit={handleEdit} onDelete={handleDelete} />
        </div>

        <div className="mt-3 text-sm flex flex-col gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-neutral-1 h-8 flex items-center">
              {formatPointEstimate(task.pointEstimate)}
            </span>
            <div className={`inline-flex items-center h-8 px-4 rounded py-1 gap-2 ${formatDueDate(task.dueDate).className}`}>
              <i className="ri-alarm-line text-[24px]"></i>
              <span className="whitespace-nowrap">{formatDueDate(task.dueDate).text}</span>
            </div>
          </div>
        </div>

        {task.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {task.tags.map(tag => (
              <TaskTag key={tag} tag={tag} />
            ))}
          </div>
        )}

        {task.assignee && (
          <div className="mt-2 flex justify-between items-center">
            <img
              src={generateAvatarUrl(task.assignee.fullName)}
              alt={task.assignee.fullName}
              className="w-8 h-8 rounded-full"
            />
            <div className="flex items-center text-neutral-1">
              <i className="ri-attachment-2 text-lg"></i>
              <i className="ri-node-tree text-lg ml-4"></i>
              <i className="ri-chat-3-line text-lg ml-4"></i>
            </div>
          </div>
        )}
      </li>

      <TaskModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        task={task}
        mode="edit"
      />
    </>
  );
};

export default TaskCard;