import { Form } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { useState } from 'react'
import { showSuccess } from '../../../../services/toast'
import UploadInput from '../../../../component/form/upload'
import { AddCustomerBtn } from '../style'
import AppModal from '../../../../component/modal'
import type { RcFile, UploadChangeParam, UploadFile } from 'antd/es/upload/interface'
import { setCustomer } from '../../../../store/customer/customer.slice'
import { RootState } from '../../../../store'
import { useSelector, useDispatch } from 'react-redux'
import { getBase64 } from '../../../../services/_utils'
import AppInput from '../../../../component/form/input'

interface IAddCustomersModal {
  open: boolean
  setOpen: (value: boolean) => void
}

const AddCustomersModal = ({ open, setOpen }: IAddCustomersModal): JSX.Element => {
  const [file, setFile] = useState<IKeyValue | any>({})
  const [form] = useForm()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const { customers } = useSelector((state: RootState) => state.customers)

  const handleFormSubmit = (values: IKeyValue) => {
    setLoading(true)
    const data: IKeyValue = {
      ...values,
      id: customers?.length ? customers[customers.length - 1]?.id + 1 : 1,
      first_name: values.customer_name.split(' ')[0],
      last_name: values.customer_name.split(' ')[1],
      avatar: file
    }
    delete data['customer_name']
    dispatch(setCustomer({ customers: [...customers, data] }))
    form.resetFields()
    showSuccess('Successfully added the customer')
    onCancel()
  }

  const onFileUpload = (info: UploadChangeParam<UploadFile>) => {
    getBase64(info.file.originFileObj as RcFile, (url) => {
      setFile(url)
    })
  }

  const handleModalSubmit: any = (): void => {
    form
      .validateFields()
      .then((values: IKeyValue) => handleFormSubmit(values))
      .catch((err) => console.log(err))
  }

  const onCancel = () => {
    setLoading(false)
    setOpen(false)
  }

  return (
    <AppModal
      okText='Create'
      open={open}
      title='Add New Customer'
      onCancel={onCancel}
      footer={null}
      confirmLoading={loading}
    >
      <Form
        form={form}
        onFinish={handleModalSubmit}
        initialValues={{ remember: true }}
        disabled={loading}
      >
        <Form.Item
          name='customer_name'
          rules={[
            {
              required: true,
              message: 'Please enter the customer name'
            }
          ]}
        >
          <AppInput placeholder='Customer Name' />
        </Form.Item>
        <Form.Item
          name='email'
          rules={[
            {
              required: true,
              message: 'Please enter the email'
            }
          ]}
        >
          <AppInput type='email' placeholder='Email' />
        </Form.Item>
        <Form.Item
          name='avatar'
          rules={[
            {
              required: true,
              message: 'Please select the Image'
            }
          ]}
        >
          <UploadInput onChange={onFileUpload} />
        </Form.Item>
        <AddCustomerBtn htmlType='submit'>ADD CUSTOMER</AddCustomerBtn>
      </Form>
    </AppModal>
  )
}

export default AddCustomersModal
