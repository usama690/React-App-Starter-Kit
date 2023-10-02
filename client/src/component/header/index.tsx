import React from 'react'
import { Col, Row } from 'antd'
import { LayoutWrapper, Wrapper } from './style'
import TypoGraphy from '../typography'
import Button from '../button'
import { useNavigate } from 'react-router-dom'
import { useLogoutMutation } from '../../services/api'
import { showError, showSuccess } from '../../services/toast'


const AppHeader: React.FC = () => {
    const navigate = useNavigate()
    const [logoutUser] = useLogoutMutation()

    const handleClick = () => {
        logoutUser(null).unwrap()
            .then((fulfilled: IKeyValue): void => {
                showSuccess(fulfilled?.message)
                navigate("/")
            })
            .catch((rejected) => {
                showError(rejected.data.message)
            })
    }

    return (
        <Wrapper>
            <LayoutWrapper >
                <Row align={'middle'} >
                    <Col span={22}> <TypoGraphy level={2} style={{ color: "#fff" }} value='Multi Vendor Store' /> </Col>
                    <Col> <Button style={{ marginTop: '16px' }} onClick={handleClick} >Logout </Button> </Col>
                </Row>
            </LayoutWrapper>

        </Wrapper>
    )
}


export default AppHeader
