import api from '../api/axios';
import apiAuth from '../api/axiosAuth';

export function ReviewsApi() {
  async function postUserReview(form: any) {
    try {
      await apiAuth.post('/review-user', form);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async function postEquipmentReviews(form: any) {
    try {
      await apiAuth.post('/review-equipment', form);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async function getUserIsReview(rental_id: number) {
    try {
      const res = await apiAuth.get(`/review-user/${rental_id}`);
      return res.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
  async function getEquipmentIsReview(rental_id: number) {
    try {
      const res = await apiAuth.get(`/review-equipment/${rental_id}`);

      return res.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
  async function getEquipmentReviews(equipment_id: number) {
    try {
      const res = await api.get(`/review-equipment/equipment/${equipment_id}`);
      return res.data;
    } catch (err: any) {
      if (err.response?.status === 404) return [];
      console.log(err);
      return [];
    }
  }
  async function getUserReviews(user_id: number) {
    try {
      const res = await api.get(`/review-user/user/${user_id}`);

      return res.data;
    } catch (err) {
      console.log(err);
      return [];
    }
  }
  async function getUserGivenReviews(user_id: number) {
    try {
      const res = await apiAuth.get(`/reviews-given/${user_id}`);
      return res.data;
    } catch (err) {
      console.log(err);
      return [];
    }
  }
  async function patchUserReview(
    reviewed_user_id: number,
    data: { comment: string; rating: number },
  ) {
    try {
      const res = await apiAuth.patch(`/review-user/${reviewed_user_id}`, data);
      return res.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
  async function patchEquipmentReview(
    reviewed_equipment_id: number,
    data: { comment: string; rating: number },
  ) {
    try {
      const res = await apiAuth.patch(`/review-equipment/${reviewed_equipment_id}`, data);
      return res.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  return {
    postUserReview,
    postEquipmentReviews,
    getEquipmentIsReview,
    getUserIsReview,
    getUserReviews,
    getEquipmentReviews,
    getUserGivenReviews,
    patchUserReview,
    patchEquipmentReview,
  };
}
