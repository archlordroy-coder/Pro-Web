'use client';

import { useNotification } from './NotificationContext';

const notificationColors = {
  success: {
    bg: 'bg-green-50',
    border: 'border-green-200',
    text: 'text-green-800',
    icon: '✓',
    iconColor: 'text-green-600',
  },
  error: {
    bg: 'bg-red-50',
    border: 'border-red-200',
    text: 'text-red-800',
    icon: '✕',
    iconColor: 'text-red-600',
  },
  info: {
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    text: 'text-blue-800',
    icon: 'ℹ',
    iconColor: 'text-blue-600',
  },
  warning: {
    bg: 'bg-yellow-50',
    border: 'border-yellow-200',
    text: 'text-yellow-800',
    icon: '⚠',
    iconColor: 'text-yellow-600',
  },
};

export function NotificationContainer() {
  const { notifications, removeNotification } = useNotification();

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
      {notifications.map(notification => {
        const colors = notificationColors[notification.type];
        return (
          <div
            key={notification.id}
            className={`${colors.bg} ${colors.border} border rounded-lg p-4 shadow-lg animate-slide-in`}
          >
            <div className="flex items-start gap-3">
              <span className={`${colors.iconColor} font-bold text-lg flex-shrink-0`}>
                {colors.icon}
              </span>
              <div className="flex-1">
                <p className={`${colors.text} text-sm font-medium`}>
                  {notification.message}
                </p>
              </div>
              <button
                onClick={() => removeNotification(notification.id)}
                className={`${colors.text} flex-shrink-0 hover:opacity-70`}
              >
                ✕
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
