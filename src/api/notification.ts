import axios from 'axios';

const notificationAPI = {
  async getNotification() {
    const { data } = await axios.get('/notification');
    return data;
  }
};

export default notificationAPI;
