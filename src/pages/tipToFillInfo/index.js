import React from 'react';
import { withRouter } from 'dva/router';
import { Dialog } from '@alifd/next';

class TipToFillInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
    };
  }

  okClick() {
    this.props.history.push('detailInfo');
  }

  cancelClick() {
    this.props.history.push('login');
  }

  render() {
    return (
      <div>
        <Dialog
          title="注意"
          visible={this.state.visible}
          onOk={() => this.okClick()}
          onCancel={() => this.cancelClick()}
          onClose={() => this.cancelClick()}
        >
          请完善个人信息
        </Dialog>
      </div>
    );
  }
}

export default withRouter(TipToFillInfo);
