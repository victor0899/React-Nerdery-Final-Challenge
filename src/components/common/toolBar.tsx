import React from 'react';
import { ViewToggle } from './ViewToggle';
import { AddButton } from './AddButton';

const ToolBar: React.FC = () => {
  return (
    <div className="w-full">
      <div className="flex justify-between items-center w-full px-6 py-3">
        <ViewToggle />
        <AddButton />
      </div>
    </div>
  );
};

export default ToolBar;