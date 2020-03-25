import React from 'react';
import {
  Form, Field, Input, Select, Upload, Button,Dialog, Message,
} from '@alifd/next';
import { connect } from 'dva';
import { withRouter } from 'dva/router';
import HomePage from '../homePage';
import {  notNull, checkTel } from '../../utils/check';
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

  componentDidMount() {
    // 获取系统角色
    const { dispatch } = this.props;
    dispatch({
      type: 'role/getAllRole',
    });
  }

  componentDidUpdate() {
    const { dispatch, employee } = this.props;
    const { uiData: { addEmployeeState, addEmployeeMessage } } = employee;
    if (addEmployeeMessage) {
      Message.show({
        type: addEmployeeState ? 'success': 'error',
        size: 'large',
        content: addEmployeeMessage,
      });
      // 更新UI
      dispatch({
        type: 'employee/setAddEmployeeState',
        payload: {
          addEmployeeState: false,
          addEmployeeMessage: '',
        },
      });
      // 跳转路由
      setTimeout(() => {
        this.props.history.push('employeeList');
      }, 2000)
    }
  }
  handleSubmit() {
    const { dispatch } = this.props;
    const { validate } = this.field;
    validate((errors, values) => {
      if (errors === null ) {
        Dialog.confirm({
          title: '确认',
          content: '是否要提交以下信息',
          messageProps:{
              type: 'warning'
          },
          onOk: () => this.submitAddEmployee()
        });
      }
    });
  }

  submitAddEmployee() {
    const { dispatch } = this.props;
    dispatch({
      type: 'employee/addEmployee',
      payload: this.field.values,
    });
  }

  reback() {
    this.props.history.push('employeeList');
  }
  render() {
    const { init } = this.field;
    const { role } = this.props;
    const { appData: { allRole } } = role;
    return (
      <HomePage>
        <Form
          className="employee-form"
          {...formItemLayout}
        >
          <FormItem label="姓名">
            <Input {...init('name', {
              rules: [notNull],
            })} />
            {this.field.getError('name')
            ? <span className="employee-error-message">{this.field.getError('name').join(',')}</span> : ''}
          </FormItem>
          <FormItem label="联系方式">
            <Input {...init('tel', {
              rules: [notNull, checkTel],
            })} />
            {this.field.getError('tel')
            ? <span className="employee-error-message">{this.field.getError('tel').join(',')}</span> : ''}
          </FormItem>
          <FormItem label="系统角色">
            <Select 
               placeholder="    请选择     " 
               {...init('role', {
                 rules: [notNull],
               })} 
               size="large">
              {allRole.map((item, index) => {
                return <Option value={item.name} key={index}>{item.name}</Option>
              })}
            </Select>
            {this.field.getError('role')
            ? <span className="employee-error-message">{this.field.getError('role').join(',')}</span> : ''}
          </FormItem>
          <FormItem label="系统账号">
            <Input {...init('account', {
              rules: [notNull],
            })} />
            {this.field.getError('account')
            ? <span className="employee-error-message">{this.field.getError('account').join(',')}</span> : ''}
          </FormItem>
          <FormItem label="系统密码">
            <Input {...init('passward', {
              rules: [notNull],
            })} />
            {this.field.getError('passward')
            ? <span className="employee-error-message">{this.field.getError('passward').join(',')}</span> : ''}
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
    employee: state.employee,
    role: state.role,
  };
}
export default withRouter(connect(mapStateToProps)(AddEmployee));
