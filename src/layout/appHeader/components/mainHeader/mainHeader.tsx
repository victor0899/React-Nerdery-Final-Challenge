import React from 'react';

export const MainHeader: React.FC = () => {
  return (
    <div className="flex items-center">
      <div className="flex items-center justify-center w-6 h-6">
        <i className="ri-notification-3-line text-neutral-2 text-2xl" />
      </div>
    </div>
  );
};

export default MainHeader;