import { User } from './User';

export type Message = {
  message_id: number;
  conversation_id: number;
  sender_id: number;
  content: string;
  read: boolean;
  createdAt: string;
  updatedAt: string;
  receiver: User;
  sender: User;
};
