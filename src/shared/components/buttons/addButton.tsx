import { useState } from 'react'
import TaskModal from '../modal/taskModal'
import { useTaskActions } from '../../../features/tasks/hooks/useTaskActions';
import { useQuery } from '@apollo/client';
import { GET_PROFILE } from '../../../features/tasks/graphql/queries';

export const AddButton = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { data: profileData } = useQuery(GET_PROFILE);
  const { createTask } = useTaskActions(profileData?.profile?.id);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)} 
        className="bg-primary-4 text-white w-10 h-10 rounded-lg flex items-center justify-center hover:bg-opacity-90"
        type="button"
        aria-label="Add Task"
      >
        <i className="ri-add-line w-6 h-6" style={{ width: '24px', height: '24px' }}></i>
      </button>

      <TaskModal
        isOpen={isOpen}
        onClose={handleClose}
        mode="create"
        onCreate={createTask}
      />
    </>
  )
}