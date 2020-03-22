import { getOption, getUserOrder, addOrder, getAuditOrder, submitAuditOrder } from '../services/index';

export default {
  namespace: 'order',
  state: {
    appData: {
      illPlaces: [],  // 患病部位选项
      illOrgans: [],       // 患病器官选项
      orderList: [],       // 用户获得订单列表
      orderTotalNumber: 0, // 用户订单量总量
      addOrderState: false, // 用户添加订单响应状态
      addOrderMessage: '', // 用户添加订单响应消息
      auditOrderList: [],   // 审核员获取的订单列表
      auditOrderTotalNumber: 0, // // 审核员获得订单量总量
    },
    uiData: {
      auditResState: false,// 审核员提交审核后的响应状态 true：修改成功； false：修改失败
      auditResMessage: '', // 审核员提交审核后的响应消息
    }
  },
  reducers: {
    // 设置订单器官、部位选项
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
    // 提交订单响应
    setAddOrder(state, action) {
      const { appData } = state;
      return {
        ...state,
        appData: {
          ...appData,
          addOrderState: action.payload.addOrderState,
          addOrderMessage: action.payload.addOrderMessage,
        },
      };
    },
    // 更新orderlist和number
    setOrderList(state, action) {
      const { appData } = state;
      return {
        ...state,
        appData: {
          ...appData,
          orderList: action.payload.orderList,
          orderTotalNumber: action.payload.orderTotalNumber,
        },
      };
    },
    // 审核员订单列表
    setAuditOrder(state, action) {
      const { appData } = state;
      return {
        ...state,
        appData: {
          ...appData,
          auditOrderList: action.payload.auditOrderList,
          auditOrderTotalNumber: action.payload.auditOrderTotalNumber,
        },
      };
    },
    // 审核员审核订单响应
    setSubmitAuditOrder(state, action) {
      const { uiData } = state;
      return {
        ...state,
        uiData: {
          ...uiData,
          auditResState: action.payload.auditResState,
          auditResMessage: action.payload.auditResMessage,
        },
      };
    }
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
    * getUserOrder({ payload }, { call, put }) {
      const response = yield call(getUserOrder, payload);
      if (response.status === 200) {
        const { total, orderList } = response.data;
        yield put({
          type: 'setOrderList',
          payload: {
            orderList,
            orderTotalNumber: total,
          },
        });
      }
    },
    * addOrder({ payload }, { call, put }) {
      const response = yield call(addOrder, payload);
      const { success, message } = response.data;
      if (response.status === 200) {
        yield put({
          type: 'setAddOrder',
          payload: {
            addOrderState: success,
            addOrderMessage: message,
          },
        });
      }
    },
    * getAuditOrder({ payload }, { call, put }) {
      const response = yield call(getAuditOrder, payload);
      if (response.status === 200) {
        const { total, orderList } = response.data;
        yield put({
          type: 'setAuditOrder',
          payload: {
            auditOrderList: orderList,
            auditOrderTotalNumber: total,
          },
        });
      }
    },
    *submitAuditOrder({ payload }, { call, put }) {
      const response = yield call(submitAuditOrder, payload);
      if (response.status === 200) {
        const { success, message } = response.data;
        yield put({
          type: 'setSubmitAuditOrder',
          payload: {
            auditResState: success,
            auditResMessage: message,
          },
        });
      }
      return response;
    }
  },
};
