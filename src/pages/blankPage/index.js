import React from 'react';

import Banner from '../../components/banner';
import './index.scss';
import checkAuth from '../../utils/checkAuth';
import { connect } from 'dva';
import { withRouter } from 'dva/router';


class BlankPage extends React.Component {

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

  componentDidUpdate() {
    const { auth } = this.props;
    const { appData: { auth: authObj } } = auth;
    const { userInfo, userData, userOrder,
      auditInfo, auditOrder, handleOrder,
      handleEmployee, rebuildData, handlePermission,
    } = authObj;
    // console.log(authObj)
    // console.log(Object.keys(authObj))
    // console.log(Object.keys(authObj).length)
    if (!Object.keys(authObj).length) {
        return;
    } else {
        if (userInfo.auth && userData.auth && userOrder.auth) {
        this.props.history.push('myInfo');
        } else if (auditInfo.auth && auditOrder.auth) {
        this.props.history.push('auditOrder');
        } else if (handleOrder.auth) {
        this.props.history.push('orderProcess');
        } else if (handleEmployee.auth) {
        this.props.history.push('employeeList');
        } else if (rebuildData.auth) {
        this.props.history.push('buildData');
        } else if (handlePermission.auth) {
        this.props.history.push('permissionProcess');
        } else {
        this.props.history.push('login');
        }
    }
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
export default withRouter(connect(mapStateToProps)(BlankPage));
