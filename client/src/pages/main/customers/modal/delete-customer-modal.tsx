import { useState } from 'react'
import TypoGraphy from '../../../../component/typography'
import { AppButtonWrapper } from '../../../../component/button/style'
import { DeleteIconWrapper, DeleteModalBodyWrapper, FooterWrapper } from '../style'
import AppModal from '../../../../component/modal'
import { useSelector, useDispatch } from 'react-redux'
import { setCustomer } from '../../../../store/customer/customer.slice'
import { showSuccess } from '../../../../services/toast'
import { RootState } from '../../../../store'

interface IDeleteCustomerModal {
  open: boolean
  setOpen: (value: boolean) => void
  record: IKeyValue | null
  setRecord?: (value: IKeyValue) => void
}

const DeleteCustomerModal = ({ open, setOpen, record }: IDeleteCustomerModal): JSX.Element => {
  const { customers } = useSelector((state: RootState) => state.customers)
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)

  const handleSubmit = () => {
    setLoading(true)
    const reduceCustomers = customers.reduce((acc: IKeyValue[], item: ICustomer) => {
      if (item?.id !== record?.id) {
        acc?.push(item)
        return acc
      } else return acc
    }, [])
    dispatch(setCustomer({ customers: [...reduceCustomers] }))
    showSuccess('Customer successfully deleted')
    onCancel()
  }

  const onCancel = () => {
    setLoading(false)
    setOpen(false)
  }

  return (
    <AppModal
      open={open}
      onCancel={() => setOpen(false)}
      confirmLoading={loading}
      footer={[
        <FooterWrapper key={'customer_footer'}>
          <AppButtonWrapper loading={loading} onClick={() => setOpen(false)}>
            CANCEL
          </AppButtonWrapper>
          <AppButtonWrapper loading={loading} type='primary' onClick={handleSubmit}>
            DELETE
          </AppButtonWrapper>
        </FooterWrapper>
      ]}
    >
      <DeleteModalBodyWrapper>
        <DeleteIconWrapper />
        <TypoGraphy level={3} value='Are you sure?' />
        <TypoGraphy
          style={{ marginBottom: '0' }}
          level={5}
          value='Do you really want to delete this customer?'
        />
        <TypoGraphy style={{ marginTop: '0' }} level={5} value='This process can not be undone.' />
      </DeleteModalBodyWrapper>
    </AppModal>
  )
}

export default DeleteCustomerModal
