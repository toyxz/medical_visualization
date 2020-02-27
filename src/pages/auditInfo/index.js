import React from 'react';
import {
  Table, Pagination, Button, Radio,
} from '@alifd/next';
import HomePage from '../homePage';

const { Column } = Table;
class AuditInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 2,
    };
  }

  render() {
    return (
      <HomePage>
        <div className="info-list">
          <Table dataSource={dataSource()}>
            <Column title="姓名" dataIndex="name" />
            <Column title="性别" dataIndex="sex" />
            <Column title="邮箱" dataIndex="email" />
            <Column title="电话" dataIndex="tel" />
            <Column title="入驻方式" dataIndex="registrationWay" />
            <Column title="入驻代码" dataIndex="code" />
            <Column title="审核决策" dataIndex="ifPass" />
            <Column title="审核意见" dataIndex="opinion" />
            <Column title=" " dataIndex="submit" />
          </Table>
          <div className="paging">
            <Pagination current={this.state.current} onChange={this.handleChange} />
          </div>
        </div>
      </HomePage>
    );
  }
}

export default AuditInfo;

const result = {
  PASS: true,
  NOPASS: false,
};


const dataSource = () => {
  const result = [];
  for (let i = 0; i < 5; i++) {
    result.push({
      name: '9999000000',
      sex: '男',
      email: '137777777@qq.com',
      tel: 'xxxxxxxx',
      registrationWay: 'xxx',
      code: '11111111111',
      ifPass: (
        <div>
          <Radio.Group>
            <Radio value={result.PASS}>通过</Radio>
            <Radio value={result.NOPASS}>不通过</Radio>
          </Radio.Group>
        </div>
      ),
      opinion: <a href="#">填写</a>,
      submit: <Button type="primary">提交</Button>,
    });
  }
  return result;
};