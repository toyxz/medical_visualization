import { addEmployee, getAllEmployee } from '../services/index';

export default {
    namespace: 'employee',
    state: {
        appData: {
            employeeList: [],
            employeeListTotal: 0,
        },
        uiData: {
           addEmployeeState: false,
           addEmployeeMessage: '',
        },
    },
    reducers: {
        setAddEmployeeState(state, action) {
            const { uiData } = state;
            return {
              ...state,
              uiData: {
                ...uiData,
                addEmployeeState: action.payload.addEmployeeState,
                addEmployeeMessage: action.payload.addEmployeeMessage,
              },
            };
        },
        setAllEmployee(state, action) {
            const { appData } = state;
            return {
              ...state,
              appData: {
                ...appData,
                employeeList: action.payload.employeeList,
                employeeListTotal: action.payload.employeeListTotal,
              },
            };
        }
    },
    effects: {
        *addEmployee({payload}, {call, put} ) {
            const response = yield call(addEmployee, payload);
            if (response.status === 200) {
                const { success, message } = response.data;
                yield put({
                  type: 'setAddEmployeeState',
                  payload: {
                    addEmployeeState: success,
                    addEmployeeMessage: message,
                  },
                });
            }
        },
        *getAllEmployee({payload}, {call, put}) {
            const response = yield call(getAllEmployee, payload);
            if (response.status === 200) {
                const { total ,employeeList } = response.data;
                yield put({
                  type: 'setAllEmployee',
                  payload: {
                      employeeList,
                      employeeListTotal: total,
                  },
                });
            }
        }
    }
};