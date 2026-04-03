import { Equipment } from './Equipment';
import { Message } from './Message';
import { User } from './User';

export type Conversation = {
  conversation_id: number;
  owner_id: number;
  renter_id: number;
  equipment_id: number;
  createdAt: string;
  updatedAt: string;
  owner: User;
  renter: User;
  equipment: Equipment;
  messages: Message[];
};
