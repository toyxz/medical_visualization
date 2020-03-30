import { downloadZip, getSTL, getOrderData, submitRebuildData, 
  getImgData, getClassifyOption, getClassifyValue,
  getClassfyImgData,getProcessOrder,submitProcessOrder,
} from '../services/index';

export default {
  namespace: 'data',
  state: {
    appData: {
      stlData: [],
      orderData: [],  // 重建数据列表
      orderDataNum: 0, // 重建数据总数
      imgData: {datas:[],orders:[]},   // 重建数据图片
      classifyOption: [], // 分类目标项
      classifyValue: [], // 分类目标值
      processOrder: [], // 订单审核员获取的订单
      processOrderTotal: 0, // 订单审核员获取的订单总数量
    },
    uiData: {
      submitRebuildDataState: false,
      submitRebuildDataMessage: '',
      submitProcessState: false,
      submitProcessMessage: '',
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
    // 重建数据
    setOrderData(state, action) {
      const { appData } = state;
      return {
        ...state,
        appData: {
          ...appData,
          orderData: action.payload.orderData,
          orderDataNum: action.payload.orderDataNum,
        },
      };
    },
    // 重建数据响应状态
    setSubmitRebuildData(state, action) {
      const { uiData } = state;
      return {
        ...state,
        uiData: {
          ...uiData,
          submitRebuildDataState: action.payload.submitRebuildDataState,
          submitRebuildDataMessage: action.payload.submitRebuildDataMessage,
        },
      };
    },
    setImgData(state, action) {
      const { appData } = state;
      return {
        ...state,
        appData: {
          ...appData,
          imgData: action.payload.imgData,
        },
      };
    },
    setClassfyOption(state,action) {
      const { appData } = state;
      return {
        ...state,
        appData: {
          ...appData,
          classifyOption: action.payload.classifyOption,
        },
      };
    },
    setClassValue(state,action) {
      const { appData } = state;
      return {
        ...state,
        appData: {
          ...appData,
          classifyValue: action.payload.classifyValue,
        },
      };
    },
    setProcessOrder(state,action) {
      const { appData } = state;
      return {
        ...state,
        appData: {
          ...appData,
          processOrder: action.payload.processOrder,
          processOrderTotal: action.payload.processOrderTotal,
        },
      };
    },
    setSubmitProcessOrder(state,action) {
      const { uiData } = state;
      return {
        ...state,
        uiData: {
          ...uiData,
          submitProcessState: action.payload.submitProcessState,
          submitProcessMessage: action.payload.submitProcessMessage,
        },
      };
    }
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
    * getOrderData({ payload }, { call, put }) {
      const response = yield call(getOrderData, payload);
      if (response.status === 200) {
        const { orderData, total } = response.data;
        yield put({
          type: 'setOrderData',
          payload: {
            orderData,
            orderDataNum: total,
          },
        });
      }
    },
    * submitRebuildData({ payload }, { call, put }) {
      const response = yield call(submitRebuildData, payload);
      if (response.status === 200) {
        const { success, message } = response.data;
        yield put({
          type: 'setSubmitRebuildData',
          payload: {
            submitRebuildDataState: success,
            submitRebuildDataMessage: message,
          },
        });
      }
    },
    * getImgData({ payload }, { call, put }) {
      const response = yield call(getImgData, payload);
      if (response.status === 200) {
        yield put({
          type: 'setImgData',
          payload: {
            imgData: response.data,
          },
        });
      }
    },
    *getClassifyOption({ payload }, { call, put }) {
      const response = yield call(getClassifyOption, payload);
      if (response.status === 200) {
        yield put({
          type: 'setClassfyOption',
          payload: {
            classifyOption: response.data,
          },
        });
      }
    },
    *getClassifyValue({ payload }, { call, put }) {
      const response = yield call(getClassifyValue, payload);
      if (response.status === 200) {
        yield put({
          type: 'setClassValue',
          payload: {
            classifyValue: response.data,
          },
        });
      }
    },
    *getClassfyImgData({ payload }, { call, put }) {
      const response = yield call(getClassfyImgData, payload);
      if (response.status === 200) {
        yield put({
          type: 'setImgData',
          payload: {
            imgData: response.data,
          },
        });
      }
    },
    *getProcessOrder({ payload }, { call, put }) {
      const response = yield call(getProcessOrder, payload);
      if (response.status === 200) {
        const { total, orders } = response.data;
        yield put({
          type: 'setProcessOrder',
          payload: {
            processOrder: orders,
            processOrderTotal: total,
          },
        });
      }
    },
    *submitProcessOrder({ payload }, { call, put }) {
      const response = yield call(submitProcessOrder, payload);
      if (response.status === 200) {
        const { success, message } = response.data;
        yield put({
          type: 'setSubmitProcessOrder',
          payload: {
            submitProcessState: success,
            submitProcessMessage: message,
          },
        });
      }
    }
  },
};
