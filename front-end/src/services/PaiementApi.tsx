import apiAuth from '../api/axiosAuth';

export function PaiementApi() {
  async function postSession(rental_id: number) {
    try {
      const res = await apiAuth.post('/create-paiement-session', {
        rental_id: rental_id,
      });
      return res.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
  return { postSession };
}
