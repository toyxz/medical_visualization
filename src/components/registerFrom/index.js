import React from 'react';
import { connect } from 'dva';
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

  getVerifyCode() {
    const { email } = this.field.values;
    const { dispatch } = this.props;
    if (email) {
      dispatch({
        type: 'user/sendEmail',
        payload: { email },
      });
    } else {
      console.log('邮箱还空着呢亲');
    }
  }

  handleSubmit() {
    const { dispatch } = this.props;
    // 注意校验（还未添加）
    // 校验成功 提交
    dispatch({
      type: 'user/register',
      payload: this.field.values,
    });
  }

  render() {
    const { init } = this.field;
    return (
      <Form
        className="register-form"
        {...formItemLayout}
      >
        <FormItem format="email">
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
              <Button
                onClick={() => this.getVerifyCode()}
              >
                获取验证码
              </Button>
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


export default connect()(RegisterForm);
