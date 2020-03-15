import React from 'react';
import { connect } from 'dva';
import {
  Field, Form, Input, Radio, Grid, Message, Checkbox,
} from '@alifd/next';
import './index.scss';

const FormItem = Form.Item;
const { Row, Col } = Grid;
const formItemLayout = {
  labelCol: {
    fixedSpan: 10,
  },
  wrapperCol: {
    span: 14,
  },
};

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.field = new Field(this);
  }

  componentDidUpdate() {
    if (this.props.user.uiData.ifSendLogin) {
      const { user, dispatch } = this.props;
      const { appData: { loginState, loginMessage } } = user;
      const { uiData: { ifSendLogin } } = user;
      // 是否提交登陆按钮
      if (ifSendLogin) {
        Message.show({
          type: loginState ? 'success' : 'error',
          size: 'large',
          content: loginMessage,
        });
        dispatch({
          type: 'user/changeIfLogin',
          payload: {
            ifSendLogin: false,
          },
        });
      }
    }
  }

  handleSubmit() {
    const { dispatch } = this.props;
    dispatch({
      type: 'user/login',
      payload: this.field.values,
    });
  }

  render() {
    const { init } = this.field;
    return (
      <Form
        className="login-form"
        {...formItemLayout}
      >
        <FormItem>
          <Input
            {...init('account')}
            placeholder="账号"
            innerBefore=" 😊"
          />
        </FormItem>
        <FormItem>
          <Input.Password
            {...init('password')}
            placeholder="密码"
            innerBefore=" 😊"
          />
        </FormItem>
        <FormItem>
          <Row>
            <Col span={12}>
              <Checkbox {...init('rememberMe', {
                valueName: 'checked',
              })}
              >
                记住我
              </Checkbox>
            </Col>
            <Col span={12}>
              <a href="register">忘记密码</a>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <a href="register">新用户注册</a>
            </Col>
          </Row>
        </FormItem>
        <FormItem>
          <Form.Submit
            className="login-form-submit-button"
            type="primary"
            onClick={() => this.handleSubmit()}
          >
            登录
          </Form.Submit>
        </FormItem>
      </Form>
    );
  }
}

function mapStateToProps(state) {
  return { user: state.user };
}
export default connect(mapStateToProps)(LoginForm);
