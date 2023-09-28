/* eslint-disable react/no-unescaped-entities */
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import Button from '../../../component/button'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login } from '../../../store/auth/auth.slice'
import { Form, Input } from 'antd'

const LoginForm = (): JSX.Element => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onFinish = (): void => {
    dispatch(
      login({
        id: "123",
        name: "Pristia",
        email: "pristia@abc.com",
        role: "vendor",
        profilePicURL:
          "https://img.freepik.com/premium-photo/portrait-smiling-woman-front-group-people_53419-3873.jpg",
        createdAt: "2022-02-26T16:37:48.244Z",
      })
    );

    navigate("/products")



    // localStorage.setItem('username', values.username)
    // localStorage.setItem('password', values.password)
  }
  return (
    <Form
      initialValues={{ remember: true }}
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