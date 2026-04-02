import api from '../api/axios';

export type SearchParams = {
  q?: string;
  categories?: number[];
  maxPrice?: number;
  latitude?: number;
  longitude?: number;
  distance?: number;
};

export function EquipmentApi() {
  async function getEquipmentById(id: number) {
    try {
      const res = await api.get(`/equipment/${id}`);
      return res.data;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  async function getEquipment6First() {
    try {
      const res = await api.get(`/equipment6first`);
      return res.data;
    } catch (err) {
      console.log(err);
      return [];
    }
  }

  async function getSearchEquipment(params: SearchParams) {
    try {
      const query = new URLSearchParams();

      if (params.q) query.append('q', params.q);
      if (params.maxPrice) query.append('maxPrice', String(params.maxPrice));
      if (params.categories && params.categories.length > 0) {
        params.categories.forEach((cat) => query.append('categories', String(cat)));
      }
      if (params.latitude) query.append('latitude', String(params.latitude));
      if (params.longitude) query.append('longitude', String(params.longitude));
      if (params.distance) query.append('distance', String(params.distance));

      const res = await api.get(`/equipments/search?${query.toString()}`);

      return res.data;
    } catch (err) {
      console.log(err);
      return [];
    }
  }

  return { getEquipment6First, getEquipmentById, getSearchEquipment };
}
