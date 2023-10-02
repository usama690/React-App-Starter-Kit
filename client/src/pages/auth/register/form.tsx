
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'
import { validatePassword } from '../../../services/_utils'
import Button from '../../../component/button'
import { Form, Input, Select } from 'antd'
import { useState } from 'react'
import { useRegisterMutation } from '../../../services/api'
import { showError, showSuccess } from '../../../services/toast'
import { useForm } from 'antd/es/form/Form'

const roleDataOptions = [
    { value: 'VENDOR', label: 'Vendor' },
    { value: 'CUSTOMER', label: 'Customer' },
]

const RegisterForm = (): JSX.Element => {
    const [register, { isLoading }] = useRegisterMutation()
    const [form] = useForm()
    const [file, setFile] = useState<IKeyValue | any>({})
    const navigate = useNavigate()

    const onFinish = (values: IKeyValue): void => {
        const formData = new FormData()
        Object.keys(values).forEach(key => {
            if (key === 'profile_img') formData.append(key, file)
            else formData.append(key, values[key])
        })
        register(formData).unwrap()
            .then((fulfilled): void => {
                showSuccess(fulfilled.message)
                form.resetFields()
                navigate('/')
            })
            .catch((rejected) => {
                showError(rejected.data.message)
            })

    }
    return (
        <Form
            initialValues={{ remember: true }}
            onFinish={onFinish}
            form={form}
            disabled={isLoading}
        >
            <Form.Item
                name="firstName"
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
                name="lastName"
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
                name="profile_img"
                label="Image"
                rules={[
                    {
                        required: true,
                        message: 'Please select the Image',
                    },
                ]}
            >
                <input type="file" disabled={isLoading} onChange={(e: any) => setFile(e.target.files[0])} />
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
                    options={roleDataOptions}
                />
            </Form.Item>
            <Form.Item>
                <Button loading={isLoading} type="primary" htmlType="submit" block style={{ justifyContent: 'center' }} > Register </Button>
            </Form.Item>
            <span> Already have an account?</span> <Link to="/">Log in</Link>
        </Form>
    )
}

export default RegisterForm