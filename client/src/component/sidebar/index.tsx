import { Layout, Menu } from 'antd'
import { Link } from 'react-router-dom'
import { SiderWrapper } from './style'

const Sidebar = (): any => {
    return (
        <Layout>
            <SiderWrapper>
                <Menu theme="dark" >
                    <Menu.Item key="1">
                        <Link to="/products" >Products </Link>
                    </Menu.Item>
                </Menu>
            </SiderWrapper>
        </Layout>
    )
}

export default Sidebar
