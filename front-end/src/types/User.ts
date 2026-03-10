export type User = {
  user_id: number;
  first_name: string;
  last_name: string;
  birthday:string;
  photo: string;
  email: string;
  password: string;
  number: string;
  street: string;
  city: string;
  postal_code: string;
  latitude:number;
  longitude:number;
  phone: string;
  user_type: string;
  compagny_name?: string;
  siret?: string;
  createdAt: string;
  updatedAt:string;
  rating_avg: number;
  rating_count: number;
  status: string;
  role: string;
}