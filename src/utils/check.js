const notNull = {
  required: true,
  message: '不能为空',
};

const checkEmail = {
  pattern: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
  message: '邮箱格式错误',
};

export {
  notNull,
  checkEmail,
};
