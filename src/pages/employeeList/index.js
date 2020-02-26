import React from 'react';
import {
  Table, Icon, Button, Pagination,
} from '@alifd/next';
import HomePage from '../homePage';

const { Column } = Table;

class EmployeeList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 2,
    };
  }

  onSearch() {
    console.log('hehe');
  }

  renderMenu() {
    return [1];
  }

  render() {
    return (
      <div>
        <HomePage>
          <div className="employee-list">
            <div className="above-banner">
              <Button
                size="large"
                className="add-employee"
              >
                <Icon type="add" />
                添加
              </Button>
            </div>
            <Table dataSource={dataSource()}>
              <Column title="真实姓名" dataIndex="name" />
              <Column title="联系方式" dataIndex="tel" />
              <Column title="账号" dataIndex="account" />
              <Column title="密码" dataIndex="passward" />
              <Column title="角色" dataIndex="role" />
              <Column title=" " dataIndex="delete" />
            </Table>
            <div className="paging">
              <Pagination current={this.state.current} onChange={this.handleChange} />
            </div>
          </div>
        </HomePage>
      </div>
    );
  }
}

export default EmployeeList;

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
