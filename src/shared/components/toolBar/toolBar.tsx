import React from 'react';
import { ViewToggle } from '../toggles/viewToggle';
import { AddButton } from '../buttons/addButton';

const ToolBar: React.FC = () => {
  return (
    <div className="flex justify-between items-center w-full p-4 border-b border-neutral-3">
      <div className="flex gap-4 items-center">
        <ViewToggle />
      </div>
      <AddButton />
    </div>
  );
};

export default ToolBar;