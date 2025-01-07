import { useState } from 'react'
import { CreateTaskModal } from './createTaskModal'

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
        <i className="ri-add-line text-sm"></i>
      </button>

      <CreateTaskModal 
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  )
}