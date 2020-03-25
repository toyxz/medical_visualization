import { getAllRole } from '../services/index';
export default {
    namespace: 'role',
    state: {
        appData: {
            allRole: [], //所有角色
        },
        uiData: {

        },
    },
    reducers: {
        setAllRoler(state,action) {
            const { appData } = state;
            return {
              ...state,
              appData: {
                ...appData,
                allRole: action.payload.allRole,
              },
            };
        }
    },
    effects: {
      *getAllRole({payload}, {call, put}) {
        const response = yield call(getAllRole, payload);
        if (response.status === 200) {
            yield put({
              type: 'setAllRoler',
              payload: {
                allRole: response.data,
              },
            });
          }
      }
    }
};

// reducer effects 不能重名