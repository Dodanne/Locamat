import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { Notification } from '../types/Notifications';
import { useNavigate } from 'react-router-dom';
import socket from '../config/socket';

type NotificationsContextType = {
  notifications: Notification[];
  numberOfNotification: number;
  markAsRead: (id: number) => void;
  markAllAsRead: () => void;
  handleClick: (notif: Notification) => void;
  lastRentalEvent: { type: string; at: number } | null;
};

const NotificationContext = createContext<NotificationsContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [lastRentalEvent, setLastRentalEvent] = useState<{ type: string; at: number } | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>(() => {
    const keepNotifications = localStorage.getItem('notifications');
    return keepNotifications ? JSON.parse(keepNotifications) : [];
  });

  useEffect(() => {
    localStorage.setItem('notifications', JSON.stringify(notifications));
  }, [notifications]);
  const navigate = useNavigate();
  const numberOfNotification = notifications.filter((notif) => !notif.read).length;
  const markAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)),
    );
  };

  useEffect(() => {
    const handleNotif = (data: Notification) => {
      setNotifications((prev) => [data, ...prev]);
      setLastRentalEvent({ type: data.type, at: Date.now() }); // 👈
    };
    socket.on('notification', handleNotif);
    return () => {
      socket.off('notification', handleNotif);
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
      case 'demande_annulee_par_proprietaire':
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
      value={{
        notifications,
        numberOfNotification,
        markAsRead,
        markAllAsRead,
        handleClick,
        lastRentalEvent,
      }}
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
