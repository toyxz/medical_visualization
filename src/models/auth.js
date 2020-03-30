import { getAuth } from '../services/index';
export default {
    namespace: 'auth',
    state: {
        appData: {
           auth: {}
        },
        uiData: {

        },
    },
    reducers: {
        setAuth(state, action) {
            const { appData } = state;
            return {
              ...state,
              appData: {
                ...appData,
                auth: action.payload.auth,
              },
            };
        }
    },
    effects: {
        *getAuth({payload}, {call, put}) {
            const response = yield call(getAuth, payload);
            if (response.status === 200) {
                const { state, auth } = response.data;
                yield put({
                    type: 'setAuth',
                    payload: {
                        auth,
                    },
                });
            }
        }
    }
};