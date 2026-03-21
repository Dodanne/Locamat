import apiAuth from '../api/axiosAuth';
import api from '../api/axios';

export function UsersApi() {
  async function getUsers() {
    try {
      const res = await apiAuth.get('/role/users');
      return Array.isArray(res.data) ? res.data : [];
    } catch (err) {
      console.log(err);
      return [];
    }
  }
  async function deleteUser(userId: number, isBanned: boolean) {
    try {
      await apiAuth.patch(`/${userId}/ban`, { banned: !isBanned });
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
  async function getUserById(user_id: number) {
    try {
      const res = await apiAuth.get(`/user/${user_id}`);
      return res.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
  async function postUser(form: FormData) {
    try {
      const res = await api.post('/new-user', form);
      return res.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
  async function patchUser(user_id: number, form: FormData) {
    try {
      const res = await apiAuth.patch(`/edit-profile/${user_id}`, form);
      return res.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
  return { getUsers, deleteUser, getUserById, postUser, patchUser };
}
