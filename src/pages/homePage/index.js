import React from 'react';

import Banner from '../../components/banner';
import './index.scss';
import checkAuth from '../../utils/checkAuth';
import { connect } from 'dva';
import { withRouter } from 'dva/router';


class HomePage extends React.Component {

  componentDidMount() {
    const { dispatch, user } = this.props;
    const { appData: { userAccount } } = user;
    dispatch({
      type: 'auth/getAuth',
      payload: {
        userAccount,
      },
    });
  }
  render() {
    const { auth } = this.props;
    const { appData: { auth: authObj } } = auth;
    return (
      <div className="wrapper">
        <Banner auth={authObj}/>
        <div className="main">
          <div className="container">
            { this.props.children }
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    user: state.user,
  };
}
export default withRouter(connect(mapStateToProps)(HomePage));
