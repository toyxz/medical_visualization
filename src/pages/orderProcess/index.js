import React from 'react';
import {
  Table, Pagination, Button, Input,
} from '@alifd/next';

import HomePage from '../homePage';

const { Column } = Table;

class OrderProcess extends React.Component {
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
            <Column title="订单流水号" dataIndex="orderNumber" align="center" />
            <Column title="订单详情" dataIndex="orderDetail" align="center" />
            <Column title="支付金额" dataIndex="payAmount" align="center" />
            <Column title="支付意见" dataIndex="payOpinion" align="center" />
            <Column title=" " dataIndex="submit" align="center" />
          </Table>
          <div className="paging">
            <Pagination current={this.state.current} onChange={this.handleChange} />
          </div>
        </div>
      </HomePage>
    );
  }
}

export default OrderProcess;


const dataSource = () => {
  const result = [];
  for (let i = 0; i < 5; ++i) {
    result.push({
      orderNumber: '9999000000',
      orderDetail: <a href="#">查看</a>,
      payAmount: <div>
        <Input style={{ width: '100px' }} />
        <span>元</span>
      </div>,
      payOpinion: <a href="#">填写</a>,
      submit: <Button type="primary">提交</Button>,
    });
  }
  return result;
};
