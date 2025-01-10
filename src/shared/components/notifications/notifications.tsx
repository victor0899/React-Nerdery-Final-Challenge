import React from 'react';
import { useNotification } from '../../context/notificationContext';

export const Notifications: React.FC = () => {
  const { notifications, removeNotification } = useNotification();

  return (
    <div className="fixed top-0 right-0 p-4 space-y-2 z-50">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`p-3 rounded-lg shadow-md ${
            notification.type === 'success' ? 'bg-green-500' :
            notification.type === 'error' ? 'bg-red-500' :
            notification.type === 'warning' ? 'bg-yellow-500' :
            'bg-blue-500'
          } text-white`}
        >
          <div className="flex items-center justify-between">
            <span>{notification.message}</span>
            <button
              onClick={() => removeNotification(notification.id)}
              className="ml-4 text-white hover:text-gray-300"
            >
              ✕
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
