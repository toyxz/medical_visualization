import React from 'react';
import { Dialog } from '@alifd/next';
import { connect } from 'dva';
import { withRouter } from 'dva/router';
import checkAuth from '../../utils/checkAuth';

class AuditState extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
    };
  }

  componentDidMount() {
    const { dispatch, user } = this.props;
    const { appData: { userAccount } } = user;
    dispatch({
      type: 'user/getRegisterState',
      payload: userAccount,
    });
  }

  rebackLogin() {
    this.props.history.push('login');
  }

  // 当用户审核通过的时候确认，确认后进入后台
  checkstate() {
    const { dispatch, user } = this.props;
    const { appData: { auditState, userAccount } } = user;
    if (auditState === 3) {
      // 用户确认dispatch 等待确认
      dispatch({
        type: 'user/confirmAudit',
        payload: {
          userAccount,
        },
      });
    }
  }

  render() {
    const { user } = this.props;
    const { appData: { auditState } } = user;
    let message = null;
    switch(auditState) {
      case 0: 
        message = '审核中';
        break;
      case 3: 
        message = '审核通过，请确认进入后台';
        break;
      case 2: 
        message = '审核不通过';
        break;
      case 1: 
        this.props.history.push('myInfo');
        break;
    }
    return (
      <div>
        <Dialog
          title="您的审核状态为"
          style={{width: '200px', height: '200px'}}
          visible={this.state.visible}
          onOk={() => this.checkstate()}
          onCancel={() => this.rebackLogin()}
          onClose={() => this.rebackLogin()}
        >{message }
        </Dialog>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { user: state.user };
}
export default withRouter(connect(mapStateToProps)(AuditState));
