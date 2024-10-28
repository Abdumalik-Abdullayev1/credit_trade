import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    LogoutOutlined,
  } from '@ant-design/icons';
  import { IoNotificationsSharp } from "react-icons/io5";
  import { Button, Layout, Menu, Modal, theme } from 'antd';
  import { useEffect, useState } from 'react'
  import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
  import { user } from '../../router/routes'
  
  const { Header, Sider, Content } = Layout;
  
  const Index = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [selectedKey, setSelectedKey] = useState("")
    const [isModalVisible, setIsModalVisible] = useState(false);
    const { pathname } = useLocation()
    const navigate = useNavigate();
  
    const {
      token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
  
    useEffect(() => {
      let index = user.findIndex((item) => item.path === pathname)
      setSelectedKey(index.toString())
    }, [pathname])
  
    const handleClick = () => {
      setIsModalVisible(true);
    };
  
    const handleOk = () => {
      localStorage.clear();
      setIsModalVisible(false);
      navigate('/');
    };
  
    const handleCancel = () => {
      setIsModalVisible(false);
    };
  
    return (
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="demo-logo-vertical" />
          <div className="flex">
            <h1 className="text-white p-6 bg-dark-blue font-bold text-2xl">Nasiya Savdo</h1>
          </div>
            <Menu
              theme="dark"
              mode="inline"
              selectedKeys={[selectedKey]}
              items={user.map((item, index) => ({
                key: index.toString(),
                icon: item.icon,
                label: <NavLink to={item.path || '/'} className='text-white'>{item.content}</NavLink>
              }))}
            />
        </Sider>
        <Layout>
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
            }}
            className="flex justify-between px-10"
          >
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
            <div className='flex items-center'>
              <button className="flex gap-3 items-center text-base">
                <IoNotificationsSharp className='text-xl'/>
              </button>
              <button className="flex gap-3 items-center mx-10 text-base" onClick={handleClick}>
                <LogoutOutlined/>
                <h3>Logout</h3>
              </button>
            </div>
          </Header>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: '85vh',
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
  
        <Modal
          title="Logout Confirmation"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          okText="OK"
          cancelText="Cancel"
        >
          <p>Are you sure you want to logout?</p>
        </Modal>
      </Layout>
    );
  };
  
  export default Index;
  