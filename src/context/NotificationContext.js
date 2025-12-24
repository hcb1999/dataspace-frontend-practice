import React, { createContext, useContext, useState } from 'react';
import Swal from 'sweetalert2';

const NotificationContext = createContext();

export const useNotification = () => {
  return useContext(NotificationContext);
};

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const showNotification = (type, title, message) => {
    Swal.fire({
      icon: type,
      title,
      text: message,
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      customClass: {
        popup: 'custom-toast',
      },
    });

    setNotifications([...notifications, { type, title, message }]);
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};


