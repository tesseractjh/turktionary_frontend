import axios from 'axios';

interface POSParams extends MutationParams {
  langId: string;
  posId: number;
  posName: string;
  posLogId: number;
}

const posAPI = {
  async getPosById(params: POSParams) {
    const { posId } = params;
    const { data } = await axios.get<Model.POS & Model.History>(
      `/pos?id=${posId}`
    );
    return data;
  },

  async getPosList(params: POSParams) {
    const { langId } = params;
    const { data } = await axios.get<
      (Model.POS & {
        examples: (string | null)[];
        example_orders: (number | null)[];
      })[]
    >(`/pos/list/${langId}`);
    return data;
  },

  async getPosByLangAndName(params: POSParams) {
    const { langId, posName } = params;
    const { data } = await axios.get<Model.POS>(
      `/pos?lang=${langId}&name=${posName}`
    );
    return data;
  },

  async getPosHistory(params: POSParams) {
    const { langId, posName } = params;
    const { data } = await axios.get<(Model.POSLog & Model.History)[]>(
      `/pos/history?lang=${langId}&name=${posName}`
    );
    return data;
  },

  async getPosHistoryDiff(params: POSParams) {
    const { posId, posLogId } = params;
    const { data } = await axios.get<Model.POSLog[]>(
      `/pos/history/diff?id=${posId}&log_id=${posLogId}`
    );
    return data;
  },

  async createPos(params: POSParams) {
    const { body } = params;
    const { data } = await axios.post('/pos', body);
    return data;
  },

  async createPosReport(params: POSParams) {
    const { body } = params;
    const { data } = await axios.post('/pos/report', body);
    return data;
  },

  async updatePos(params: POSParams) {
    const { body } = params;
    const { data } = await axios.patch('/pos', body);
    return data;
  }
};

export default posAPI;
