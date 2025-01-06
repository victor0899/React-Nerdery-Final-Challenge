import React from 'react';
import { Task } from '../types';
import { formatDueDate, formatPointEstimate } from '../utils/formatters';
import { TaskTag } from './taskTag';
import { TaskDropdown } from './taskDropdown';

export const TaskCard = ({ task }: { task: Task }) => {
  const getAvatarUrl = (avatarUrl: string) => {
    if (avatarUrl.includes('avatars.dicebear.com/api/')) {
      const initials = avatarUrl.split('/').pop()?.replace('.svg', '') || 'gs';
      return `https://api.dicebear.com/7.x/initials/svg?seed=${initials}`;
    }
    return avatarUrl.startsWith('http') ? avatarUrl : `${import.meta.env.VITE_API_URL}${avatarUrl}`;
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    console.error('Error loading avatar:', e);
    (e.target as HTMLImageElement).src = '/api/placeholder/32/32';
  };

  const handleEdit = () => {
    console.log('Edit task:', task.id);
  };

  const handleDelete = () => {
    console.log('Delete task:', task.id);
  };

  return (
    <li className="bg-neutral-4 p-4 rounded shadow-sm">
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
      {task.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {task.tags.map(tag => (
            <TaskTag key={tag} tag={tag} />
          ))}
        </div>
      )}
      {task.assignee && (
        <div className="mt-2 flex justify-between items-center">
          <img
            src={getAvatarUrl(task.assignee.avatar)}
            alt={task.assignee.fullName}
            className="w-8 h-8 rounded-full object-cover"
            onError={handleImageError}
          />
          <div className="flex items-center text-neutral-1">
            <i className="ri-attachment-2 text-lg"></i>
            <i className="ri-node-tree text-lg ml-4"></i>
            <i className="ri-chat-3-line text-lg ml-4"></i>
          </div>
        </div>
      )}
    </li>
  );
};