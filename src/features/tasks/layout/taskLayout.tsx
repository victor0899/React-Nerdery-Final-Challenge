import React from 'react';
import ToolBar from '../../../shared/components/toolBar/toolBar';

interface TaskLayoutProps {
  children: React.ReactNode;
}

export const TaskLayout = ({ children }: TaskLayoutProps) => {
  return (
    <div className="flex flex-col  bg-neutral-5">
      <ToolBar />
        {children}
      </div>
  );
};
export default TaskLayout;