import React from 'react';
import { Dropdown, Menu, Icon } from '@alifd/next';
import { withRouter } from 'dva/router';


class PageSetUpMenu extends React.Component {
  clickMenu(item) {
    switch (item) {
      case 'logout': this.logout(); break;
      case 'modifyInfo': this.modifyInfo(); break;
      case 'cancellation': this.cancelInfo(); break;
      default: break;
    }
  }

  logout() {
    this.props.history.push('login')
  }

  modifyInfo() {
    console.log('modifyInfo');
  }

  cancelInfo() {
    console.log('cancelInfo');
  }

  render() {
    return (
      <Dropdown
        trigger={<Icon type="arrow-down" />}
        triggerType={['click', 'hover']}
      >
        <Menu style={{ width: '50px' }}>
          <Menu.Item onClick={() => this.modifyInfo()}>修改信息</Menu.Item>
          <Menu.Item onClick={() => this.logout()}>退出登录</Menu.Item>
          <Menu.Item onClick={() => this.cancelInfo()}>注销用户</Menu.Item>
        </Menu>
      </Dropdown>
    );
  }
}

export default withRouter(PageSetUpMenu);
