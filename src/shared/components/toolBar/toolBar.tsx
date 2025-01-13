import React from 'react';
import { ViewToggle } from '../toggles/viewToggle';
import { AddButton } from '../buttons/addButton';

const ToolBar: React.FC = () => {
  return (
    <div className="flex justify-between items-center w-full pt-8">
        <ViewToggle />
        <AddButton />
      </div>
  );
};
export default ToolBar;