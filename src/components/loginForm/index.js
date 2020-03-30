import React from 'react';
import { connect } from 'dva';
import { withRouter } from 'dva/router';
import {
  Field, Form, Input, Radio, Grid, Message, Checkbox, Icon,
} from '@alifd/next';
import './index.scss';
import { notNull } from '../../utils/check';

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
      const { appData: { loginState, loginMessage, identify, ifCompleteInfo } } = user;
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
      // 还是要判断员工和非员工
      if (identify) {
        this.props.history.push('blankPage');
      } else if (loginState) {
        // 判断用户审核状态
        if (ifCompleteInfo) {
          this.props.history.push('auditState');
        } else {
          this.props.history.push('fillForm');
        }
      }
    }
  }

  handleSubmit() {
    const { dispatch } = this.props;
    const { validate } = this.field;
    validate((errors, values) => {
      if (errors === null ) {
        dispatch({
          type: 'user/login',
          payload: this.field.values,
        });
      }
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
            {...init('account', {
              rules: [notNull],
            })}
            placeholder="账号"
            innerBefore={<Icon style={{paddingLeft: '10px'}} type="account" />}
          />
          {this.field.getError('account')
            ? <span className="login-error-message">{this.field.getError('account').join(',')}</span> : ''}
        </FormItem>
        <FormItem>
          <Input.Password
            {...init('password', {
              rules: [notNull],
            })}
            placeholder="密码"
            innerBefore={<Icon style={{paddingLeft: '10px'}} type="account" />}
          />
          {this.field.getError('password')
            ? <span className="login-error-message">{this.field.getError('password').join(',')}</span> : ''}
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
export default withRouter(connect(mapStateToProps)(LoginForm));
