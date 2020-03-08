import React from 'react';
import { connect } from 'dva';
import { withRouter } from 'dva/router';
import {
  Field, Form, Input, Message, Button,
} from '@alifd/next';
import './index.scss';
import { notNull, checkEmail } from '../../utils/check.js';

const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {
    fixedSpan: 6,
  },
  wrapperCol: {
    span: 14,
  },
};

class RegisterForm extends React.Component {
  constructor(props) {
    super(props);
    this.field = new Field(this);
  }

  componentDidUpdate() {
    // 只能把Message放在这里
    // 是否提交注册按钮
    const { user, dispatch } = this.props;
    const {
      appData: {
        registerState, registerMessage, emailState, emailMessage,
      },
    } = user;
    const { uiData: { ifSendRegister, ifPressEmail } } = user;

    if (ifSendRegister) {
      Message.show({
        type: registerState ? 'success' : 'error',
        size: 'large',
        content: registerMessage,
      });
      dispatch({
        type: 'user/changeifRegister',
        payload: {
          ifSendRegister: false,
        },
      });
    }
    // 是否提交了验证码按钮
    if (ifPressEmail) {
      Message.show({
        type: emailState ? 'success' : 'error',
        size: 'large',
        content: emailMessage,
      });
      dispatch({
        type: 'user/changeIfPressEmail',
        payload: {
          ifPressEmail: false,
        },
      });
    }
  }

  getVerifyCode() {
    const { email } = this.field.values;
    const { dispatch } = this.props;
    const ifError = this.field.getError('email');
    if (email && ifError === null) {
      dispatch({
        type: 'user/sendEmail',
        payload: { email },
      });
    } else {
      // 再处理
      console.log('邮箱输入错误');
    }
  }

  checkPassword() {
    const passwords = this.field.getValues(['password', 'repeatPassword']);
    return passwords.password === passwords.repeatPassword;
  }

  handleSubmit() {
    const isSamePwd = this.checkPassword();
    const { dispatch, user } = this.props;
    const { validate } = this.field;
    if (!isSamePwd) {
      Message.show({
        type: 'error',
        size: 'large',
        content: '密码输入不一致',
      });
    }
    validate((errors, values) => {
      if (errors === null && isSamePwd) {
        // 先校验密码是否一致，校验邮箱、账户名是否已经存在要放在后端处理
        dispatch({
          type: 'user/register',
          payload: this.field.values,
        });
      }
      // console.log(errors, values);
    });
  }

  render() {
    const { init } = this.field;
    const { user } = this.props;
    const { uiData } = user;
    const { appData: { registerState } } = user;
    const { ifSendEmail, countdown } = uiData;
    const codeButton = (
      <Button
        type="primary"
        onClick={() => this.getVerifyCode()}
        disabled={ifSendEmail}
      >
        {ifSendEmail === false ? '获取验证码' : `${countdown}秒后重新获取`}
      </Button>
    );
    // 若注册成功则跳转
    if (registerState) {
      setTimeout(() => {
        this.props.history.push('login');
      }, 3000);
    }
    return (
      <Form
        className="register-form"
        {...formItemLayout}
      >
        <FormItem>
          <Input
            {...init('email', {
              rules: [notNull, checkEmail],
            })}
            placeholder="邮箱"
          />
          {this.field.getError('email')
            ? <span className="reg-error-message">{this.field.getError('email').join(',')}</span> : ''}
        </FormItem>
        <FormItem>
          <Input.Group addonAfter={codeButton}>
            <Input
              {...init('verificationCode', {
                rules: [notNull],
              })}
              style={{ width: '100%' }}
            />
          </Input.Group>
          {this.field.getError('verificationCode')
            ? <span className="reg-error-message">{this.field.getError('verificationCode').join(',')}</span> : ''}
        </FormItem>
        <FormItem>
          <Input
            {...init('account', {
              rules: [notNull],
            })}
            placeholder="设置账号"
          />
          {this.field.getError('account')
            ? <span className="reg-error-message">{this.field.getError('account').join(',')}</span> : ''}
        </FormItem>
        <FormItem>
          <Input.Password
            {...init('password', {
              rules: [notNull],
            })}
            placeholder="密码"
            style={{ width: '100%' }}
          />
          {this.field.getError('password')
            ? <span className="reg-error-message">{this.field.getError('password').join(',')}</span> : ''}
        </FormItem>
        <FormItem>
          <Input.Password
            {...init('repeatPassword', {
              rules: [notNull],
            })}
            placeholder="确认密码"
          />
          {this.field.getError('repeatPassword')
            ? <span className="reg-error-message">{this.field.getError('repeatPassword').join(',')}</span> : ''}
        </FormItem>
        <FormItem>
          <Form.Submit
            className="register-form-submit-button"
            type="primary"
            onClick={() => this.handleSubmit()}
          >
            注册
          </Form.Submit>
        </FormItem>
      </Form>
    );
  }
}

function mapStateToProps(state) {
  return { user: state.user };
}
export default withRouter(connect(mapStateToProps)(RegisterForm));
