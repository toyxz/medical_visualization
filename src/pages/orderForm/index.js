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

class OrderForm extends React.Component {
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
          className="order-form"
          {...formItemLayout}
        >
          <FormItem label="患者名称">
            <Input {...init('name')} />
          </FormItem>
          <FormItem label="患者性别">
            <Input {...init('sex')} />
          </FormItem>
          <FormItem label="患者身高">
            <Input {...init('heigth')} />
          </FormItem>
          <FormItem label="患者体重">
            <Input {...init('weight')} />
          </FormItem>
          <FormItem label="患者部位">
            <Select {...init('illPlace')}>
              <Option value="jack">Jack</Option>
              <Option value="frank">Frank</Option>
              <Option value="hugo">Hugo</Option>
            </Select>
          </FormItem>
          <FormItem label="患者器官">
            <Select {...init('illOrgan')}>
              <Option value="jack">Jack</Option>
              <Option value="frank">Frank</Option>
              <Option value="hugo">Hugo</Option>
            </Select>
          </FormItem>
          <FormItem label="重建数据">
            <Upload {...init('uploadData')}>
              <Button type="primary">Upload File</Button>
            </Upload>
          </FormItem>
          <FormItem
            label=" "
            className="order-form-submit-button"
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

export default OrderForm;
