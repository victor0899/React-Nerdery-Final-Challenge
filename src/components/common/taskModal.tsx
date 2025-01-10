import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_TASK, UPDATE_TASK } from '../graphql/mutations';
import { GET_ALL_TASKS, GET_USERS } from '../graphql/queries';

interface User {
  id: string;
  fullName: string;
}

interface Task {
  id: string;
  name: string;
  pointEstimate: PointEstimate;
  assignee: {
    id: string;
    fullName: string;
  };
  dueDate: string;
  tags: TaskTag[];
  status: TaskStatus;
}

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  task?: Task;
  mode: 'create' | 'edit';
}

type PointEstimate = 'ZERO' | 'ONE' | 'TWO' | 'FOUR' | 'EIGHT';
type TaskStatus = 'BACKLOG' | 'TODO' | 'IN_PROGRESS' | 'CANCELLED' | 'DONE';
type TaskTag = 'ANDROID' | 'IOS' | 'NODE_JS' | 'RAILS' | 'REACT';

interface TaskFormData {
  name: string;
  pointEstimate: PointEstimate;
  assigneeId: string;
  dueDate: string;
  tags: TaskTag[];
  status: TaskStatus;
}

const POINT_ESTIMATES: { value: PointEstimate; label: string }[] = [
  { value: 'ZERO', label: '0 Points' },
  { value: 'ONE', label: '1 Point' },
  { value: 'TWO', label: '2 Points' },
  { value: 'FOUR', label: '4 Points' },
  { value: 'EIGHT', label: '8 Points' }
];

const TAGS: TaskTag[] = [
  'ANDROID',
  'IOS',
  'NODE_JS',
  'RAILS',
  'REACT'
];

interface UsersData {
  users: User[];
}

