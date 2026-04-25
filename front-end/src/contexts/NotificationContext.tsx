import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { Notification } from '../types/Notifications';
import { useNavigate } from 'react-router-dom';
import socket from '../config/socket';

type NotificationsContextType = {
  notifications: Notification[];
  NumberOfNotification: number;
  markAsRead: (id: number) => void;
  markAllAsRead: () => void;
  handleClick: (notif: Notification) => void;
};

const NotificationContext = createContext<NotificationsContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const navigate = useNavigate();
  const NumberOfNotification = notifications.filter((notif) => !notif.read).length;
  const markAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)),
    );
  };
  useEffect(() => {
    socket.on('notification', (data: Notification) => {
      setNotifications((prev) => [data, ...prev]);
    });
    return () => {
      socket.off('notification');
    };
  }, []);

  const handleClick = (notif: Notification) => {
    markAsRead(notif.id);
    switch (notif.type) {
      case 'nouveau_message':
        navigate(`/chat`);
        break;
      //locataire
      case 'demande_acceptee':
      case 'demande_refusee':
      case 'deamnde_annulee_par_proprietaire':
      case 'demande_confirmee_par_proprietaire':
        navigate('/user-profile', { state: { activeDiv: 'locations' } });
        break;
      //proprietaire
      case 'nouvelle_demande':
      case 'demande_annulee_par_locataire':
      case 'demande_confirmee_par_locataire':
      case 'demande_payee_par_locataire':
        navigate('/user-profile', { state: { activeDiv: 'prêts' } });
        break;
      default:
        break;
    }
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })));
  };

  return (
    <NotificationContext.Provider
      value={{ notifications, NumberOfNotification, markAsRead, markAllAsRead, handleClick }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification doit etre utilise dans un NotificationProvider');
  }
  return context;
}
