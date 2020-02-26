import React from 'react';
import {
  Table, Icon, Button, Pagination, Search,
} from '@alifd/next';
import HomePage from '../homePage';
import './index.scss';

const { Column } = Table;

class OrderList extends React.Component {
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
          <div className="order-list">
            <div className="above-banner">
              <Button
                size="large"
                className="add-order"
              >
                <Icon type="add" />
                下单
              </Button>
              <div className="search">
                <span>根据订单状态搜索</span>
                <Search
                  style={{ width: '200px' }}
                  popupContent={() => this.renderMenu()}
                  onSearch={() => this.onSearch()}
                />
              </div>
            </div>
            <Table dataSource={dataSource()}>
              <Column title="Id" htmlTitle="Unique Id" dataIndex="id" />
              <Column title="Title" dataIndex="title.name" />
              <Column title="Time" dataIndex="time" />
              <Column cell={render} />
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

export default OrderList;

const dataSource = () => {
  const result = [];
  for (let i = 0; i < 5; i++) {
    result.push({
      title: { name: `Quotation for 1PCS Nano ${3 + i}.0 controller compatible` },
      id: 100306660940 + i,
      time: 2000 + i,
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
