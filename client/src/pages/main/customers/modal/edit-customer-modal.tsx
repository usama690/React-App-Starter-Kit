import { Form } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { useState, useEffect } from 'react'
import { showSuccess } from '../../../../services/toast'
import UploadInput from '../../../../component/form/upload'
import { AddCustomerBtn } from '../style'
import AppModal from '../../../../component/modal'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../../../store'
import { setCustomer } from '../../../../store/customer/customer.slice'
import { getBase64 } from '../../../../services/_utils'
import { RcFile, UploadChangeParam, UploadFile } from 'antd/es/upload'
import AppInput from '../../../../component/form/input'

interface IEditCustomerModal {
  open: boolean
  setOpen: (value: boolean) => void
  record: IKeyValue | null
  setRecord?: (value: IKeyValue) => void
}

const EditCustomerModal = ({ open, setOpen, record }: IEditCustomerModal): JSX.Element => {
  const [file, setFile] = useState<IKeyValue | any>(null)
  const [form] = useForm()
  const { customers } = useSelector((state: RootState) => state.customers)
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const data: IKeyValue = {
      ...record,
      customer_name: `${record!.first_name} ${record!.last_name} `
    }
    form.setFieldsValue({ ...data })
  }, [record])

  const handleFormSubmit = (values: IKeyValue) => {
    setLoading(true)
    const newCustomer: ICustomer = {
      ...values,
      id: record?.id,
      first_name: values.customer_name.split(' ')[0],
      last_name: values.customer_name.split(' ')[1],
      avatar: file ?? record?.avatar
    }
    delete newCustomer['customer_name']
    const reduceCustomers = customers.reduce((acc: IKeyValue[], item: ICustomer) => {
      if (item?.id === record?.id) {
        acc?.push(newCustomer)
        return acc
      } else {
        acc?.push(item)
        return acc
      }
    }, [])

    dispatch(setCustomer({ customers: [...reduceCustomers] }))
    form.resetFields()
    showSuccess('Customer successfully edited')
    onCancel()
  }

  const handleSubmit = (): void => {
    form
      .validateFields()
      .then((values: IKeyValue) => handleFormSubmit(values))
      .catch((err) => console.log(err))
  }

  const onFileUpload = (info: UploadChangeParam<UploadFile>) => {
    getBase64(info.file.originFileObj as RcFile, (url) => {
      setFile(url)
    })
  }

  const onCancel = () => {
    setLoading(false)
    setOpen(false)
  }

  return (
    <AppModal
      okText='Create'
      open={open}
      title='Edit Customer'
      onCancel={onCancel}
      footer={null}
      confirmLoading={loading}
    >
      <Form
        form={form}
        disabled={loading}
        onFinish={handleSubmit}
        initialValues={{ remember: true }}
      >
        <Form.Item
          name='customer_name'
          rules={[
            {
              required: true,
              message: 'Please input the customer name'
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
              message: 'Please input the email'
            }
          ]}
        >
          <AppInput placeholder='Email' />
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
        <AddCustomerBtn htmlType='submit'>EDIT CUSTOMER</AddCustomerBtn>
      </Form>
    </AppModal>
  )
}

export default EditCustomerModal
