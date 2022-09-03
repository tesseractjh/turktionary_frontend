import axios from 'axios';
import queryString from '@utils/queryString';

const userAPI = {
  async getAccessToken() {
    const { data } = await axios.patch('/user/refresh');
    return data;
  },

  async getUserInfo(condition: Partial<Model.User>, path?: string) {
    const query = queryString(condition);
    const { data } = await axios.get(`/user${path ?? ''}?${query}`);
    return data;
  },

  async getHasUserName(user_name: string) {
    const { data } = await axios(
      `/user/name?user_name=${encodeURIComponent(user_name)}`
    );
    return data;
  },

  async getUserEmail() {
    const { data } = await axios.get('/user/email');
    return data;
  },

  async updateUser(nickname: string, email: string) {
    const { data } = await axios.patch('/user/join', { nickname, email });
    return data;
  },

  async getHeaderUserInfo() {
    const { data } = await axios.get('/user/info/header');
    return data;
  }
};

export default userAPI;
