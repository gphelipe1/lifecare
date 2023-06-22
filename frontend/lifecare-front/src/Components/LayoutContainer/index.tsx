import { useState } from 'react';

import { Button, Layout, Menu, theme } from 'antd';

import {
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {  Navigate, Outlet, useNavigate } from 'react-router-dom';
import Title from 'antd/es/typography/Title';
import { getName, isAuthenticated, logout } from '../../Services/auth';
import { Role } from '../../Types/Usertypes';

interface LayoutContainerProps
{
  role: Role,
}

const { Header, Sider, Content } = Layout;

const LayoutContainer: React.FC = () => {

  const [collapsed, setCollapsed] = useState(false);
  const navigateTo = useNavigate();

  const auth = isAuthenticated();

  const menuData = [
    {
        key: 'home',
        icon: <UserOutlined />,
        label: 'My Records',
    },
  ];

  const {
    token: { colorBgContainer },
  } = theme.useToken();

   return (
    <>
    { auth ?
      <Layout style={{height: '100%'}}>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="demo-logo-vertical" />
          <Menu
            title='Life Care'
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['home']}
            items={menuData}
            onClick = {({key}) => {
              return navigateTo(`/${key}`);
            }}
          />
        </Sider>
        <Layout>
          <Header style={{ padding: 0, background: colorBgContainer, display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <div style={{display: 'flex', alignItems: 'center !important'}}>
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                  fontSize: '16px',
                  width: 64,
                  height: 64,
                }}
              />
              <>
                <Title style={{ marginTop: '1rem'}} level={4}>
                  {getName()}
                </Title>
              </>
            </div>
            <Button
              type="primary"
              icon={<LogoutOutlined />}
              style={{
                background: 'none',
                color: 'black',
                border: 'none',
                boxShadow: 'none',
                marginRight: '1rem',
              }}
              onClick={() => {
                logout();
                navigateTo('/login');
              }
              }
            >
              Logout
            </Button>
          </Header>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
              height: '100%',
            }}
          >
            <Outlet/>
          </Content>
        </Layout>
      </Layout> :  <Navigate to="/login" />}</>
  )
}

export default LayoutContainer
