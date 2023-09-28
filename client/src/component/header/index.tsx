import React from 'react'
import { Col, Row } from 'antd'
import { LayoutWrapper, Wrapper } from './style'
import TypoGraphy from '../typography'
import Button from '../button'
import { useDispatch } from 'react-redux'
import { logout } from '../../store/auth/auth.slice'
import { useNavigate } from 'react-router-dom'


const AppHeader: React.FC = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleClick = () => {
        dispatch(logout())
        navigate("/")
    }

    return (
        <Wrapper>
            <LayoutWrapper >
                <Row align={'middle'} >
                    <Col span={22}> <TypoGraphy level={2} value='Multi Vendor Store' /> </Col>
                    <Col> <Button value='Logout' style={{ marginTop: '16px' }} onClick={handleClick} >Logout </Button> </Col>
                </Row>
            </LayoutWrapper>

        </Wrapper>
    )
}


export default AppHeader
