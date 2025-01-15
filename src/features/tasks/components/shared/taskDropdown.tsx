import React, { useState, useRef, useEffect } from 'react';

interface TaskDropdownProps {
  onEdit: (e: React.MouseEvent) => void;
  onDelete: (e: React.MouseEvent) => void;
}

export const TaskDropdown = ({ onEdit, onDelete }: TaskDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit(e);
    setIsOpen(false);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(e);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={handleToggle}
        className="p-1 hover:bg-neutral-3/20 rounded-full transition-colors"
      >
        <i className="ri-more-2-fill text-[20px] text-neutral-2 hover:text-neutral-1"></i>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1 bg-neutral-4 border border-neutral-3 rounded-lg shadow-lg z-10 min-w-[120px] py-1">
          <button
            onClick={handleEdit}
            className="w-full px-4 py-2 text-left text-sm hover:bg-neutral-3/20 text-neutral-1 flex items-center gap-2"
          >
            <i className="ri-edit-line"></i>
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="w-full px-4 py-2 text-left text-sm hover:bg-neutral-3/20 text-red-500 flex items-center gap-2"
          >
            <i className="ri-delete-bin-line"></i>
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default TaskDropdown;