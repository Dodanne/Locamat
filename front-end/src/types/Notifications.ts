export type Notification = {
  id: number;
  type: string;
  message: string;
  data?: {
    conversation_id?: number;
    rental_id?: number;
    equipment_id?: number;
  };
  read: boolean;
  created_at: string;
};
