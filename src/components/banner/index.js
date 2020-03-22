import React from 'react';
import { Nav } from '@alifd/next';
import { withRouter } from 'dva/router';

import PageSetUpMenu from '../pageSetUpMenu';
import './index.scss';

const { Item, SubNav } = Nav;

const header = <span className="nav-left">应用名称</span>;
const footer = (
  <div className="nav-right">
    <div className="nav-news">消息</div>
    <div className="nav-setUp"><PageSetUpMenu /></div>
  </div>
);

class Banner extends React.Component {
  selectNav(selectedKeys ) {
    const key = selectedKeys[0];
    switch(key) {
      case 'personal-info': this.props.history.push('myInfo');break;
      case 'my-order': this.props.history.push('myOrder');break;
      case 'my-data': this.props.history.push('myData');break;
      case 'audit-order': this.props.history.push('auditOrder');break;
      case 'audit-info': this.props.history.push('auditInfo');break;
      case 'confirm-order': this.props.history.push('auditOrder');break;
      case 'employee-list': this.props.history.push('employeeList');break;
      case 'rebuild-data': this.props.history.push('buildData');break;
      case 'permission': this.props.history.push('permissionProcess');break;
    }
  }
  render() {
    return (
      <Nav
        className="basic-nav"
        direction="hoz"
        type="primary"
        header={header}
        footer={footer}
        triggerType="hover"
        onSelect={(selectedKeys) => this.selectNav(selectedKeys)}
      >
        <Item 
          key="personal-info"
        >个人信息</Item>
        <SubNav label="我的">
          <Item key="my-order">我的订单</Item>
          <Item key="my-data">我的数据</Item>
        </SubNav>
        <SubNav label="审核处理">
          <Item key="audit-info">审核信息</Item>
          <Item key="audit-order">审核订单</Item>
        </SubNav>
        <SubNav label="订单处理">
          <Item key="confirm-order">确认订单</Item>
        </SubNav>
        <SubNav label="员工管理">
          <Item key="employee-list">全部员工</Item>
        </SubNav>
        <Item key="rebuild-data">数据重建</Item>
        <Item key="permission">权限管理</Item>
      </Nav>
    );
  }
}

export default withRouter(Banner);
