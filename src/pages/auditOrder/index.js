import React from 'react';
import {
  Table, Pagination, Radio, Button, Dialog, Form, Input, Field, Message, 
} from '@alifd/next';
import HomePage from '../homePage';
import { connect } from 'dva';
import './index.scss';

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
const comment = {
  PASS: 1,
  NOPASS: 0,
};
class AuditOrder extends React.Component {
  constructor(props) {
    super(props);
    this.field = new Field(this);
    this.state = {
      perPage: 10,
      viewDialogVisible: false,
      commentsDialogVisible: false,
      detailOrder: null,
      ifPass: 2, // 1: pass；0: nopass； 2: 未决定
      comments: {}, // 评论意见
      writeIndex: null, // 填写评论的表格索引
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'order/getAuditOrder',
      payload: {
        page: 1,
        perPage: this.state.perPage,
      },
    });
  }

  componentDidUpdate() {
    const { dispatch, order } = this.props;
    const { uiData: { auditResState, auditResMessage } } = order;
    if(auditResMessage) {
      Message.show({
        type: auditResState ? 'success': 'error',
        size: 'large',
        content: auditResMessage,
      });
      // 刷新页面（重新请求）
      dispatch({
        type: 'order/getAuditOrder',
        payload: {
          page: 1,
          perPage: this.state.perPage,
        },
      });
      // 取消提交审核状态的ui数据
      dispatch({
        type: 'order/setSubmitAuditOrder',
        payload: {
          auditResState: false,
          auditResMessage: '',
        },
      });
    }
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

  dataSource() {
    const { order } = this.props;
    const { appData: { auditOrderList } } = order;
    const { init } = this.field;
    const result = [];
    auditOrderList.forEach((item, index) => {
      result.push({
        orderNumber: item.order_number,
        orderDetail: <a href="#" onClick={() => this.showOrderDetail(item)}>查看</a>,
        ifPass: (
          <div>
            <Radio.Group
              {...init('ifPass'+index, {
                initValue: null,
              })}
            >
              <Radio value={comment.PASS}>通过</Radio>
              <Radio value={comment.NOPASS}>不通过</Radio>
            </Radio.Group>
          </div>
        ),
        opinion: <a href="#" onClick={() => this.writeComments(index)}>填写</a>,
        submit: <Button type="primary" onClick={() => this.handleSubmit(index, item.order_number)} >提交</Button>,
      });
    });
    return result;
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
      }
    });
  }

  writeComments(index) {
    // console.log('----', index)
    this.setState({
      commentsDialogVisible: true,
      writeIndex: index,
    });
  }

  handleSubmit(index, orderNumber) {
    if (this.field.getValue('ifPass'+index) === null) {
      Message.show({
        type: 'error',
        size: 'large',
        content: '还未填写审核决策',
      });
    } else if (!this.state.comments[index]) {
      Message.show({
        type: 'error',
        size: 'large',
        content: '还未填写审核意见',
      });
    } else {
        Dialog.confirm({
            title: '是否确认提交以下信息：',
            content: (
              <div>
                <div>审核决策：{this.field.getValue('ifPass'+index)===1?'通过':'不通过'}</div>
                <div>审核意见：{this.state.comments[index]}</div>
              </div>
            ),
            onOk: () => this.submitComments({
              'orderNumber': orderNumber,
              'pass': this.field.getValue('ifPass'+index),
              'comment': this.state.comments[index]
            }),
            // onCancel: () => console.log('cancel')
        });
    };
  }

  // 确认提交
  submitComments(auditObj) {
    const { dispatch } = this.props;
    const { pass, comment, orderNumber } = auditObj;
    dispatch({
      type: 'order/submitAuditOrder',
      payload: {
        orderNumber,
        passAudit: pass,
        auditComment: comment,
      },
    });
  }

  closeDislog() {
    this.setState({
      viewDialogVisible: false,
      commentsDialogVisible: false,
    });
  }

  saveComment() {
    const comments = this.state.comments;
    const newComment = {};
    newComment[this.state.writeIndex] = this.field.getValue('comment');
    // console.log('-----', newComment)
    this.setState({
      comments: {...comments, ...newComment},
      commentsDialogVisible: false,
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

  render() {
    const { order } = this.props;
    const { appData: { auditOrderTotalNumber } } = order;
    const { init } = this.field;
    return (
      <HomePage>
        <div className="order-list">
          <Table 
            dataSource={this.dataSource()}
            >
            <Column align="center" title="订单流水号" dataIndex="orderNumber" />
            <Column align="center" title="订单详情" dataIndex="orderDetail" />
            <Column align="center" title="审核决策" dataIndex="ifPass" />
            <Column align="center" title="审核意见" dataIndex="opinion" />
            <Column align="center" title=" " dataIndex="submit" />
          </Table>
          <div className="paging">
            <Pagination
              total={auditOrderTotalNumber}
              onChange={(current) => this.handleChange(current)} />
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
          <Dialog
            visible={this.state.commentsDialogVisible}
            onOk={() => this.saveComment()}
            onCancel={() => this.closeDislog()}
            onClose={() => this.closeDislog()}
          >
            <Input.TextArea
              {...init('comment', {
                initValue: this.state.comments[this.state.writeIndex],
              })}
              style={{width: '200px', height: '150px', marginTop: '20px'}}
              placeholder="请写入意见" 
              aria-label="TextArea" />
          </Dialog>
        </div>
      </HomePage>
    );
  }
}

function mapStateToProps(state) {
  return {
    order: state.order,
  };
}
export default connect(mapStateToProps)(AuditOrder);


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