import React from 'react';
import { useView } from '../../context/viewContext';

export const ViewToggle: React.FC = () => {
  const { view, setView } = useView();
  
  return (
    <div className="flex gap-2">
      <button
        onClick={() => setView('list')}
        className={`w-10 h-10 rounded-lg flex items-center justify-center ${
          view === 'list'
            ? 'border-2 border-primary-4 text-primary-4'
            : 'text-neutral-1 hover:bg-gray-100'
        }`}
        aria-label="Ver como lista"
      >
        <i className="ri-menu-line w-6 h-6" style={{ width: '24px', height: '24px' }}></i>
      </button>
      <button
        onClick={() => setView('card')}
        className={`w-10 h-10 rounded-lg flex items-center justify-center ${
          view === 'card'
            ? 'border-2 border-primary-4 text-primary-4'
            : 'text-neutral-1 hover:bg-gray-100'
        }`}
        aria-label="Ver como cuadrícula"
      >
        <i className="ri-function-line w-6 h-6" style={{ width: '24px', height: '24px' }}></i>
      </button>
    </div>
  );
};