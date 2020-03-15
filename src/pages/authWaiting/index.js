import React from 'react';
import { withRouter } from 'dva/router';
import { connect } from 'dva';
import { Button } from '@alifd/next';

class AuthWaiting extends React.Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
  }

  componentDidUpdate() {
    if (this.props.user.appData.hasAuth) {
      this.props.history.push('/platform');
    } else {
      this.props.history.push('/login');
    }
  }

  componentDidMount() {
    // 鉴权
    const { dispatch } = this.props;
    dispatch({
      type: 'user/checkAuth',
    });
  }

  render() {
    return (
      <div>
        <h1>waiting</h1>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { user: state.user };
}
export default withRouter(connect(mapStateToProps)(AuthWaiting));


// this.props.history.push('/login');
