import { downloadZip  } from '../services/index';

export default {
  namespace: 'data',
  state: {
      appData: {

      },
      uiData: {

      }
  },
  reducers: {

  },
  effects: {
    * downloadZip({ payload }, { call, put }) {
        const response = yield call(downloadZip, payload);
        console.log('------response-----', response);
    }
  },
};
