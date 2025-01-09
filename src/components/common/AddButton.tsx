import { useState } from 'react'
import TaskModal from './taskModal'

export const AddButton = () => {
  const [isOpen, setIsOpen] = useState(false)

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
        onClose={() => setIsOpen(false)}
        mode="create"
      />
    </>
  )
}