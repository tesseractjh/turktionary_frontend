import axios from 'axios';

interface VocaParams extends MutationParams {
  langId: string;
  headword: string;
  vocaOrder: number;
}

const vocaAPI = {
  async getTotalVocaCount() {
    const { data } = await axios.get<(Model.Voca & { count: number })[]>(
      '/voca/count'
    );
    return data;
  },

  async getVocaInfo(params: VocaParams) {
    const { langId, headword, vocaOrder } = params;
    const { data } = await axios.get<Model.VocaInfo>(
      `/voca?lang=${langId}&headword=${headword}&order=${vocaOrder}`
    );
    return data;
  }
};

export default vocaAPI;
