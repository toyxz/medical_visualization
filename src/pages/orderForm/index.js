import React from 'react';
import {
  Form, Field, Input, Select, Upload, Button, Radio, Icon, Message,
} from '@alifd/next';
import { connect } from 'dva';
import { notNull } from '../../utils/check.js';
import { getCookie } from '../../services/index';

import HomePage from '../homePage';
import './index.scss';

const FormItem = Form.Item;
const { Option } = Select;
const RadioGroup = Radio.Group;
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
    this.state = {
      upload: false,
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    // 接口获取患病部位和器官
    dispatch({
      type: 'order/getOption',
    });
  }

  componentDidUpdate() {
    const { order } = this.props;
    const { appData: { addOrderState, addOrderMessage } } = order;
    if (addOrderMessage) {
      Message.show({
        type: addOrderState? 'success': 'error',
        content: addOrderMessage,
      });
      setTimeout(() => {
        this.props.history.push('/myOrder');
      }, 500);
    }
  }

  handleSubmit() {
    const { validate } = this.field;
    const { dispatch, user } = this.props;
    const { appData: { userAccount } } = user;
    validate((errors, values) => {
      if (errors === null) {
        dispatch({
          type: 'order/addOrder',
          payload: {
            formData: this.field.values,
            userAccount,
          }
        });
      }
    });
  }

  reback() {
    this.props.history.push('myOrder');
  }

  onUploadSuccess() {
    this.setState({
      upload: true,
    });
  }

  render() {
    const { init } = this.field;
    const { order } = this.props;
    const { appData: { illPlaces, illOrgans } } = order;
    return (
      <HomePage>
        <Form
          className="order-form"
          {...formItemLayout}
        >
          <FormItem label="患者名称">
            <Input {...init('name', {
              rules: [notNull],
            })}
            />
            {this.field.getError('name')
              ? <span className="order-error-message">{this.field.getError('name').join(',')}</span> : ''}
          </FormItem>
          <FormItem label="患者性别">
            <RadioGroup {...init('sex', {
              rules: [notNull],
            })}
            >
              <Radio value="0">男</Radio>
              <Radio value="1">女</Radio>
            </RadioGroup>
            {this.field.getError('sex')
              ? <span className="order-error-message">{this.field.getError('sex').join(',')}</span> : ''}
          </FormItem>
          <FormItem label="患者身高">
            <Input
              {...init('height', {
                rules: [notNull],
              })}
              innerAfter={<span className="unit">cm</span>}
            />
            {this.field.getError('height')
              ? <span className="order-error-message">{this.field.getError('height').join(',')}</span> : ''}
          </FormItem>
          <FormItem label="患者体重">
            <Input
              {...init('weight', {
                rules: [notNull],
              })}
              innerAfter={<span className="unit">kg</span>}
            />
            {this.field.getError('weight')
              ? <span className="order-error-message">{this.field.getError('weight').join(',')}</span> : ''}
          </FormItem>
          <FormItem label="患者部位">
            <Select {...init('illPlace', {
              rules: [notNull],
            })}
            >
              {illPlaces.map((item) => {
                return (<Option key={item} value={item}>{item}</Option>);
              })}
            </Select>
            {this.field.getError('illPlace')
              ? <span className="order-error-message">{this.field.getError('illPlace').join(',')}</span> : ''}
          </FormItem>
          <FormItem label="患者器官">
            <Select {...init('illOrgan', {
              rules: [notNull],
            })}
            >
              {illOrgans.map((item) => {
                return (<Option key={item} value={item}>{item}</Option>);
              })}
            </Select>
            {this.field.getError('illOrgan')
              ? <span className="order-error-message">{this.field.getError('illOrgan').join(',')}</span> : ''}
          </FormItem>
          <FormItem label="重建数据">
            <Upload
              {...init('uploadData', {
                rules: [notNull],
              })}
              action="/api/uploadFile"
              onSuccess={() => this.onUploadSuccess()}
              multiple
              headers={{
                'x-csrf-token': getCookie('csrfToken'),
              }}
            >
              <Button type="primary">Upload File</Button>
              {this.state.upload ? <Icon style={{color: 'green'}} type="select" /> : ''}
            </Upload>
            {this.field.getError('uploadData')
              ? <span className="order-error-message">{this.field.getError('uploadData').join(',')}</span> : ''}
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
              onClick={() => this.reback()}
            >
              返回
            </Form.Submit>
          </FormItem>
        </Form>
      </HomePage>
    );
  }
}
function mapStateToProps(state) {
  return { 
    order: state.order,
    user: state.user,
  };
}
export default connect(mapStateToProps)(OrderForm);
