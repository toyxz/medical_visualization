import { downloadZip, getSTL } from '../services/index';

export default {
  namespace: 'data',
  state: {
    appData: {
      stlData: [],
    },
    uiData: {

    },
  },
  reducers: {
    setSTLData(state, action) {
      const { appData } = state;
      return {
        ...state,
        appData: {
          ...appData,
          stlData: action.payload.stlData,
        },
      };
    },
  },
  effects: {
    * downloadZip({ payload }, { call, put }) {
      const response = yield call(downloadZip, payload);
      console.log('------response-----', response);
    },
    * getSTL({ payload }, { call, put }) {
      const response = yield call(getSTL, payload);
      if (response.status === 200) {
        yield put({
          type: 'setSTLData',
          payload: {
            stlData: [...response.data],
          },
        });
      }
    },
  },
};
