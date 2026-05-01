import { FaBell, FaRegBell } from 'react-icons/fa';
import { useNotification } from '../../contexts/NotificationContext';
import FormatDate from '../../components/FormatDate';
import { AiFillNotification } from 'react-icons/ai';

export default function NotificationPage() {
  const { notifications, numberOfNotification, handleClick, markAllAsRead } = useNotification();

  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl text-gray-900">Notifications</h1>
        {numberOfNotification > 0 && (
          <button onClick={markAllAsRead} className="text-sm text-primary hover:underline">
            Tout marquer comme lu
          </button>
        )}
      </div>

      <div className="flex flex-col gap-3">
        {notifications.length === 0 ? (
          <div className="bg-white rounded-xl p-8 text-center text-gray-500">
            <FaBell className="mx-auto text-4xl mb-3 text-gray-300" />
            <p>Aucune notification pour le moment</p>
          </div>
        ) : (
          notifications.map((notif) => (
            <div
              key={notif.id}
              onClick={() => handleClick(notif)}
              className={`bg-white rounded-xl p-4 flex items-start gap-4 cursor-pointer hover:shadow-md transition-shadow border-2 ${
                notif.read ? 'border-gray-200 opacity-60' : 'border-primary'
              }`}
            >
              <div className="flex-1">
                <div className="flex items-center justify-between gap-4 text-center">
                  {!notif.read ? (
                    <>
                      <FaBell className=" text-primary text-xl" />
                      <span className="text-gray-800 text-sm">{notif.message}</span>
                      <span className="text-xs text-gray-400">{FormatDate(notif.created_at)}</span>
                    </>
                  ) : (
                    <>
                      <FaRegBell className=" text-xl" />
                      <span className="text-gray-800 text-sm">{notif.message}</span>
                      <span className="text-xs text-gray-400">{FormatDate(notif.created_at)}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
