export type User = {
  id: number;
  first_name: string;
  last_name: string;
  photo: string;
  email: string;
  password: string;
  number: string;
  street: string;
  city: string;
  postal_code: string;
  phone: string;
  user_type: string;
  company_name?: string;
  siret_number?: string;
  created_at: string;
  rating_avg: number;
  rating_count: number;
  status: string;
}