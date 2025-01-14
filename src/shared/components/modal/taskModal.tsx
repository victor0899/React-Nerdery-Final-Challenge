import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_USERS } from '../../../features/tasks/graphql/queries';
import type { Task, PointEstimate, TaskTag, CreateTaskInput, UpdateTaskInput } from '../../../features/tasks/types/task.types';
import CustomSelect from '../../components/dropdowns/customSelect';
import { useNotification } from '../../../shared/context/notificationContext';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  task?: Task;
  mode: 'create' | 'edit';
  onCreate?: (input: CreateTaskInput) => Promise<void>;
  onUpdate?: (input: UpdateTaskInput) => Promise<void>;
  onError?: (error: string) => void; // Añadimos esta línea
}

interface User {
  id: string;
  fullName: string;
}

interface GetUsersQueryData {
  users: User[];
}

const TaskModal = ({ isOpen, onClose, task, mode, onCreate, onUpdate }: TaskModalProps) => {
  const { addNotification } = useNotification();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<CreateTaskInput>({
    name: '',
    assigneeId: '',
    status: 'BACKLOG',  
    pointEstimate: 'ZERO',  
    dueDate: '',
    tags: ['REACT'] 
  });

  const { data: usersData } = useQuery<GetUsersQueryData>(GET_USERS);

  const pointEstimateOptions = [
    { value: 'ZERO', label: 'ZERO' },
    { value: 'ONE', label: 'ONE' },
    { value: 'TWO', label: 'TWO' },
    { value: 'FOUR', label: 'FOUR' },
    { value: 'EIGHT', label: 'EIGHT' },
  ];

  const tagOptions = [
    { value: 'ANDROID', label: 'ANDROID' },
    { value: 'IOS', label: 'IOS' },
    { value: 'NODE_JS', label: 'NODE JS' },
    { value: 'RAILS', label: 'RAILS' },
    { value: 'REACT', label: 'REACT' },
  ];

  const userOptions = usersData?.users?.map((user) => ({
    value: user.id,
    label: user.fullName,
  })) || [];

  useEffect(() => {
    if (task && mode === 'edit') {
      setFormData({
        name: task.name,
        assigneeId: task.assignee.id,
        status: task.status,
        pointEstimate: task.pointEstimate,
        dueDate: task.dueDate.split('T')[0],
        tags: task.tags
      });
    }
  }, [task, mode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    

    const validationErrors: string[] = [];

    if (!formData.name.trim()) {
      validationErrors.push('Task name is required');
    }
    
    if (!formData.pointEstimate) {
      validationErrors.push('Point estimate is required');
    }

    if (!formData.tags.length) {
      validationErrors.push('At least one tag is required');
    }

    if (!formData.dueDate) {
      validationErrors.push('Due date is required');
    }

    if (validationErrors.length > 0) {
      validationErrors.forEach(error => {
        addNotification(error, 'error');
      });
      return;
    }

    setIsLoading(true);
    try {
      const formattedData = {
        ...formData,
        dueDate: new Date(formData.dueDate + 'T00:00:00.000Z').toISOString(),
      };

      if (mode === 'create' && onCreate) {
        await onCreate(formattedData);
      } else if (mode === 'edit' && onUpdate && task) {
        await onUpdate({
          id: task.id,
          ...formattedData
        });
      }
      onClose();
    } catch (error) {
      console.error('Error saving task:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-[100] flex items-center justify-center">
      <div className="bg-[#393D41] rounded-lg p-4 w-[572px]">
        <form onSubmit={handleSubmit} className="space-y-2">
          {/* Task Name Input */}
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            className="w-[540px] h-8 px-4 py-2 bg-transparent border border-neutral-3 rounded-lg text-neutral-1"
            placeholder="Task Title"
          />

          {/* Controls Row */}
          <div className="flex justify-between space-x-2 mb-6">
            {/* Point Estimate */}
            <CustomSelect
              options={pointEstimateOptions}
              value={formData.pointEstimate}
              onChange={(value) => setFormData(prev => ({ ...prev, pointEstimate: value as PointEstimate }))}
              placeholder="Estimate"
              icon="ri-increase-decrease-fill"
              defaultValue="ZERO"
            />

            {/* Assignee */}
            <CustomSelect
              options={userOptions}
              value={formData.assigneeId}
              onChange={(value) => setFormData(prev => ({ ...prev, assigneeId: value }))}
              placeholder="Assignee"
              icon="ri-user-fill"
            />

            {/* Tags */}
            <CustomSelect
              options={tagOptions}
              value={formData.tags[0] || ''}
              onChange={(value) => {
                if (value) {
                  setFormData(prev => ({ ...prev, tags: [value as TaskTag] }))
                }
              }}
              placeholder="Label"
              icon="ri-price-tag-3-fill"
              defaultValue="REACT"
            />

            {/* Due Date */}
            <div
              className="w-32 h-8 px-2 bg-neutral-2/10 rounded-lg flex items-center cursor-pointer"
              onClick={() => {
                const input = document.getElementById('dueDateInput') as HTMLInputElement;
                input?.showPicker();
              }}
            >
              <i className="ri-calendar-check-line mr-2"></i>
              <span className="text-sm text-neutral-1 flex-grow">
                {formData.dueDate ? new Date(formData.dueDate).toLocaleDateString() : 'Due Date'}
              </span>
              <input
                id="dueDateInput"
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData(prev => ({ ...prev, dueDate: e.target.value }))}
                className="hidden"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4">
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