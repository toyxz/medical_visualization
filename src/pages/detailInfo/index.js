import React from 'react';
import {
  Field, Form, Input, Radio,
} from '@alifd/next';

const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {
    fixedSpan: 10,
  },
  wrapperCol: {
    span: 14,
  },
};
const gender = {
  WOMAN: 'woman',
  MAN: 'man',
};
const registrationWay = {
  medicalInstitution: 'mi',
  agent: 'agent',
};

class DetailInfo extends React.Component {
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
      <Form {...formItemLayout}>
        <FormItem label="姓名">
          <Input
            {...init('name')}
          />
        </FormItem>
        <FormItem
          label="性别"
        >
          <Radio.Group
            {...init('gender', {
              initValue: null,
            })}
          >
            <Radio value={gender.WOMAN}>女</Radio>
            <Radio value={gender.MAN}>男</Radio>
          </Radio.Group>
        </FormItem>
        <FormItem label="邮箱">
          <Input
            {...init('email')}
          />
        </FormItem>
        <FormItem label="电话">
          <Input
            {...init('tel')}
          />
        </FormItem>
        <FormItem label="入驻方式">
          <Radio.Group
            {...init('registrationWay')}
          >
            <Radio value={registrationWay.medicalInstitution}>医疗机构</Radio>
            <Radio value={registrationWay.agent}>代理商</Radio>
          </Radio.Group>
        </FormItem>
        <FormItem label="入驻代码">
          <Input
            {...init('code')}
          />
        </FormItem>
        <FormItem wrapperCol={{ offset: 6 }}>
          <Form.Submit
            validate
            type="primary"
            onClick={() => this.handleSubmit()}
          >
            Submit
          </Form.Submit>
          <Form.Reset>Reset</Form.Reset>
        </FormItem>
      </Form>
    );
  }
}

export default DetailInfo;
