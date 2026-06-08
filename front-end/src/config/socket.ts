import { io } from 'socket.io-client';

const socket = io(import.meta.env.VITE_BASE_URL, {
  auth: {
    token: localStorage.getItem('token'),
  },
  transports: ['websocket', 'polling'],
});
export default socket;
