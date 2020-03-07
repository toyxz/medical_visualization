const axios = require('axios');

// 封装获取 cookie 的方法
function getCookie(name) {
  let arr; const reg = new RegExp(`(^| )${name}=([^;]*)(;|$)`);
  // eslint-disable-next-line no-undef
  if (arr = document.cookie.match(reg)) return unescape(arr[2]);
  else return null;
}

const postLogin = (loginInfo) => {
  return axios.post('/api/login', loginInfo, {
    headers: {
      'x-csrf-token': getCookie('csrfToken'),
    },
  }).then((result) => {
    return result;
  });
};

const postEmail = (email) => {
  return axios.post('/api/emailVerify', email, {
    headers: {
      'x-csrf-token': getCookie('csrfToken'),
    },
  }).then((result) => {
    return result;
  });
};

const postRegister = (registerInfo) => {
  return axios.post('/api/register', registerInfo, {
    headers: {
      'x-csrf-token': getCookie('csrfToken'),
    },
  }).then((result) => {
    return result;
  });
};

module.exports = {
  postLogin,
  postEmail,
  postRegister,
};
