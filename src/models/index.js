import { postLogin, postEmail, postRegister } from '../services/index';
export default {
  namespace: 'user',
  state: {
    appData: {
      registerState: false, // false: 注册失败; true: 注册成功
      registerMessage: '',  // 注册响应信息
      emailState: false,    // false: 邮件发送失败; true: 邮件发送成功
      emailMessage: '',     // 邮件验证码响应信息
      loginState: false,    // false: 登陆失败; true: 登陆成功
      loginMessage: '',     // 登陆响应信息
    },
    uiData: {
      ifPressEmail: false, // 是否按下了 发送邮箱验证码 的按钮，如果按下了那么要有对应Message弹出
      ifSendEmail: false, // 是否成功发送邮箱验证码（不需要管发送成功或者失败）
      countdown: 3,
      ifSendRegister: false, // 是否点击注册按钮
      ifSendLogin: false,    // 是否成功发送登陆信息并得到响应（不需要管登陆成功或者失败）
    },
  },
  reducers: {
    // 获取验证码按钮恢复原状
    sendEmailAgain(state) {
      const { uiData } = state;
      return {
        ...state,
        uiData: {
          ...uiData,
          ifSendEmail: false,
          countdown: 3,
        },
      };
    },

    // 获取验证码按钮开始倒计时 
    getCodeToZero(state) {
      const { uiData } = state;
      return {
        ...state,
        uiData: {
          ...uiData,
          ifSendEmail: true,
        },
      };
    },

    // 获取验证码按钮开始倒计时 
    countDown(state) {
      const { uiData } = state;
      const { countdown } = uiData;
      return {
        ...state,
        uiData: {
          ...uiData,
          countdown: countdown-1,
        },
      };
    },

    // 点击注册按钮后 的响应信息
    setRegisterMessage(state, action) {
      const { appData } = state;
      return {
        ...state,
        appData: {
          ...appData,
          registerState: action.payload.registerState,
          registerMessage: action.payload.registerMessage,
        },
      };
    },

    // 点击获取验证码后 的响应信息
    setEmailCodeMessage(state, action) {
      const { appData } = state;
      return {
        ...state,
        appData: {
          ...appData,
          emailState: action.payload.emailState,
          emailMessage: action.payload.emailMessage,
        },
      };
    },

    // 点击登陆按钮后 的响应信息
    setLoginMessage(state, action) {
      const { appData } = state;
      return {
        ...state,
        appData: {
          ...appData,
          loginState: action.payload.loginState,
          loginMessage: action.payload.loginMessage,
        },
      };
    },

    // 是否提交注册 （此reducer的目的是为了更新UI，弹出Message）
    changeifRegister(state, action) {
      const { uiData } = state;
      return {
        ...state,
        uiData: {
          ...uiData,
          ifSendRegister: action.payload.ifSendRegister,
        },
      };
    },

    // 是否点击了 获取验证码 的按钮，需要更新UI
    changeIfPressEmail(state, action) {
      const { uiData } = state;
      return {
        ...state,
        uiData: {
          ...uiData,
          ifPressEmail: action.payload.ifPressEmail,
        },
      };
    },
    // 是否点击了 登陆 的按钮，需要更新UI
    changeIfLogin(state, action) {
      const { uiData } = state;
      return {
        ...state,
        uiData: {
          ...uiData,
          ifSendLogin: action.payload.ifSendLogin,
        },
      };
    },

  },
  effects: {
    * login({ payload }, { call, put }) {
      const response = yield call(postLogin, payload);
      if (response.status === 200) {
        const { success, message } = response.data;
        yield put({
          type: 'setLoginMessage',
          payload: {
            loginState: success,
            loginMessage: message,
          },
        });
        yield put({
          type: 'changeIfLogin',
          payload: {
            ifSendLogin: true,
          },
        });
      }
    },

    * sendEmail({ payload }, { call, put, select }) {
      const response = yield call(postEmail, payload);
      const { success, message } = response.data;
      let countDownNumber = yield select(state => state.user.uiData.countdown);
      // 不管邮件发送成功还是失败都要修改UI，才能有提示（这也是dva的一个痛点）
      yield put({
        type: 'setEmailCodeMessage',
        payload: {
          emailState: success,
          emailMessage: message,
        },
      });
      yield put({
        type: 'changeIfPressEmail',
        payload: {
          ifPressEmail: true,
        },
      });
      // 邮件发送成功 success 为true, 开始倒数
      if (response && response.data && response.data.success) {
        yield put({ type: 'getCodeToZero' });
        // 执行倒计时
        const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
        while(countDownNumber--) {
          yield call(delay, 1000); // 延时1s之后进行下一次的while循环执行
          yield put({ type: 'countDown' });
        }
        yield put({ type: 'sendEmailAgain' });
      }
    },

    * register({ payload }, { call, put }) {
      const response = yield call(postRegister, payload);
      const { success, message } = response.data;
      yield put({
        type: 'setRegisterMessage',
        payload: {
          registerState: success,
          registerMessage: message,
        },
      });
      yield put({
        type: 'changeifRegister',
        payload: {
          ifSendRegister: true,
        },
      });
    },
  },
};
