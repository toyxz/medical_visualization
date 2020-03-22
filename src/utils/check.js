const notNull = {
  required: true,
  message: '不能为空',
};

const checkEmail = {
  pattern: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
  message: '邮箱格式错误',
};

const checkTel = {
  pattern: /^1\d{10}$/,
  message: '手机号错误',
};

export {
  notNull,
  checkEmail,
  checkTel,
};
