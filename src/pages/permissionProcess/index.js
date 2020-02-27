import React from 'react';
import {
  Table, Tag, Checkbox, Button, Icon,
} from '@alifd/next';
import HomePage from '../homePage';

const { Column } = Table;
const { Group: TagGroup } = Tag;
class PermissionProcess extends React.Component {
  render() {
    return (
      <HomePage>
        <Button
          size="large"
          className="add-role"
        >
          <Icon type="add" />
          添加角色
        </Button>
        <Table dataSource={dataSource()}>
          <Column title="角色" dataIndex="role" />
          <Column title="权限" dataIndex="permissionTag" style={{ width: '500px' }} />
          <Column title="勾选" dataIndex="permissionChoice" />
          <Column title=" " dataIndex="submit" />
        </Table>
      </HomePage>
    );
  }
}

export default PermissionProcess;

const dataSource = () => {
  const result = [{
    role: '数据重建员',
    permissionTag: (
      <TagGroup>
        <Tag color="blue">下载数据</Tag>
        <Tag color="orange">重建数据</Tag>
      </TagGroup>
    ),
    permissionChoice: (
      <Checkbox.Group>
        <Checkbox value="react">React</Checkbox>
        <Checkbox value="vue">Vue</Checkbox>
        <Checkbox value="angular">Angular</Checkbox>
      </Checkbox.Group>
    ),
    submit: <Button type="primary">提交</Button>,
  }, {
    role: '审核员',
    permissionTag: (
      <TagGroup>
        <Tag color="blue">查看订单数据</Tag>
        <Tag color="orange">审核订单数据</Tag>
        <Tag color="red">审核注册信息数据</Tag>
      </TagGroup>
    ),
    permissionChoice: (
      <Checkbox.Group>
        <Checkbox value="react">React</Checkbox>
        <Checkbox value="vue">Vue</Checkbox>
        <Checkbox value="angular">Angular</Checkbox>
      </Checkbox.Group>
    ),
    submit: <Button type="primary">提交</Button>,
  }, {
    role: '订单处理',
    permissionTag: (
      <TagGroup>
        <Tag color="blue">设置订单支付金额</Tag>
        <Tag color="orange">查看订单详情</Tag>
      </TagGroup>
    ),
    permissionChoice: (
      <Checkbox.Group>
        <Checkbox value="react">React</Checkbox>
        <Checkbox value="vue">Vue</Checkbox>
        <Checkbox value="angular">Angular</Checkbox>
      </Checkbox.Group>
    ),
    submit: <Button type="primary">提交</Button>,
  }, {
    role: '用户',
    permissionTag: (
      <TagGroup>
        <Tag color="blue">提交订单</Tag>
        <Tag color="orange">查看个人信息</Tag>
        <Tag color="red">创建订单</Tag>
        <Tag color="turquoise">查看数据</Tag>
        <Tag color="yellow">下载数据</Tag>
      </TagGroup>
    ),
    permissionChoice: (
      <Checkbox.Group>
        <Checkbox value="react">React</Checkbox>
        <Checkbox value="vue">Vue</Checkbox>
        <Checkbox value="angular">Angular</Checkbox>
      </Checkbox.Group>
    ),
    submit: <Button type="primary">提交</Button>,
  }, {
    role: '超级管理员',
    permissionTag: (
      <TagGroup>
        <Tag color="blue">提交订单</Tag>
        <Tag color="orange">查看个人信息</Tag>
        <Tag color="red">创建订单</Tag>
        <Tag color="turquoise">查看数据</Tag>
        <Tag color="yellow">下载数据</Tag>
        <Tag color="blue">设置订单支付金额</Tag>
        <Tag color="orange">查看订单详情</Tag>
        <Tag color="blue">查看订单数据</Tag>
        <Tag color="orange">审核订单数据</Tag>
        <Tag color="red">审核注册信息数据</Tag>
        <Tag color="blue">下载数据</Tag>
        <Tag color="orange">重建数据</Tag>
      </TagGroup>
    ),
    permissionChoice: (
      <Checkbox.Group>
        <Checkbox value="react">React</Checkbox>
        <Checkbox value="vue">Vue</Checkbox>
        <Checkbox value="angular">Angular</Checkbox>
      </Checkbox.Group>
    ),
    submit: <Button type="primary">提交</Button>,
  }];
  return result;
};
