import React, { useState, useRef, useEffect } from 'react';

interface TaskDropdownProps {
  onEdit: () => void;
  onDelete: () => void;
}

export const TaskDropdown: React.FC<TaskDropdownProps> = ({ onEdit, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-[18px] h-4 hover:bg-neutral-3 rounded transition-colors"
      >
        <i className="ri-more-fill text-neutral-2 text-base leading-none"></i>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1 w-36 p-2 bg-neutral-3 rounded-lg border border-neutral-2 shadow-lg z-10 flex flex-col gap-2">
          <button
            onClick={() => {
              onEdit();
              setIsOpen(false);
            }}
            className="w-full px-4 py-2 text-left text-sm hover:bg-neutral-4 flex items-center gap-2 rounded-lg text-neutral-1"
          >
            <i className="ri-pencil-line"></i>
            Edit
          </button>
          <button
            onClick={() => {
              onDelete();
              setIsOpen(false);
            }}
            className="w-full px-4 py-2 text-left text-sm hover:bg-primary-4/50 flex items-center gap-2 text-neutral-1 rounded-lg"
          >
            <i className="ri-delete-bin-line"></i>
            Delete
          </button>
        </div>
      )}
    </div>
  );
};