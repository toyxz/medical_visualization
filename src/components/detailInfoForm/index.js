import React from 'react';
import {
  Field, Form, Input, Radio, Message,Dialog,
} from '@alifd/next';
import './index.scss';
import { connect } from 'dva';
import { withRouter } from 'dva/router';

import { notNull, checkEmail, checkTel } from '../../utils/check';
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
  WOMAN: 1,
  MAN: 0,
};
const registrationWay = {
  medicalInstitution: 0,
  agent: 1,
};

class DetailInfoForm extends React.Component {
  constructor(props) {
    super(props);
    this.field = new Field(this);
  }

  componentDidUpdate() {
    const { user } = this.props;
    const { appData: { registerDetailState, registerDetailMessage } } = user;
    // 是否提交
    if (registerDetailMessage) {
      Message.show({
        type: registerDetailState ? 'success' : 'error',
        size: 'large',
        content: registerDetailMessage,
      });
      setTimeout(() => {
        this.props.history.push('auditState');
      }, 500);
    }
  }

  handleSubmit() {
    const { validate } = this.field;
    validate((errors, values) => {
        if (errors === null ) {
          Dialog.confirm({
            title: '确认',
            content: '是否要提交所填信息',
            messageProps:{
                type: 'warning'
            },
            onOk: () => this.confirmSubmit()
          });
        }
    });
  }

  confirmSubmit() {
    const { dispatch, user } = this.props;
    const { appData: { userAccount } } = user;
    dispatch({
        type: 'user/registerDetailInfo',
        payload: {
          formData: this.field.values,
          userAccount: userAccount,
        },
    });
  }

  render() {
    const { init } = this.field;

    return (
      <Form
        className="detail-info-form"
        {...formItemLayout}
        field={this.field}>
        <FormItem label="姓名">
          <Input
            {...init('name', {
                rules:[notNull],
            })}
          />
        </FormItem>
        <FormItem
          label="性别"
        >
          <Radio.Group
            {...init('gender', {
              initValue: null,
              rules:[notNull],
            })}
          >
            <Radio value={gender.WOMAN}>女</Radio>
            <Radio value={gender.MAN}>男</Radio>
          </Radio.Group>
        </FormItem>
        <FormItem label="邮箱">
          <Input
            {...init('email', {
              rules:[notNull, checkEmail],
            })}
          />
        </FormItem>
        <FormItem label="电话">
          <Input
            {...init('tel', {
              rules:[notNull, checkTel],
            })}
          />
        </FormItem>
        <FormItem label="入驻方式">
          <Radio.Group
            {...init('registrationWay', {
              rules:[notNull],
            })}
          >
            <Radio value={registrationWay.medicalInstitution}>医疗机构</Radio>
            <Radio value={registrationWay.agent}>代理商</Radio>
          </Radio.Group>
        </FormItem>
        <FormItem label="入驻代码">
          <Input
            {...init('code', {
              rules:[notNull],
            })}
          />
        </FormItem>
        <FormItem
          className="button-group"
          wrapperCol={{ offset: 6 }}>
          <Form.Submit
            validate
            type="primary"
            onClick={() => this.handleSubmit()}
          >
            提交
          </Form.Submit>
          <Form.Reset>重置</Form.Reset>
        </FormItem>
      </Form>
    );
  }
}

function mapStateToProps(state) {
    return { user: state.user };
}
export default withRouter(connect(mapStateToProps)(DetailInfoForm));
