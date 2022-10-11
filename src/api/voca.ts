import axios from 'axios';

interface VocaParams extends MutationParams {
  langId: string;
  headword: string;
  vocaOrder: number;
  keyword: string;
  isLangExcluded?: boolean;
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
  },

  async getVocaList(params: VocaParams) {
    const { langId, keyword, isLangExcluded } = params;
    if (!keyword) {
      return [];
    }

    const { data } = await axios.get<Model.Voca[]>(
      `/voca/list?keyword=${keyword}${
        langId
          ? isLangExcluded
            ? `&excluded_lang=${langId}`
            : `&lang=${langId}`
          : ''
      }`
    );
    return data;
  }
};

export default vocaAPI;
