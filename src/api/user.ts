import axios from 'axios';

interface UserParams extends MutationParams {
  nickname: string;
}

const userAPI = {
  isAccessTokenFetching: false,

  async getAccessToken() {
    const { data } = await axios.patch<{ accessToken: string }>(
      '/user/refresh'
    );
    return data;
  },

  async getHasUserName(params: UserParams) {
    const { nickname } = params;
    const { data } = await axios.get<{ hasDuplicate: boolean }>(
      `/user/name?user_name=${encodeURIComponent(nickname)}`
    );
    return data;
  },

  async getUserEmail() {
    const { data } = await axios.get<{ email: string }>('/user/email');
    return data;
  },

  async updateUser(params: UserParams) {
    const { body } = params;
    const { data } = await axios.patch('/user/join', body);
    return data;
  },

  async getHeaderUserInfo() {
    const { data } = await axios.get<Model.User>('/user/info/header');
    return data;
  },

  async getIsLoggedIn() {
    const { data } = await axios.get<{ isLoggedIn: boolean }>(
      '/user/is-logged-in'
    );
    return data;
  },

  async logout() {
    const { data } = await axios.post('/user/logout');
    return data;
  }
};

export default userAPI;
