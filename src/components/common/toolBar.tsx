import React from 'react';
import { ViewToggle } from './ViewToggle';
import { AddButton } from './AddButton';

const ToolBar: React.FC = () => {
  return (
    <div className="flex justify-between items-center w-full">
      <ViewToggle />
      <AddButton />
    </div>
  );
};

export default ToolBar;