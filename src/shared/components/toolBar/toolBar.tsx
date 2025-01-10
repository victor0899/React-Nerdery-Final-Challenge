import React from 'react';
import { ViewToggle } from '../toggles/viewToggle';
import { AddButton } from '../buttons/addButton';

const ToolBar: React.FC = () => {
  return (
<div className="fixed top-32 main-container h-12 flex justify-between items-center px-0 py-1 z-20">
      <div className="flex gap-4 items-center">
        <ViewToggle />
      </div>
      <AddButton />
    </div>
  );
};

export default ToolBar;