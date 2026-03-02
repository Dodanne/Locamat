import { Rental } from "./Rental";
import { User } from "./User";

export type ReviewEquipment = {
  reviews_equipment_id: number;
  rental_id: number 
  reviewer_id: number 
  reviewed_user_id: number 
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
  reviewer?: User
  rental?: Rental
};