export const TaskModal: React.FC<TaskModalProps> = ({ isOpen, onClose, task, mode }) => {
  const [formData, setFormData] = useState<TaskFormData>({
    name: '',
    pointEstimate: 'ZERO',
    assigneeId: '',
    dueDate: '',
    tags: [],
    status: 'BACKLOG'
  });

  useEffect(() => {
    if (task && mode === 'edit') {
      setFormData({
        name: task.name,
        pointEstimate: task.pointEstimate,
        assigneeId: task.assignee.id,
        dueDate: new Date(task.dueDate).toISOString().split('T')[0],
        tags: task.tags,
        status: task.status
      });
    }
  }, [task, mode]);

  const [createTask] = useMutation(CREATE_TASK, {
    refetchQueries: [{ query: GET_ALL_TASKS }]
  });

  const [updateTask] = useMutation(UPDATE_TASK, {
    refetchQueries: [{ query: GET_ALL_TASKS }]
  });

  const { data: usersData } = useQuery<UsersData>(GET_USERS);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const mutationInput = {
        name: formData.name,
        pointEstimate: formData.pointEstimate,
        assigneeId: formData.assigneeId,
        dueDate: new Date(formData.dueDate).toISOString(),
        tags: formData.tags,
        status: formData.status
      };

      if (mode === 'edit' && task) {
        await updateTask({
          variables: {
            input: {
              id: task.id,
              ...mutationInput
            }
          }
        });
      } else {
        await createTask({
          variables: {
            input: mutationInput
          }
        });
      }

      onClose();
      if (mode === 'create') {
        setFormData({
          name: '',
          pointEstimate: 'ZERO',
          assigneeId: '',
          dueDate: '',
          tags: [],
          status: 'BACKLOG'
        });
      }
    } catch (error) {
      console.error(`Error ${mode === 'create' ? 'creating' : 'updating'} task:`, error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-neutral-3 rounded-lg w-[572px] p-4 max-w-full">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Task Title */}
          <div>
            <input
              type="text"
              placeholder="Task Title"
              value={formData.name}
              onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full bg-transparent border-0 rounded-lg p-3 text-neutral-1 placeholder-neutral-2 focus:outline-none focus:ring-0"
              required
            />
          </div>

          {/* Form Controls Row */}
          <div className="grid grid-cols-4 gap-4 w-full max-w-[540px]">
            {/* Point Estimate */}
            <div>
              <div className="relative">
                <select
                  value={formData.pointEstimate}
                  onChange={e => setFormData(prev => ({ 
                    ...prev, 
                    pointEstimate: e.target.value as PointEstimate 
                  }))}
                  className="w-full bg-gray-500/10 border-0 rounded px-8 py-1 text-neutral-1 h-8 appearance-none gap-2 text-sm"
                >
                  <option value="" disabled selected>Estimate</option>
                  {POINT_ESTIMATES.map(point => (
                    <option key={point.value} value={point.value}>
                      {point.label}
                    </option>
                  ))}
                </select>
                <i className="ri-increase-decrease-fill absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-1 text-lg"></i>
              </div>
            </div>

            {/* Assignee */}
            <div>
              <div className="relative">
                <select
                  value={formData.assigneeId}
                  onChange={e => setFormData(prev => ({ ...prev, assigneeId: e.target.value }))}
                  className="w-full bg-gray-500/10 border-0 rounded px-4 py-1 text-neutral-1 h-8 appearance-none gap-2"
                  required
                >
                  <option value="">Assignee</option>
                  {usersData?.users?.map((user: User) => (
                    <option key={user.id} value={user.id}>
                      {user.fullName}
                    </option>
                  ))}
                </select>
                <i className="ri-user-fill absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-1 text-lg"></i>
              </div>
            </div>

            {/* Tags dropdown */}
            <div>
              <div className="relative">
                <select
                  value=""
                  onChange={(e) => {
                    const selectedTag = e.target.value as TaskTag;
                    setFormData(prev => ({
                      ...prev,
                      tags: prev.tags.includes(selectedTag)
                        ? prev.tags.filter(t => t !== selectedTag)
                        : [...prev.tags, selectedTag]
                    }));
                  }}
                  className="w-full bg-gray-500/10 border-0 rounded px-4 py-1 text-neutral-1 h-8 appearance-none gap-2"
                >
                  <option value="">Label</option>
                  {TAGS.map(tag => (
                    <option 
                      key={tag} 
                      value={tag}
                    >
                      {tag.replace('_', ' ')} {formData.tags.includes(tag) ? '✓' : ''}
                    </option>
                  ))}
                </select>
                <i className="ri-price-tag-3-fill absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-1 text-lg"></i>
              </div>
            </div>

            {/* Due Date */}
            <div>
              <div className="relative">
                <input
                  type="date"
                  value={formData.dueDate}
                  onChange={e => setFormData(prev => ({ ...prev, dueDate: e.target.value }))}
                  className="w-full bg-gray-500/10 border-0 rounded px-4 py-1 text-neutral-1 h-8 appearance-none gap-2"
                  required
                  placeholder="Due Date"
                />
                <i className="ri-calendar-check-line absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-1 text-lg"></i>
              </div>
            </div>
          </div>

          {/* Tags Display */}
          <div className="flex flex-wrap gap-2">
            {formData.tags.map(tag => (
              <span 
                key={tag}
                className="px-2 py-1 bg-primary-4 text-white text-sm rounded-lg flex items-center gap-2"
              >
                {tag.replace('_', ' ')}
                <button
                  type="button"
                  onClick={() => {
                    setFormData(prev => ({
                      ...prev,
                      tags: prev.tags.filter(t => t !== tag)
                    }));
                  }}
                  className="hover:text-neutral-2"
                >
                  ×
                </button>
              </span>
            ))}
          </div>

          {/* Status - Solo mostrar en edición */}
          {mode === 'edit' && (
            <div>
              <select
                value={formData.status}
                onChange={e => setFormData(prev => ({ 
                  ...prev, 
                  status: e.target.value as TaskStatus 
                }))}
                className="w-full bg-neutral-5 border-0 rounded-lg p-3 text-neutral-1"
              >
                <option value="BACKLOG">Backlog</option>
                <option value="TODO">To Do</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="CANCELLED">Cancelled</option>
                <option value="DONE">Done</option>
              </select>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 rounded-lg text-neutral-1 hover:bg-neutral-5"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-primary-4 text-white rounded-lg hover:bg-opacity-90"
            >
              {mode === 'create' ? 'Create' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;