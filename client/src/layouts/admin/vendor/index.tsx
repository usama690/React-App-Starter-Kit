import { Outlet } from 'react-router-dom'
import AppHeader from '../../../component/header'
import Sidebar from '../../../component/sidebar'
import { SubWrapper, Wrapper } from './style'
import { GlobalWrapper } from '../../../styles/global-styles'

const VendorLayout = (): JSX.Element => {
  return (
    <Wrapper >
      <div>
        <Sidebar />
      </div>
      <SubWrapper>
        <AppHeader />
        <GlobalWrapper>
          <Outlet />
        </GlobalWrapper>
      </SubWrapper>
    </Wrapper >
  )
}

export default VendorLayout