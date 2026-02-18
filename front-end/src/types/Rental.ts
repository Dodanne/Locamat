import { Equipment } from "./Equipment";
import { User } from "./User";

export type Rental = {
  rental_id: number;
  start_date: string;
  end_date: string;
  status: string;
  equipment?: Equipment; 
  renter?: User;
  total_price:number
}