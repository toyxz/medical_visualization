import React from 'react';
import {
  Table, Pagination, Button, Input, Dialog,Form,Field,Message,
} from '@alifd/next';
import checkAuth from '../../utils/checkAuth';
import HomePage from '../homePage';
import { connect } from 'dva';
const { Column } = Table;
const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {
    fixedSpan: 5,
  },
  wrapperCol: {
    span: 19,
  },
};
class OrderProcess extends React.Component {
  constructor(props) {
    super(props);
    this.field = new Field(this);
    this.state = {
      perPage: 10,
      viewDialogVisible: false,
      detailOrder: {},
      imgIndex: null,
      amountArray: [],
    };
  }

  componentDidMount() {
     const { dispatch, user } = this.props;
     const { appData: { userAccount } } = user;
     dispatch({
        type: 'data/getProcessOrder',
        payload: {
          userAccount,
          perPage: this.state.perPage,
          page: 1,
        },
     });
  }

  componentDidUpdate() {
    const { dispatch, data, user } = this.props;
    const { uiData: { submitProcessState, submitProcessMessage } } = data;
    const { appData: { userAccount } } = user;
    if(submitProcessMessage) {
      Message.show({
        type: submitProcessState ? 'success': 'error',
        size: 'large',
        content: submitProcessMessage,
      });
      // 刷新页面（重新请求）
      dispatch({
        type: 'data/getProcessOrder',
        payload: {
          userAccount,
          perPage: this.state.perPage,
          page: 1,
        },
     });
      // 取消提交订单处理状态的ui数据
      dispatch({
        type: 'data/setSubmitProcessOrder',
        payload: {
          submitProcessState: false,
          submitProcessMessage: '',
        },
      });
    }
  }

  handleChange(currentPage) {
    const { dispatch, user } = this.props;
    const { appData: { userAccount } } = user;
    dispatch({
      type: 'data/getProcessOrder',
     payload: {
       userAccount,
       perPage: currentPage,
       page: 1,
     },
    });
  }

  showOrderDetail(item) {
    this.setState({
      viewDialogVisible: true,
      detailOrder: {
        '订单流水号': item.order_number,
        '机构/代理商': '暂时是代理商',
        '患者姓名': item.patient_name,
        '患者身高/cm': item.patient_height,
        '患者体重/kg': item.patient_weight,
        '患者性别': orderConfig('patientSex',item.patient_sex),
        '患病部位': item.patient_part,
        '患病器官': item.patient_org,
        // '重建数据': item.data_id,
        '重建数据': <a href="#" onClick={()=>this.downLoad(item)}>下载</a>,
        // '评估状态': item.access_id,
        '订单创建时间': item.create_time.slice(0,10),
        '重建图片': <img href="public/1.jpg" />,
      }
    });
  }

  downLoad(order) {
    const { dispatch } = this.props;
    dispatch({
      type: 'data/downloadZip',
      payload: {
        orderNumber: order.order_number,
        userId: order.userid,
      },
    });
  }

  submitData(order, index) {
    console.log()
    if(!this.field.getValue(`amount${index}`)) {
      Message.show({
        type: 'error',
        size: 'large',
        content: '还未填写金额',
      });
    } else {
      Dialog.confirm({
        title: '是否确认提交以下信息：',
        content: (
          <div>
            <div>订单流水号: </div>
            <div>{order.order_number}</div>
            <div>订单金额: </div>
            <div>{this.field.getValue(`amount${index}`)}</div>
          </div>
        ),
        onOk: () => this.submitOrder({
          'orderNumber': order.order_number,
          'amount': this.field.getValue(`amount${index}`),
        }),
      });
    }
  }

  submitOrder(submitObj) {
    const { dispatch } = this.props;
    dispatch({
      type: 'data/submitProcessOrder',
      payload: submitObj,
    });
  }

  dataSource(processOrder) {
    const { init } = this.field;
    const result = [];
    processOrder.forEach((item, index) => {
      result.push({
        orderNumber: item.order_number,
        orderDetail: <a href="#" onClick={()=>this.showOrderDetail(item)}>查看</a>,
        payAmount: <div>
          <Input
            {...init('amount'+index)}
            style={{ width: '100px' }}
          />
          <span style={{ paddingLeft: '10px'}}>元</span>
        </div>,
        // payOpinion: <a href="#">填写</a>,
        submit: <Button type="primary" onClick={() => this.submitData(item, index)}> 提交</Button>,
      });
    });
    return result;
  }

  closeDislog() {
    this.setState({
      viewDialogVisible: false,
    });
  }

  render() {
    const { data } = this.props;
    const { appData: { processOrder, processOrderTotal} } = data;
    return (
      <HomePage>
        <div className="order-list">
          <Table dataSource={this.dataSource(processOrder)}>
            <Column title="订单流水号" dataIndex="orderNumber" align="center" />
            <Column title="订单详情" dataIndex="orderDetail" align="center" />
            <Column title="支付金额" dataIndex="payAmount" align="center" />
            {/* <Column title="支付意见" dataIndex="payOpinion" align="center" /> */}
            <Column title=" " dataIndex="submit" align="center" />
          </Table>
          <div className="paging">
            <Pagination
              total={processOrderTotal}
              onChange={(current)=>this.handleChange(current)} />
          </div>
        </div>
        <Dialog
            title="订单详情"
            style={{width: '30%'}}
            onOk={() => this.closeDislog()}
            onCancel={() => this.closeDislog()}
            onClose={() => this.closeDislog()}
            visible={this.state.viewDialogVisible} >
            {/* Form无法添加classname */}
            <Form
                {...formItemLayout}
            > 
                {this.state.detailOrder && Object.keys(this.state.detailOrder).map((item, index) => {
                  return (
                    <FormItem
                      key={index}
                      label={item}>
                      <p style={{fontSize: 'bold'}}>{this.state.detailOrder[item]}</p>
                    </FormItem>
                  )
                })}
            </Form>
          </Dialog>
      </HomePage>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    data: state.data,
  };
}
export default connect(mapStateToProps)(OrderProcess);

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