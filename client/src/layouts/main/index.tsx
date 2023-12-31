import { Layout } from 'antd'
import AppHeader from '../../component/header'
import AppSideBar from '../../component/sidebar'
import { Outlet } from 'react-router-dom'
import { AppLayout, ContentWrapper } from './style'

const MainLayout = (): JSX.Element => {
  return (
    <AppLayout>
      <AppSideBar />
      <Layout>
        <AppHeader />
        <ContentWrapper>
          <Outlet />
        </ContentWrapper>
      </Layout>
    </AppLayout>
  )
}

export default MainLayout
