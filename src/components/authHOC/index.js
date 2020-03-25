import React from 'react';
import './index.scss';

class AuthHOC extends React.Component {
  render() {
    return (
      <div style={{height: '100%'}}>
        { this.props.children }
      </div>
    );
  }
}

export default AuthHOC;
