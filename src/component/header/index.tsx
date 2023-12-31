import React from 'react'
import { Col, Row } from 'antd'
import { LayoutWrapper, Wrapper } from './style'
import TypoGraphy from '../typography'

const AppHeader: React.FC = () => {
  return (
    <Wrapper>
      <LayoutWrapper>
        <Row align={'middle'}>
          <Col span={22}>
            {' '}
            <TypoGraphy level={2} style={{ color: '#fff' }} value='Customers' />{' '}
          </Col>
        </Row>
      </LayoutWrapper>
    </Wrapper>
  )
}

export default AppHeader
