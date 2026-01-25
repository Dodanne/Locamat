import { Owner } from "./Owner";

export type Equipment = {
  equipment_id: number
  title: string
  description: string
  category_id: number
  photo: string
  price: number
  caution: number
  owner_id: number
  created_at: string
  updated_at:string

  owner?: Owner;
}