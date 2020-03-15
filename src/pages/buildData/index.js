import React from 'react';
import { connect } from 'dva';
import { Table, Pagination, Button } from '@alifd/next';
import HomePage from '../homePage';


const { Column } = Table;

class BuildData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 2,
    };
  }

  onRowClick(record, index, e) {
    const { dispatch, data } = this.props;
    const { orderNumber } = record;
    console.log('order number------', orderNumber);
    dispatch({
      type: 'data/downloadZip',
      payload: {
        orderNumber,
      },
    });
  }

  render() {
    return (
      <HomePage>
        <div className="data-list">
          <Table dataSource={dataSource()} onRowClick={(record, index, e) => this.onRowClick(record, index, e)}>
            <Column title="订单流水号" dataIndex="orderNumber" />
            <Column title="原始数据" dataIndex="rawData" />
            <Column title="上传预览截图" dataIndex="uploadImg" />
            <Column title="  " dataIndex="submit" />
          </Table>
          <div className="paging">
            <Pagination current={this.state.current} onChange={this.handleChange} />
          </div>
        </div>
      </HomePage>
    );
  }
}

function mapStateToProps(state) {
  return { data: state.data };
}
export default connect(mapStateToProps)(BuildData);

// 后面可能改成Button
const dataSource = () => {
  const result = [];
  for (let i = 0; i < 5; i++) {
    result.push({
      orderNumber: `9999000000${i}`,
      rawData: <Button type="primary" text>下载</Button>,
      uploadImg: <Button type="primary" text>上传图片</Button>,
      submit: <Button type="primary" type="primary">提交</Button>,
    });
  }
  return result;
};
