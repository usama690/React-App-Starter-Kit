import { Form, Input, Modal, Select } from "antd"
import { useForm } from "antd/es/form/Form"

interface IAddProductModal {
    open: boolean,
    setOpen: (value: boolean) => void
}

const AddProductModal = ({ open, setOpen }: IAddProductModal): JSX.Element => {
    const [form] = useForm()

    const handleFormSubmit = (values: IProducts) => {
        console.log(values)
    }

    const handleModalSubmit: any = (): void => {
        form
            .validateFields()
            .then(values => handleFormSubmit(values))
            .catch(err => console.log(err))
    }

    return (
        <Modal onOk={handleModalSubmit} okText="Create" open={open} title="Add New Product" onCancel={() => setOpen(false)}>
            <Form
                form={form}
                initialValues={{ remember: true }}
            >
                <Form.Item
                    name="title"
                    label="Title"
                    rules={[
                        {
                            required: true,
                            message: 'Please input the title',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="desc"
                    label="Description"
                    rules={[
                        {
                            required: true,
                            message: 'Please input the description',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="imgSrc"
                    label="Image"
                    rules={[
                        {
                            required: true,
                            message: 'Please select the Image',
                        },
                    ]}
                >
                    <input type="file" />
                </Form.Item>
                <Form.Item
                    name="price"
                    label="Price"
                    rules={[
                        {
                            required: true,
                            message: 'Please input the Price',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="category"
                    label="Category"
                    rules={[
                        {
                            required: true,
                            message: 'Please input the Category',
                        },
                    ]}
                >
                    <Select />
                </Form.Item>
            </Form >
        </Modal>
    )
}

export default AddProductModal