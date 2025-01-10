import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_USERS } from '../../../features/tasks/graphql/queries';
import { useTaskActions } from '../../../features/tasks/hooks/useTaskActions';
import type { Task, PointEstimate, TaskStatus, TaskTag, CreateTaskInput } from '../../../features/tasks/types/task.types';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  task?: Task;
  mode: 'create' | 'edit';
}

const TaskModal = ({ isOpen, onClose, task, mode }: TaskModalProps) => {
  // Actualizado el estado inicial para coincidir con CreateTaskInput
  const [formData, setFormData] = useState<CreateTaskInput>({
    name: task?.name || '',
    assigneeId: task?.assignee?.id || '',
    status: task?.status || 'TODO',
    pointEstimate: task?.pointEstimate || 'ZERO',
    dueDate: task?.dueDate || new Date().toISOString().split('T')[0],
    tags: task?.tags || []
  });

  const { data: usersData } = useQuery(GET_USERS);
  const { createTask, updateTask, isLoading } = useTaskActions();

  useEffect(() => {
    if (task && mode === 'edit') {
      setFormData({
        name: task.name,
        assigneeId: task.assignee.id,
        status: task.status,
        pointEstimate: task.pointEstimate,
        dueDate: task.dueDate.split('T')[0], // Formatear la fecha para el input date
        tags: task.tags
      });
    }
  }, [task, mode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formattedData = {
        ...formData,
        dueDate: new Date(formData.dueDate + 'T00:00:00.000Z').toISOString(), // Convertir a UTC ISO string
      };

      if (mode === 'create') {
        await createTask(formattedData);
      } else {
        await updateTask({
          id: task!.id,
          ...formattedData
        });
      }
      onClose();
    } catch (error) {
      console.error('Error saving task:', error);
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

  const pointEstimates: PointEstimate[] = ['ZERO', 'ONE', 'TWO', 'FOUR', 'EIGHT'];
  const statuses: TaskStatus[] = ['BACKLOG', 'TODO', 'IN_PROGRESS', 'CANCELLED', 'DONE'];
  const availableTags: TaskTag[] = ['ANDROID', 'IOS', 'NODE_JS', 'RAILS', 'REACT'];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-neutral-4 rounded-lg p-6 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-neutral-1">
            {mode === 'create' ? 'Create Task' : 'Edit Task'}
          </h2>
          <button onClick={onClose} className="text-neutral-2 hover:text-neutral-1">
            <i className="ri-close-line text-2xl"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Task Name */}
          <div>
            <label className="block text-sm font-medium text-neutral-2 mb-1">
              Task Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full p-2 bg-neutral-5 border border-neutral-3 rounded-lg text-neutral-1"
              placeholder="Enter task name"
              required
            />
          </div>

          {/* Assignee */}
          <div>
            <label className="block text-sm font-medium text-neutral-2 mb-1">
              Assignee
            </label>
            <select
              value={formData.assigneeId}
              onChange={(e) => setFormData(prev => ({ ...prev, assigneeId: e.target.value }))}
              className="w-full p-2 bg-neutral-5 border border-neutral-3 rounded-lg text-neutral-1"
              required
            >
              <option value="">Select assignee</option>
              {usersData?.users?.map((user: any) => (
                <option key={user.id} value={user.id}>
                  {user.fullName}
                </option>
              ))}
            </select>
          </div>

          {/* Point Estimate */}
          <div>
            <label className="block text-sm font-medium text-neutral-2 mb-1">
              Point Estimate
            </label>
            <select
              value={formData.pointEstimate}
              onChange={(e) => setFormData(prev => ({ ...prev, pointEstimate: e.target.value as PointEstimate }))}
              className="w-full p-2 bg-neutral-5 border border-neutral-3 rounded-lg text-neutral-1"
              required
            >
              {pointEstimates.map(point => (
                <option key={point} value={point}>
                  {point}
                </option>
              ))}
            </select>
          </div>

          {/* Due Date */}
          <div>
            <label className="block text-sm font-medium text-neutral-2 mb-1">
              Due Date
            </label>
            <input
              type="date"
              value={formData.dueDate.split('T')[0]}
              onChange={(e) => setFormData(prev => ({ ...prev, dueDate: e.target.value }))}
              className="w-full p-2 bg-neutral-5 border border-neutral-3 rounded-lg text-neutral-1"
              required
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-neutral-2 mb-1">
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as TaskStatus }))}
              className="w-full p-2 bg-neutral-5 border border-neutral-3 rounded-lg text-neutral-1"
              required
            >
              {statuses.map(status => (
                <option key={status} value={status}>
                  {status.replace('_', ' ')}
                </option>
              ))}
            </select>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-neutral-2 mb-1">
              Tags
            </label>
            <div className="flex flex-wrap gap-2">
              {availableTags.map(tag => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => handleTagToggle(tag)}
                  className={`px-3 py-1 rounded-lg text-sm ${
                    formData.tags.includes(tag)
                      ? 'bg-primary-4 text-white'
                      : 'bg-neutral-5 text-neutral-2 hover:bg-neutral-3'
                  }`}
                >
                  {tag.replace('_', ' ')}
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-neutral-2 hover:text-neutral-1"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 bg-primary-4 text-white rounded-lg hover:bg-primary-3 disabled:opacity-50"
            >
              {isLoading ? 'Saving...' : mode === 'create' ? 'Create Task' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;