import React from 'react';
import ReactDom from 'react-dom';
import {
  Field, Form, Input, Radio, Grid,
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

  handleSubmit() {
    console.log(this.field.values);
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
              <Radio label="记住我" />
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


export default LoginForm;
