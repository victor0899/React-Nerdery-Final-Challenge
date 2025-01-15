import React from 'react';
import ToolBar from '../../../shared/components/toolBar/toolBar';

interface TaskLayoutProps {
  children: React.ReactNode;
}

export const TaskLayout = ({ children }: TaskLayoutProps) => {
  return (
    <div className="flex flex-col h-full min-h-screen bg-neutral-5">
      <ToolBar />
      <div className="flex-1 p-4 lg:p-6 overflow-auto">
        {children}
      </div>
    </div>
  );
};
export default TaskLayout;