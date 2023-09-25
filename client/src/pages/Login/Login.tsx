/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable import/no-extraneous-dependencies */
import { Form, Input, Button, Checkbox, Card, Typography } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { ILogin } from '../../interfaces/login.interface'

const { Title } = Typography

const LoginForm = (): any => {
    const onFinish = (values: ILogin): void => {
        console.log('Received values of form: ', values)

        // localStorage.setItem('username', values.username)
        // localStorage.setItem('password', values.password)
    }

    const handleRegister = (e: any): void => {
        e.preventDefault()
        console.log('Handle registration logic here')
    }

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
            }}
        >
            <Card style={{ width: 500 }}>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Title level={2}>Company Logo </Title>
                </div>
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Username!',
                            },
                        ]}
                    >
                        <Input
                            prefix={
                                <UserOutlined className="site-form-item-icon" />
                            }
                            placeholder="Username"
                        />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Password!',
                            },
                        ]}
                    >
                        <Input
                            prefix={
                                <LockOutlined className="site-form-item-icon" />
                            }
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Form.Item
                            name="remember"
                            valuePropName="checked"
                            noStyle
                        >
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="login-form-button"
                            block
                        >
                            Log in
                        </Button>
                        Don't have an account{' '}
                        <a href="" onClick={handleRegister}>
                            sign up
                        </a>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

export default LoginForm
