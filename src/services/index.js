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

const checkAuth = (obj) => {
  return axios.get('/api/checkAuth', null, {
    headers: {
      'x-csrf-token': getCookie('csrfToken'),
    },
  }).then((result) => {
    return result;
  });
};
// 获取订单中关于患病部位和患病器官
const getOption = () => {
  return axios.get('/api/getPatientOption', null, {
    headers: {
      'x-csrf-token': getCookie('csrfToken'),
    },
  }).then((result) => {
    return result;
  });
};
// 用户提交订单
const addOrder = (orderInfo) => {
  return axios.post('/api/addOrder', orderInfo, {
    headers: {
      'x-csrf-token': getCookie('csrfToken'),
    },
  }).then((result) => {
    return result;
  });
};
// 工作人员下载zip文件
const downloadZip = (dataInfo) => {
  return axios.post('/api/downloadZip', dataInfo, {
    headers: {
      'x-csrf-token': getCookie('csrfToken'),
    },
    responseType: 'blob', // 设置响应数据类型
  }).then((result) => {
    console.log('-----result-----', result)
    if (result.status == 200) {
      let url = window.URL.createObjectURL(new Blob([result.data]));
      let link= document.createElement('a');
      link.style.display='none';
      link.href=url;
      link.setAttribute('download', 'daoload.zip');   // 自定义下载文件名（如exemple.txt）
      document.body.appendChild(link);
      link.click();
    }
    return result;
  });
};
module.exports = {
  postLogin,
  postEmail,
  postRegister,
  checkAuth,
  getOption,
  addOrder,
  getCookie,
  downloadZip,
};
