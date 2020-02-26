import React from 'react';
import ReactDom from 'react-dom';
import {
  Field, Form, Input, Grid, Button,
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

class RegisterForm extends React.Component {
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
        className="register-form"
        {...formItemLayout}
      >
        <FormItem>
          <Input
            {...init('email')}
            placeholder="邮箱"
          />
        </FormItem>
        <FormItem>
          <Row gutter={38}>
            <Col span={16}>
              <Input
                {...init('verificationCode')}
              />
            </Col>
            <Col span={4}>
              <Button>获取验证码</Button>
            </Col>
          </Row>
        </FormItem>
        <FormItem>
          <Input.Password
            {...init('password')}
            placeholder="密码"
          />
        </FormItem>
        <FormItem>
          <Input
            {...init('account')}
            placeholder="设置账号"
          />
        </FormItem>
        <FormItem>
          <Input.Password
            {...init('repeatPassword')}
            placeholder="确认密码"
          />
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


export default RegisterForm;
