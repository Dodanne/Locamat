import api from '../api/axios';

export function CategoriesApi() {
  async function getCategories() {
    try {
      const res = await api.get(`/category`);
      return res.data;
    } catch (err) {
      console.error(err);
      return [];
    }
  }

  return { getCategories };
}
