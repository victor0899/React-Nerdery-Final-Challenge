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

// Types
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

  const handleTagToggle = (tag: TaskTag) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag]
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-neutral-4 rounded-lg w-full max-w-lg p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <h2 className="text-xl font-semibold text-neutral-1">
            {mode === 'create' ? 'Create New Task' : 'Edit Task'}
          </h2>
          
          {/* Task Title */}
          <div>
            <input
              type="text"
              placeholder="Task Title"
              value={formData.name}
              onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full bg-neutral-5 border-0 rounded-lg p-3 text-neutral-1 placeholder-neutral-2"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Point Estimate */}
            <div>
              <select
                value={formData.pointEstimate}
                onChange={e => setFormData(prev => ({ 
                  ...prev, 
                  pointEstimate: e.target.value as PointEstimate 
                }))}
                className="w-full bg-neutral-5 border-0 rounded-lg p-3 text-neutral-1"
              >
                {POINT_ESTIMATES.map(point => (
                  <option key={point.value} value={point.value}>
                    {point.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Assignee */}
            <div>
              <select
                value={formData.assigneeId}
                onChange={e => setFormData(prev => ({ ...prev, assigneeId: e.target.value }))}
                className="w-full bg-neutral-5 border-0 rounded-lg p-3 text-neutral-1"
                required
              >
                <option value="">Select Assignee</option>
                {usersData?.users?.map((user: User) => (
                  <option key={user.id} value={user.id}>
                    {user.fullName}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {TAGS.map(tag => (
              <button
                key={tag}
                type="button"
                onClick={() => handleTagToggle(tag)}
                className={`px-4 py-2 rounded-lg text-sm ${
                  formData.tags.includes(tag)
                    ? 'bg-primary-4 text-white'
                    : 'bg-neutral-5 text-neutral-1'
                }`}
              >
                {tag.replace('_', ' ')}
              </button>
            ))}
          </div>

          {/* Due Date */}
          <div>
            <input
              type="date"
              value={formData.dueDate}
              onChange={e => setFormData(prev => ({ ...prev, dueDate: e.target.value }))}
              className="w-full bg-neutral-5 border-0 rounded-lg p-3 text-neutral-1"
              required
            />
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