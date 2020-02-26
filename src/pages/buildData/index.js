import React from 'react';
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

  render() {
    return (
      <HomePage>
        <div className="data-list">
          <Table dataSource={dataSource()}>
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

export default BuildData;

const dataSource = () => {
  const result = [];
  for (let i = 0; i < 5; i++) {
    result.push({
      orderNumber: '9999000000',
      rawData: <a href="#">下载</a>,
      uploadImg: <a href="#">上传</a>,
      submit: <Button type="primary">提交</Button>,
    });
  }
  return result;
};
