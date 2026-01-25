export type Owner = {
  user_id: number;
  user_type: "particulier" | "professionnel";
  first_name: string;
  last_name: string;
  city: string;
  photo: string;
  rating_avg: number;
  rating_count: number;
}