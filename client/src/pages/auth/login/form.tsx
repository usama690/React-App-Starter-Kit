/* eslint-disable react/no-unescaped-entities */
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import Button from '../../../component/button'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Input } from 'antd'
import { useLoginMutation } from '../../../services/api'
import { showError, showSuccess } from '../../../services/toast'
import { useForm } from 'antd/es/form/Form'

const LoginForm = (): JSX.Element => {
  const [form] = useForm()
  const navigate = useNavigate()
  const [login] = useLoginMutation()

  const onFinish = (values: IKeyValue): void => {
    login(values).unwrap()
      .then((fulfilled): void => {
        if (fulfilled.user.role === 'ADMIN') navigate('/users')
        else navigate('/products')
        localStorage.setItem("token", fulfilled.token),
          showSuccess(fulfilled.message)
        form.resetFields()
      })
      .catch((rejected) => {
        showError(rejected.data.message)
      })
  }
  return (
    <Form
      initialValues={{ remember: true }}
      form={form}
      onFinish={onFinish}
    >
      <Form.Item
        name="email"
        rules={[
          {
            type: 'email',
            message: 'The input is not valid email',
          },
          {
            required: true,
            message: 'Please input your email',
          },
        ]}
      >
        <Input
          prefix={
            <UserOutlined />
          }
          placeholder="Email"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input the password',
          },
        ]}
      >
        <Input
          prefix={
            <LockOutlined />
          }
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Button style={{ justifyContent: 'center' }} value='Log in' type='primary' htmlType='submit' block >Log in</Button>
        <span>Don't have an account <Link to="/register">Register</Link></span>
      </Form.Item>
    </Form >
  )
}

export default LoginForm