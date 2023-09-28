import { CardWrapper, HeaderWrapper, Wrapper } from './style'
import { Outlet } from 'react-router-dom'
import TypoGraphy from '../../component/typography'



const AuthLayout = (): any => {

    return (
        <Wrapper>
            <CardWrapper>
                <HeaderWrapper>
                    <TypoGraphy level={2} value="Multi Vendor Store" />
                </HeaderWrapper>
                <Outlet />
            </CardWrapper>
        </Wrapper>
    )
}

export default AuthLayout
