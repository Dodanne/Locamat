import { Equipment } from "./Equipment";
import { User } from "./User";

export type RentalStatus = 'pending' | 'accepted' | 'refused' | 'completed' | 'cancelled_by_owner' | 'cancelled_by_renter' | 'confirmed';

export type Rental = {
  rental_id: number;
  start_date: string;
  end_date: string;
  status: RentalStatus;
  equipment?: Equipment; 
  renter?: User;
  total_price:number
  owner?: User

}