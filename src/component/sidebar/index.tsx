import { Layout, Menu } from 'antd'
import React from 'react'
import { UserOutlined } from '@ant-design/icons'

const { Sider } = Layout

const items = [UserOutlined].map((icon, index) => ({
  key: String(index + 1),
  icon: React.createElement(icon),
  label: `CUSTOMERS`
}))

const AppSideBar = () => {
  return (
    <Sider
      breakpoint='lg'
      collapsedWidth='0'
      
      onBreakpoint={(broken) => {
        console.log(broken)
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type)
      }}
    >
      <div className='demo-logo-vertical' />
      <Menu theme='dark' mode='inline' defaultSelectedKeys={['1']} items={items} />
    </Sider>
  )
}

export default AppSideBar
