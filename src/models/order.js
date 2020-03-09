import { getOption, addOrder  } from '../services/index';

export default {
  namespace: 'order',
  state: {
      appData: {
        illPlaces: [],
        illOrgans: [],
      },
      uiData: {

      }
  },
  reducers: {
    setOption(state, action) {
        const { appData } = state;
      return {
          ...state,
          appData: {
            ...appData,
            illPlaces: action.payload.illPlaces,
            illOrgans: action.payload.illOrgans,
          },
      };
    },
  },
  effects: {
      * getOption({ payload }, { call, put }) {
        const response = yield call(getOption, payload);
        if (response.status === 200) {
            const { illPlaces, illOrgans } = response.data;
            yield put({
                type: 'setOption',
                payload: {
                    illPlaces,
                    illOrgans,
                },
            });
        }
      },
      * addOrder({ payload }, { call, put }) {
        const response = yield call(addOrder, payload);

      }
  },
};
