import { Menu, Icon } from 'antd';
import Link from 'umi/link';

export default function Header({ location }) {
  return (
    <Menu
      selectedKeys={[location.pathname]}
      mode="horizontal"
      theme="dark"
    >
      <Menu.Item key="/">
        <Link to="/"><Icon type="home" />主页</Link>
      </Menu.Item>
      <Menu.Item key="/users">
        <Link to="/users">用户管理</Link>
      </Menu.Item>
    </Menu>
  )
};
