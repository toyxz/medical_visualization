import React from 'react';
import './index.scss';

class AuthHOC extends React.Component {
componentWillReceiveProps(nextProps) {
    const { location } = nextProps;
    // URL 发生改变的时候检查是否有权限访问
    console.log('-------!!!');
    console.log(location);
    // if (location.pathname === '/' || location.pathname !== this.props.location.pathname) {
    //   checkUrlByAllowRouters(routers);
    // }
    }
  render() {
    return (
      <div style={{height: '100%'}}>
        { this.props.children }
      </div>
    );
  }
}

export default AuthHOC;
