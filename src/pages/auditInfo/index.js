import React from 'react';
import { Dialog } from '@alifd/next';

class AuditInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
    };
  }

  rebackLogin() {
    console.log('11');
  }

  render() {
    return (
      <div>
        <Dialog
          title="注意"
          visible={this.state.visible}
          onCancel={() => this.rebackLogin()}
          onClose={() => this.rebackLogin()}
        >
          审核中
        </Dialog>
      </div>
    );
  }
}

export default AuditInfo;
