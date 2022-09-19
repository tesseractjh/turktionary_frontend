import axios from 'axios';

const vocaAPI = {
  async getTotalVocaCount() {
    const { data } = await axios.get<Model.VocaCount>('/voca/count');
    return data;
  }
};

export default vocaAPI;
