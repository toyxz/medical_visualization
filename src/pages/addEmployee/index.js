import React from 'react';
import {
  Form, Field, Input, Select, Upload, Button,
} from '@alifd/next';

import HomePage from '../homePage';
import './index.scss';

const FormItem = Form.Item;
const { Option } = Select;
const formItemLayout = {
  labelCol: {
    fixedSpan: 10,
  },
  wrapperCol: {
    span: 14,
  },
};

class AddEmployee extends React.Component {
  constructor(props) {
    super(props);
    this.field = new Field(this);
  }

  handleSubmit() {
    console.log('heh');
  }

  render() {
    const { init } = this.field;
    return (
      <HomePage>
        <Form
          className="employee-form"
          {...formItemLayout}
        >
          <FormItem label="姓名">
            <Input {...init('name')} />
          </FormItem>
          <FormItem label="联系方式">
            <Input {...init('tel')} />
          </FormItem>
          <FormItem label="系统角色">
            <Select {...init('role')}>
              <Option value="jack">Jack</Option>
              <Option value="frank">Frank</Option>
              <Option value="hugo">Hugo</Option>
            </Select>
          </FormItem>
          <FormItem label="系统账号">
            <Input {...init('account')} />
          </FormItem>
          <FormItem label="系统密码">
            <Input {...init('passward')} />
          </FormItem>
          <FormItem
            label=" "
            className="employee-form-submit-button"
          >
            <Form.Submit
              className="submit"
              type="primary"
              onClick={() => this.handleSubmit()}
            >
              提交
            </Form.Submit>
            <Form.Submit
              className="back"
              type="secondary"
              onClick={() => this.handleSubmit()}
            >
              返回
            </Form.Submit>
          </FormItem>
        </Form>
      </HomePage>
    );
  }
}

export default AddEmployee;
