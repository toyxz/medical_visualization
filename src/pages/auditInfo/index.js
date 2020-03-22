import React from 'react';
import {
  Table, Pagination, Button, Radio, Field, Dialog,  Input,Message,
} from '@alifd/next';
import { connect } from 'dva';
import HomePage from '../homePage';
import './index.scss';

const { Column } = Table;
const passOption = {
  PASS: 1,
  NOPASS: 0,
};
class AuditInfo extends React.Component {
  constructor(props) {
    super(props);
    this.field = new Field(this);
    this.state = {
      perPage: 10,
      total: 0,
      comments: [],
      writeCommentsVisible: false,
      writeIndex: null,
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'user/getAuditUser',
      payload: {
        page: 1,
        perPage: this.state.perPage,
      },
    });
  }

  componentDidUpdate() {
    const { dispatch, user } = this.props;
    const { uiData: { auditResState, auditResMessage } } = user;
    if(auditResMessage) {
      Message.show({
        type: auditResState ? 'success': 'error',
        size: 'large',
        content: auditResMessage,
      });
      // 刷新页面（重新请求）
      dispatch({
        type: 'user/getAuditUser',
        payload: {
          page: 1,
          perPage: this.state.perPage,
        },
      });
      // 取消提交审核状态的ui数据
      dispatch({
        type: 'user/setSubmitAuditUser',
        payload: {
          auditResState: false,
          auditResMessage: '',
        },
      });
    }
  }

  dataSource() {
    const { user } = this.props;
    const { appData: { auditUserList } } = user;
    const { init } = this.field;
    const result = [];
    auditUserList.forEach((item, index) => {
      result.push({
        name: item.name,
        sex: userConfig('patientSex', item.sex),
        email: item.email,
        tel: item.tel,
        registrationWay: userConfig('registrationWay',item.agent),
        code: item.code,
        ifPass: (
          <div>
            <Radio.Group
              {...init('ifPass'+index, {
                initValue: null,
              })}
            >
              <Radio value={passOption.PASS}>通过</Radio>
              <Radio value={passOption.NOPASS}>不通过</Radio>
            </Radio.Group>
          </div>
        ),
        opinion: <a href="#" onClick={() => this.writeComments(index)}>填写</a>,
        submit: <Button type="primary" onClick={() => this.handleSubmit(index)}>提交</Button>,
      });
    });

    return result;
  }

  writeComments(index) {
    this.setState({
      writeCommentsVisible: true,
      writeIndex: index,
    });
  }

  handleSubmit(index) {
    if (this.field.getValue('ifPass'+index) === null) {
      Message.show({
        type: 'error',
        size: 'large',
        content: '还未填写审核决策',
      });
    } else if (!this.state.comments[index]) {
      Message.show({
        type: 'error',
        size: 'large',
        content: '还未填写审核意见',
      });
    } else {
        Dialog.confirm({
            title: '是否确认提交以下信息：',
            content: (
              <div>
                <div>审核决策：{this.field.getValue('ifPass'+index)===1?'通过':'不通过'}</div>
                <div>审核意见：{this.state.comments[index]}</div>
              </div>
            ),
            onOk: () => this.submitComments({
              'index': index,
              'pass': this.field.getValue('ifPass'+index),
              'comment': this.state.comments[index]
            }),
        });
    };
  }

  saveComment() {
    const comments = this.state.comments;
    const newComment = {};
    newComment[this.state.writeIndex] = this.field.getValue('comment');
    this.setState({
      comments: {...comments, ...newComment},
      writeCommentsVisible: false,
    });
  }

  submitComments(auditObj) {
    const { user, dispatch } = this.props;
    const { appData: { auditUserList } } = user;
    const { index, pass, comment } = auditObj;
    dispatch({
      type: 'user/submitAuditUser',
      payload: {
        userId: auditUserList[index].id,
        passAudit: pass,
        auditComment: comment,
      },
    });
  }

  handleChange(currentPage) {
    const { dispatch } = this.props;
    dispatch({
      type: 'user/getAuditUser',
      payload: {
        page: currentPage,
        perPage: this.state.perPage,
      },
    });
  }

  render() {
    const { user } = this.props;
    const { appData: {auditUserList,auditUserTotalNumber} } = user;
    const { init } = this.field;
    return (
      <HomePage>
        <div className="info-list">
          <Table dataSource={this.dataSource()}>
            <Column align="center" title="姓名" dataIndex="name" />
            <Column align="center" title="性别" dataIndex="sex" />
            <Column align="center" title="邮箱" dataIndex="email" />
            <Column align="center" title="电话" dataIndex="tel" />
            <Column align="center" title="入驻方式" dataIndex="registrationWay" />
            <Column align="center" title="入驻代码" dataIndex="code" />
            <Column align="center" title="审核决策" dataIndex="ifPass" />
            <Column align="center" title="审核意见" dataIndex="opinion" />
            <Column align="center" title=" " dataIndex="submit" />
          </Table>
          <div className="paging">
            <Pagination
              total={auditUserTotalNumber}
              onChange={(current) => this.handleChange(current)} />
          </div>
        </div>
        <Dialog
            visible={this.state.writeCommentsVisible}
            onOk={() => this.saveComment()}
            onCancel={() => this.closeDislog()}
            onClose={() => this.closeDislog()}
          >
            <Input.TextArea
            {...init('comment', {
              initValue: this.state.comments[this.state.writeIndex],
            })}
            style={{width: '200px', height: '150px', marginTop: '20px'}}
            placeholder="请写入意见" 
            aria-label="TextArea" />
          </Dialog>
      </HomePage>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}
export default connect(mapStateToProps)(AuditInfo);



const userConfig = (indexName, value) => {
  if (indexName === 'patientSex') {
    switch(value) {
      case 0: return '男';break;
      case 1: return '女';break;
    }
  } else if(indexName === 'registrationWay') {
   switch(value) {
     case 0: return '医疗机构';break;
     case 1: return '代理商';break;
   }
  } else {
   return 'error!';
  }
}