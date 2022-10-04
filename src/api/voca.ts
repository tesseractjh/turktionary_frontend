import axios from 'axios';

const vocaAPI = {
  async getTotalVocaCount() {
    const { data } = await axios.get<(Model.Voca & { count: number })[]>(
      '/voca/count'
    );
    return data;
  }
};

export default vocaAPI;
