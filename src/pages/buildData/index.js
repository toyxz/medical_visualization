import React from 'react';
import { connect } from 'dva';
import { Table, Pagination, Button, Dialog, Upload, Message } from '@alifd/next';
import HomePage from '../homePage';
import './index.scss';
import { getCookie } from '../../services/index';
import checkAuth from '../../utils/checkAuth';
const { Column } = Table;

class BuildData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      perPage: 10,
      imgDialogVisible: false,
      imgValue: {},
      showImg: {},
      imgIndex: null,
      imgArray: {}, // 原数据和本地数据的映射
    };
  }
  

  componentDidMount() {
    // 获取订单
    const { dispatch } = this.props;
    dispatch({
      type: 'data/getOrderData',
      payload: {
        perPage: this.state.perPage,
        page: 1,
      },
    });
  }

  componentDidUpdate() {
    // 响应状态
    const { dispatch, data } = this.props;
    const { uiData: { submitRebuildDataState, submitRebuildDataMessage } } = data;
    if (submitRebuildDataMessage) {
      Message.show({
        type: submitRebuildDataState ? 'success' : 'error',
        size: 'large',
        content: submitRebuildDataMessage,
      });
      // 刷新页面
      dispatch({
        type: 'data/getOrderData',
        payload: {
          perPage: this.state.perPage,
          page: 1,
        },
      });
      // 重置响应状态
      dispatch({
        type: 'data/setSubmitRebuildData',
        payload: {
          submitRebuildDataState: false,
          submitRebuildDataMessage: '',
        },
      });
    }
  }

  downLoadRawData(order) {
    const { dispatch } = this.props;
    dispatch({
      type: 'data/downloadZip',
      payload: {
        orderNumber: order.order_number,
        userId: order.userid,
      },
    });
  }

  upLoadReBuildImg(orderData, index) {
    this.setState({
      imgDialogVisible: true,
      imgIndex: index,
    });
  }

  closeDislog() {
    this.setState({
      imgDialogVisible: false,
    });
  }

  saveImg() {
    this.setState({
      imgDialogVisible: false,
    });
  }

  submitData(order, index) {
    if(!this.state.imgValue[index]) {
      Message.show({
        type: 'error',
        size: 'large',
        content: '还未上传图片',
      });
    } else {
      Dialog.confirm({
        title: '是否确认提交以下信息：',
        content: (
          <div>
            <div>订单流水号: {order.order_number}</div>
            <div>重建数据图片:</div>
            <div><img height="200" width="200"  src={this.state.imgValue[index]}/></div>
          </div>
        ),
        onOk: () => this.submitRebuildData({
          'orderNumber': order.order_number,
          'img': this.state.imgValue[index],
        }),
      });
    }
  }

  // 确认提交
  submitRebuildData(dataObj) {
    const { dispatch } = this.props;
    const { img, orderNumber } = dataObj;
    dispatch({
      type: 'data/submitRebuildData',
      payload: {
        orderNumber,
        img: this.state.imgArray[img],
      },
    });
    URL.revokeObjectURL(img);
    // 重新请求
    dispatch({
      type: 'data/getOrderData',
      payload: {
        perPage: this.state.perPage,
        page: 1,
      },
    });
  }

  dataSource(orderData) {
    const result = [];
    orderData.forEach((item, index) => {
      result.push({
        orderNumber: item.order_number,
        rawData: <Button type="primary" onClick={() => this.downLoadRawData(item)} text>下载</Button>,
        uploadImg: <Button type="primary" onClick={() => this.upLoadReBuildImg(item, index)}text>上传图片</Button>,
        submit: <Button type="primary" onClick={() => this.submitData(item, index)} type="primary">提交</Button>,
      });
    });

    return result;
  };

  onUploadSuccess(file, value) {
    const imgValue = this.state.imgValue;
    const showImg = this.state.showImg;
    const imgArray = this.state.imgArray;
    const newImg = {};
    const newShowImg = {};
    const newImgArray = {};
    const objectURL = URL.createObjectURL(file.originFileObj);
    // console.log(this.state.imgIndex)
    newImg[this.state.imgIndex] = objectURL;
    newShowImg[this.state.imgIndex] = true;
    newImgArray[objectURL] = file.response.name;
    // console.log(newImg)
    this.setState({
      showImg: {...showImg, ...newShowImg},
      imgValue: {...imgValue,...newImg},
      imgArray: {...imgArray, ...newImgArray},
    });
  }

  render() {
    const { data } = this.props;
    const { appData : { orderData, orderDataNum } } = data;
    return (
      <HomePage>
        <div className="data-list">
          <Table dataSource={this.dataSource(orderData)}>
            <Column align='center' title="订单流水号" dataIndex="orderNumber" />
            <Column align='center' title="原始数据" dataIndex="rawData" />
            <Column align='center' title="上传预览截图" dataIndex="uploadImg" />
            <Column align='center' title="  " dataIndex="submit" />
          </Table>
          <div className="paging">
            <Pagination
              total={orderDataNum}
              onChange={this.handleChange} />
          </div>
        </div>
        <Dialog
          visible={this.state.imgDialogVisible}
          onOk={() => this.saveImg()}
          onCancel={() => this.closeDislog()}
          onClose={() => this.closeDislog()}
          className="img-dialog"
        > 
          {this.state.showImg[this.state.imgIndex] ?
            <img  height="200" width="200" src={this.state.imgValue[this.state.imgIndex]}/> :
            <Upload 
            // {...init('uploadData')}
            action="/api/upLoadImg"
            onSuccess={(file, value) => this.onUploadSuccess(file, value)}
            // beforeUpload={}
            multiple
            headers={{
              'x-csrf-token': getCookie('csrfToken'),
            }}
            shape="card"
            className="img-upload"
            // defaultValue={this.state.imgValue}
          >
            上传图片
          </Upload>
          }
          

        </Dialog>
      </HomePage>
    );
  }
}

function mapStateToProps(state) {
  return { data: state.data };
}
export default connect(mapStateToProps)(BuildData);


