import axios from 'axios';

interface POSParams extends MutationParams {
  langId: string;
  posId: number;
  posOrder: number;
}

const posAPI = {
  async getPos(params: POSParams) {
    const { posId } = params;
    const { data } = await axios.get<Model.POSHistory>(`/pos?id=${posId}`);
    return data;
  },

  async getPosList(params: POSParams) {
    const { langId } = params;
    const { data } = await axios.get<Model.POSList[]>(`/pos/list/${langId}`);
    return data;
  },

  async getPosByLangAndName(params: POSParams) {
    const { langId, posOrder } = params;
    const { data } = await axios.get<Model.POS>(
      `/pos?lang=${langId}&order=${posOrder}`
    );
    return data;
  },

  async getPosHistory(params: POSParams) {
    const { langId, posOrder } = params;
    const { data } = await axios.get<Model.POSHistoryList>(
      `/pos/history?lang=${langId}&order=${posOrder}`
    );
    return data;
  },

  async getPosHistoryDiff(params: POSParams) {
    const { langId, posOrder, posId } = params;
    const { data } = await axios.get<{ pos: Model.POSTable[] }>(
      `/pos/history/diff?lang=${langId}&order=${posOrder}&id=${posId}`
    );
    return data;
  },

  async createPos(params: POSParams) {
    const { body } = params;
    const { data } = await axios.post<Model.POSTable>('/pos', body);
    return data;
  },

  async createPosReport(params: POSParams) {
    const { body } = params;
    const { data } = await axios.post<Model.POSTable>('/pos/report', body);
    return data;
  }
};

export default posAPI;
