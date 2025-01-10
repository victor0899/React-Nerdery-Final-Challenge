import React from 'react';
import ToolBar from '../../../shared/components/toolBar/toolBar';

interface TaskLayoutProps {
  children: React.ReactNode;
}

export const TaskLayout = ({ children }: TaskLayoutProps) => {
  return (
    <div className="flex flex-col h-full">
      <ToolBar />
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
};

export default TaskLayout;