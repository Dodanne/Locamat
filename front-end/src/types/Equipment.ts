import { Owner } from './Owner';
import { Category } from './Category';

export type Equipment = {
  equipment_id: number;
  title: string;
  description: string;
  category_id: number;
  photo: string;
  price: number;
  caution: number;
  owner_id: number;
  createdAt: string;
  updatedAt: string;
  rating_avg: number;
  rating_count: number;

  owner?: Owner;
  category: Category;
};
