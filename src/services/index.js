const axios = require('axios');
const { transQuery } = require('../utils/dealQuery');
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
    console.log('-----result-----', result);
    if (result.status == 200) {
      const url = window.URL.createObjectURL(new Blob([result.data]));
      const link = document.createElement('a');
      link.style.display = 'none';
      link.href = url;
      link.setAttribute('download', 'daoload.zip'); // 自定义下载文件名（如exemple.txt）
      document.body.appendChild(link);
      link.click();
    }
    return result;
  });
};
// 获取图片对应的stl信息
const getSTL = (query) => {
  const url = transQuery('/api/getSTL',query);

  return axios.get(url, null, {
    headers: {
      'x-csrf-token': getCookie('csrfToken'),
    },
  }).then((result) => {
    return result;
  });
};
// 提交注册详细信息审核
const postRegisterDetailInfo = (dataInfo) => {
  return axios.post('/api/postDetailInfo', dataInfo, {
    headers: {
      'x-csrf-token': getCookie('csrfToken'),
    },
  }).then((result) => {
    return result;
  });
};
// 获取用户审核信息状态
const getRegisterState = (userAccount) => {
  return axios.get('/api/getRegisterState', userAccount, {
    headers: {
      'x-csrf-token': getCookie('csrfToken'),
    },
  }).then((result) => {
    return result;
  });
};
// 用户确认审核状态后可以进入后台
const confirmAudit = (userAccount) => {
  return axios.get('/api/confirmAudit', userAccount, {
    headers: {
      'x-csrf-token': getCookie('csrfToken'),
    },
  }).then((result) => {
    return result;
  });
};
const getUserInfo = (userAccount) => {
  return axios.get('/api/getUserInfo', userAccount, {
    headers: {
      'x-csrf-token': getCookie('csrfToken'),
    },
  }).then((result) => {
    return result;
  });
};
const getUserOrder = (userAccount) => {
  const url = transQuery('/api/getUserOrder',userAccount);
  return axios.get(url, null, {
    headers: {
      'connection': 'keep-alive',
      'x-csrf-token': getCookie('csrfToken'),
    },
  }).then((result) => {
    return result;
  });
};
const getAuditOrder = (query) => {
  const url = transQuery('/api/getAuditOrder',query);
  return axios.get(url, null, {
    headers: {
      'x-csrf-token': getCookie('csrfToken'),
    },
  }).then((result) => {
    return result;
  });
};
const submitAuditOrder = (auditObj) => {
  return axios.post('/api/submitAuditOrder', auditObj, {
    headers: {
      'x-csrf-token': getCookie('csrfToken'),
    },
  }).then((result) => {
    return result;
  });
};
// 审核员获取用户列表
const getAuditUser = (query) => {
  const url = transQuery('/api/getAuditUser',query);
  return axios.get(url, null, {
    headers: {
      'x-csrf-token': getCookie('csrfToken'),
    },
  }).then((result) => {
    return result;
  });
};
// 审核员提交审核用户意见
const submitAuditUser = (auditObj) => {
  return axios.post('/api/submitAuditUser', auditObj, {
    headers: {
      'x-csrf-token': getCookie('csrfToken'),
    },
  }).then((result) => {
    return result;
  });
};
// 数据重建员工获取数据列表
const getOrderData = (query) => {
  const url = transQuery('/api/getOrderData',query);
  return axios.get(url, null, {
    headers: {
      'x-csrf-token': getCookie('csrfToken'),
    },
  }).then((result) => {
    return result;
  });
};
// 数据重建员提交重建数据
const submitRebuildData = (dataObj) => {
  return axios.post('/api/submitRebuildData', dataObj, {
    headers: {
      'x-csrf-token': getCookie('csrfToken'),
    },
  }).then((result) => {
    return result;
  });
};
// 用户获得数据
const getImgData = (query) => {
  const url = transQuery('/api/getImgData',query);
  return axios.get(url, null, {
    headers: {
      'x-csrf-token': getCookie('csrfToken'),
    },
  }).then((result) => {
    return result;
  });
};
// 获取分类目标项
const getClassifyOption = () => {
  return axios.get('/api/getClassifyOption', null, {
    headers: {
      'x-csrf-token': getCookie('csrfToken'),
    },
  }).then((result) => {
    return result;
  });
};
// 获得分类目标值
const getClassifyValue = (query) => {
  const url = transQuery('/api/getClassifyValue',query);
  return axios.get(url, null, {
    headers: {
      'x-csrf-token': getCookie('csrfToken'),
    },
  }).then((result) => {
    return result;
  });
};
const getClassfyImgData = (query) => {
  const url = transQuery('/api/getClassfyImgData',query);
  return axios.get(url, null, {
    headers: {
      'x-csrf-token': getCookie('csrfToken'),
    },
  }).then((result) => {
    return result;
  });
};
// 获取用户角色
const getAllRole = () => {
  return axios.get('/api/getAllRole', null, {
    headers: {
      'x-csrf-token': getCookie('csrfToken'),
    },
  }).then((result) => {
    return result;
  });
};
// 添加员工
const addEmployee = (employeeInfo) => {
  return axios.post('api/addEmployee', employeeInfo, {
    headers: {
      'x-csrf-token': getCookie('csrfToken'),
    },
  }).then((result) => {
    return result;
  });
}
// 获得所有员工列表
const getAllEmployee = (query) => {
  const url = transQuery('/api/getAllEmployee',query);
  return axios.get(url, null, {
    headers: {
      'x-csrf-token': getCookie('csrfToken'),
    },
  }).then((result) => {
    return result;
  });
};
// 获取权限列表
const getAuth = (query) => {
  const url = transQuery('/api/getAuth',query);
  return axios.get(url, null, {
    headers: {
      'x-csrf-token': getCookie('csrfToken'),
    },
  }).then((result) => {
    return result;
  });
};
// 订单处理员获取订单
const getProcessOrder = (query) => {
  const url = transQuery('/api/getProcessOrder',query);
  return axios.get(url, null, {
    headers: {
      'x-csrf-token': getCookie('csrfToken'),
    },
  }).then((result) => {
    return result;
  });
};
// 订单处理员提交订单
const submitProcessOrder = (orderObj) => {
  return axios.post('/api/submitProcessOrder', orderObj, {
    headers: {
      'x-csrf-token': getCookie('csrfToken'),
    },
  }).then((result) => {
    return result;
  });
};
// 用户确认支付 
const confirmPay = (query) => {
  const url = transQuery('/api/confirmPay',query);
  return axios.get(url, null, {
    headers: {
      'x-csrf-token': getCookie('csrfToken'),
    },
  }).then((result) => {
    return result;
  });
}
module.exports = {
  postLogin,
  postEmail,
  postRegister,
  checkAuth,
  getOption,
  addOrder,
  getCookie,
  downloadZip,
  getSTL,
  postRegisterDetailInfo,
  getRegisterState,
  confirmAudit,
  getUserInfo,
  getUserOrder,
  getAuditOrder,
  submitAuditOrder,
  getAuditUser,
  submitAuditUser,
  getOrderData,
  submitRebuildData,
  getImgData,
  getClassifyOption,
  getClassifyValue,
  getClassfyImgData,
  getAllRole,
  addEmployee,
  getAllEmployee,
  getAuth,
  getProcessOrder,
  submitProcessOrder,
  confirmPay,
};
