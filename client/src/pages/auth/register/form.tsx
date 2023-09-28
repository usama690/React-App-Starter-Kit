
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { validatePassword } from '../../../services/_utils'
import Button from '../../../component/button'
import { Form, Input, Select } from 'antd'


const RegisterForm = () => {
    const onFinish = (values: IUser): void => {
        console.log('Received values of form: ', values)
    }
    return (
        <Form
            initialValues={{ remember: true }}
            onFinish={onFinish}
        >
            <Form.Item
                name="first_name"
                label="First Name"
                rules={[
                    {
                        required: true,
                        message: 'Please input the first name',
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="last_name"
                label="Last Name"
                rules={[
                    {
                        required: true,
                        message: 'Please input the last name',
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="email"
                label="Email"
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
                        <UserOutlined className="site-form-item-icon" />
                    }
                    placeholder="Email"
                />
            </Form.Item>
            <Form.Item
                name="password"
                label="Password"
                rules={[
                    {
                        required: true,
                        message: 'Please input the password',
                    },
                    { validator: validatePassword },
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
            <Form.Item
                name="role"
                label="Role"
                rules={[
                    {
                        required: true,
                        message: 'Please select the role',
                    },
                ]}
            >
                <Select
                    // defaultValue="lucy"
                    // onChange={handleChange}
                    options={[
                        { value: 'vendor', label: 'Vendor' },
                        { value: 'customer', label: 'Customer' },
                    ]}
                />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" block style={{ justifyContent: 'center' }} > Register </Button>
            </Form.Item>
            <span> Already have an account?</span> <Link to="/">Log in</Link>
        </Form>
    )
}

export default RegisterForm