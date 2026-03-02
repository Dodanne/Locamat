import { Rental } from "./Rental";
import { User } from "./User";

export type ReviewUser = {
  reviews_user_id: number;
  rental_id: number 
  reviewer_id: number 
  reviewed_user_id: number 
  rating: number;
  comment: string;
  status: "renter" | "owner";
  createdAt: string;
  updatedAt: string;
  reviewer?: User
  reviewedUser?:User
  rental?:Rental
};
