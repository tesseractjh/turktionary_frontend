import axios from 'axios';
import queryString from '@utils/queryString';

const notificationAPI = {
  async getNotification() {
    const { data } = await axios.get<Model.Notification>('/notification');
    return data;
  },

  async deleteNotification(obj: MutationParams) {
    const { data } = await axios.delete(
      `/notification?${queryString(obj?.query ?? {})}`
    );
    return data;
  },

  async deleteAllNotification() {
    const { data } = await axios.delete('/notification/all');
    return data;
  }
};

export default notificationAPI;
