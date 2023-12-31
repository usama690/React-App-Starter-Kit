import styled from 'styled-components'
import { AppButtonWrapper } from '../../../component/button/style'
import { DeleteOutlined } from '@ant-design/icons'

export const AddButton = styled(AppButtonWrapper)`
  margin: 2rem 0;
`
export const AddCustomerBtn = styled(AppButtonWrapper)`
  width: 100%;
  display: flex;
  justify-content: center;
`
export const CustomerAvatar = styled.img`
  border-radius: 7px;
  width: 70px;
  height: 70px;
`
export const FooterWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 3rem;
`
export const DeleteModalBodyWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`
export const DeleteIconWrapper = styled(DeleteOutlined)`
  font-size: 50px;
  color: red;
`
