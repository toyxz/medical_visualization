import { postLogin, postEmail, postRegister } from '../services/index';

export default {
  namespace: 'user',
  state: {
    appData: {},
    uiData: {},
  },
  effects: {
    * login({ payload }, { call, put }) {
      const response = yield call(postLogin, payload);
    },

    * sendEmail({ payload }, { call, put }) {
      const response = yield call(postEmail, payload);
      console.log('email response:  ', response); // 经常是undefined
    },

    *register({ payload }, { call, put }) {
      const response = yield call(postRegister, payload);
      console.log('register response:   ', response);
    },
  },
};
