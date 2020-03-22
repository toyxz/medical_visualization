import React from 'react';
import { connect } from 'dva';
import { Form } from '@alifd/next';
import HomePage from '../homePage';
import './index.scss';

const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {
    fixedSpan: 10,
  },
  wrapperCol: {
    span: 14,
  },
};
class MyInfo extends React.Component {

    componentDidMount() {
      // 获取用户信息。便于展示
      const { dispatch, user } = this.props;
      const { appData: { userAccount } } = user;
      dispatch({
          type: 'user/getUserInfo',
          payload: {
            userAccount,
          }
      });
    }

    render() {
        const { user } = this.props;
        const { appData: { userInfo } } = user;
        return (
            <HomePage>
                { userInfo ? 
                    <Form
                        className="my-form"
                        {...formItemLayout}
                        size="large"
                    >
                        <FormItem label="名字:">
                            <p>{userInfo.name}</p>
                        </FormItem>
                        <FormItem label="邮件:">
                            <p>{userInfo.email}</p>
                        </FormItem>
                        <FormItem label="电话:">
                            <p>{userInfo.tel}</p>
                        </FormItem>
                        <FormItem label="机构类型:">
                            <p>{userInfo.agent === 0 ? '医疗机构': '代理商'}</p>
                        </FormItem>
                        <FormItem label="机构代码:">
                            <p>{userInfo.code}</p>
                        </FormItem>
                    </Form> : ''
                }

            </HomePage>
        )
    }
}

function mapStateToProps(state) {
    return { user: state.user };
  }
export default connect(mapStateToProps)(MyInfo);