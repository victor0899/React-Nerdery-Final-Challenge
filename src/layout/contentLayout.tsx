import React from 'react';

interface ContentLayoutProps {
  children: React.ReactNode;
}

export const ContentLayout = ({ children }: ContentLayoutProps) => {
  return (
    <div className="flex flex-col h-full">
      <div className="fixed top-32 main-container bottom-8 overflow-hidden">
        {children}
      </div>
    </div>
  );
};

export default ContentLayout;