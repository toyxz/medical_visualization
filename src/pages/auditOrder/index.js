import React from 'react';
import {
  Table, Pagination, Radio, Button,
} from '@alifd/next';
import HomePage from '../homePage';

const { Column } = Table;
class AuditOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 2,
    };
  }

  render() {
    return (
      <HomePage>
        <div className="order-list">
          <Table dataSource={dataSource()}>
            <Column title="订单流水号" dataIndex="orderNumber" />
            <Column title="订单详情" dataIndex="orderDetail" />
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

export default AuditOrder;

const dataSource = () => {
  const result = [];
  for (let i = 0; i < 5; i++) {
    result.push({
      orderNumber: '9999000000',
      orderDetail: <a href="#">查看</a>,
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
