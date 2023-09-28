import { Popconfirm } from "antd"
import { AiFillEdit } from "react-icons/ai";
import { GrAdd } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import AppTable from "../../../component/table";
import { Wrapper } from "./style";
import Button from "../../../component/button";
import AddProductModal from "./modal";
import { useState } from "react";




const columns = [
    {
        title: "Title",
        dataIndex: "title",
        key: "title",
    },
    {
        title: "Description",
        dataIndex: "description",
        key: "description",
    },
    {
        title: "Image",
        dataIndex: "prodImg",
        key: "prodImg",
    },
    {
        title: "Price",
        dataIndex: "price",
        key: "price",
    },
    {
        title: "Action",
        dataIndex: "Action",
        render: () => (
            <>
                <AiFillEdit
                    size={20}
                    style={{ marginRight: "10px", cursor: "pointer" }}
                // onClick={() => handleEdit(record)}
                />

                <Popconfirm
                    title="Sure to delete?"
                // onConfirm={() => handleDelete(record)}
                >
                    <MdDelete size={20} style={{ cursor: "pointer" }} />
                </Popconfirm>
            </>
        ),
    },
]

const VendorProducts = (): ReactNode => {
    const [open, setOpen] = useState(false)

    return (
        <>
            <Wrapper>
                <Button type="dashed" style={{ marginBottom: "2rem" }} onClick={() => setOpen(true)} > <GrAdd /> <span>Add new product</span> </Button>
            </Wrapper>
            <AppTable columns={columns} />
            <AddProductModal open={open} setOpen={setOpen} />
        </>

    )
}

export default VendorProducts