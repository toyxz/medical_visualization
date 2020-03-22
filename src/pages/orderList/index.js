import React from 'react';
import {
  Table, Icon, Button, Pagination, Search,
} from '@alifd/next';
import HomePage from '../homePage';
import { withRouter } from 'dva/router';
import { connect } from 'dva';

import './index.scss';

const { Column } = Table;

class OrderList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
      perPage: 10,
    };
  }

  componentDidMount() {
    this.cancelAddOrderState();
    const { dispatch, user } = this.props;
    const { appData: { userAccount } } = user;
    dispatch({
      type: 'order/getUserOrder',
      payload: {
        userAccount,
        page: 1,
        perPage: this.state.perPage,
      },
    });
  }

  // 取消下单页的状态
  cancelAddOrderState() {
    const { dispatch } = this.props;
    dispatch({
      type: 'order/setAddOrder',
      payload: {
        addOrderState: false,
        addOrderMessage: '',
      }
    })
  }

  componentDidUpdate() {

  }

  handleChange(currentPage) {
    const { dispatch, user } = this.props;
    const { appData: { userAccount } } = user;
    dispatch({
      type: 'order/getUserOrder',
      payload: {
        userAccount,
        page: currentPage,
        perPage: this.state.perPage,
      },
    });
  }

  onSearch() {
    console.log('hehe');
  }

  renderMenu() {
    return [1];
  }

  addOrder() {
    this.props.history.push('addOrder');
  }

  render() {
    const { order } = this.props;
    const { appData: { orderList, orderTotalNumber } } = order;
    return (
      <div>
        <HomePage>
          <div className="order-list">
            <div className="above-banner">
              <Button
                size="large"
                className="add-order"
                onClick={() => this.addOrder()}
              >
                <Icon type="add" />
                下单
              </Button>
              <div className="search">
                <span>根据订单状态搜索</span>
                <Search
                  style={{ width: '200px' }}
                  // popupContent={() => this.renderMenu()}
                  onSearch={() => this.onSearch()}
                />
              </div>
            </div>
            <Table
              dataSource={dataSource(orderList)}>
              <Column align="center" title="订单流水号" htmlTitle="Unique Id" dataIndex="orderNumber" />
              <Column align="center" title="订单状态" dataIndex="orderState" />
              <Column align="center" title="支付状态" dataIndex="payState" />
              <Column align="center" title="患病部位" dataIndex="patientPart" />
              <Column align="center" title="患病器官" dataIndex="patientOrg" />
              <Column align="center" title="病人姓名" dataIndex="patientName" />
              <Column align="center" title="病人性别" dataIndex="patientSex" />
              <Column align="center" title="病人身高/cm" dataIndex="patientHeight" />
              <Column align="center" title="病人体重/kg" dataIndex="patientWeight" />
              <Column align="center" title="支付金额" dataIndex="orderAmount" />
              <Column align="center" title="下单时间" dataIndex="createTime" />
              {/* <Column cell={render} /> */}
            </Table>
            <div className="paging">
              <Pagination
                total={orderTotalNumber}
                pageSize={this.state.perPage}
                onChange={(current) => this.handleChange(current)} 
              />
            </div>
          </div>
        </HomePage>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    order: state.order,
    user: state.user,
  };
}
export default withRouter(connect(mapStateToProps)(OrderList));

const dataSource = (orderList) => {
  const result = [];
  orderList.forEach((item, index) => {
    result.push({
      orderNumber: item.order_number,
      patientName: item.patient_name,
      patientSex: orderConfig('patientSex', item.patient_sex),
      patientHeight: item.patient_height,
      patientWeight: item.patient_weight,
      orderState: orderConfig('orderState' ,item.order_state),
      payState: orderConfig('payState', item.pay_state),
      patientPart: item.patient_part,
      patientOrg: item.patient_org,
      orderAmount: item.order_amount,
      createTime: item.create_time.slice(0,10),
    });
  });
  return result;
};
const render = (value, index, record) => {
  return (
    <a href="#">
      Remove(
      {record.id}
      )
    </a>
  );
};
const orderConfig = (indexName, value) => {
   if (indexName === 'patientSex') {
     switch(value) {
       case 0: return '男';break;
       case 1: return '女';break;
     }
   } else if(indexName === 'orderState') {
    switch(value) {
      case 0: return '未审核';break;
      case 1: return '审核通过';break;
      case 2: return '审核不通过';break;
    }
   } else if (indexName === 'payState') {
    switch(value) {
      case 0: return '未支付';break;
      case 1: return '已支付';break;
    }
   } else {
    return 'error!';
   }
}