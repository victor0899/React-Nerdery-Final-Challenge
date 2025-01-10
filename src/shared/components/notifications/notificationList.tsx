import { useNotification } from '../../context/notificationContext';

const NotificationList = () => {
  const { notifications } = useNotification();

  return (
    <div className="fixed top-4 right-4 z-[200] space-y-2">
      {notifications.map(({ id, message, type }) => (
        <div
          key={id}
          className={`px-4 py-2 rounded-lg text-white shadow-lg ${
            type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-blue-500'
          }`}
        >
          {message}
        </div>
      ))}
    </div>
  );
};

export default NotificationList;
