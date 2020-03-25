import React from 'react';
import { connect } from 'dva';
import { withRouter } from 'dva/router';

import {
  Table, Icon, Button, Pagination,
} from '@alifd/next';
import HomePage from '../homePage';
import './index.scss';
const { Column } = Table;

class EmployeeList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      perPage: 10,
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'employee/getAllEmployee',
      payload: {
        perPage: this.state.perPage,
        page: 1,
      },
    });
  }

  onSearch() {
    console.log('hehe');
  }

  renderMenu() {
    return [1];
  }

  addEmployee() {
    this.props.history.push('addEmployee');
  }

  dataSource(employeeList) {
    const result = [];
    employeeList.forEach((item, index) => {
      result.push({
        name: item.name,
        tel: item.tel,
        account: item.account,
        passward: item.password,
        role: item.roleName,
        delete: <Button>删除</Button>,
      });
    });
    return result;
  }

  handleChange(currentPage) {
    const { dispatch } = this.props;
    dispatch({
      type: 'employee/getAllEmployee',
      payload: {
        perPage: this.state.perPage,
        page: currentPage,
      },
    });
  }
  render() {
    const { employee } = this.props;
    const { appData: { employeeList, employeeListTotal }} = employee;
    return (
      <div>
        <HomePage>
          <div className="employee-list">
            <div className="above-banner">
              <Button
                size="large"
                className="add-employee"
                onClick={()=>this.addEmployee()}
              >
                <Icon type="add" />
                添加
              </Button>
            </div>
            <Table dataSource={this.dataSource(employeeList)}>
              <Column align='center' title="真实姓名" dataIndex="name" />
              <Column align='center' title="联系方式" dataIndex="tel" />
              <Column align='center' title="账号" dataIndex="account" />
              <Column align='center' title="密码" dataIndex="passward" />
              <Column align='center' title="角色" dataIndex="role" />
              <Column align='center' title=" " dataIndex="delete" />
            </Table>
            <div className="paging">
              <Pagination
                total={employeeListTotal}
                onChange={(current)=>this.handleChange(current)} />
            </div>
          </div>
        </HomePage>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    employee: state.employee,
  };
}
export default withRouter(connect(mapStateToProps)(EmployeeList));

const dataSource = () => {
  const result = [];
  for (let i = 0; i < 5; i++) {
    result.push({
      name: 'xxx',
      tel: 100306660940 + i,
      account: 2000 + i,
      passward: 2000 + i,
      role: 2000 + i,
      delete: <Button>删除</Button>,
    });
  }
  return result;
};
const render = (value, index, record) => {
  return (
    <a href="javascript:;">
      Remove(
      {record.id}
      )
    </a>
  );
};
