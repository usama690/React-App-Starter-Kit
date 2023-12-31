import React, { useState, useEffect } from 'react'
import AppTable from '../../../component/table'
import { AiFillEdit } from 'react-icons/ai'
import { MdDelete } from 'react-icons/md'
import { PlusOutlined } from '@ant-design/icons'
import { AddButton, CustomerAvatar } from './style'
import { useGetCustomersQuery } from '../../../services/api'
import AddCustomersModal from './modal/add-customers-modal'
import EditCustomerModal from './modal/edit-customer-modal'
import DeleteCustomerModal from './modal/delete-customer-modal'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store'

const CustomerList = (): JSX.Element => {
  const [page] = useState<number | undefined>(1)
  const [data, setData] = useState<IKeyValue[]>([])
  const { data: customerData, isLoading } = useGetCustomersQuery({ page })
  const [open, setOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [record, setRecord] = useState<IKeyValue>({})
  const { customers } = useSelector((state: RootState) => state.customers)

  useEffect(() => {
    if (customers.length) setData(customers)
    else setData(customerData?.data)
  }, [customerData, customers])

  const handleOpen = (record: IKeyValue, setState: (value: boolean) => void) => {
    setRecord(record)
    setState(true)
  }

  const columns: IKeyValue[] = [
    {
      title: 'Customer Image',
      dataIndex: 'avatar',
      key: 'avatar',
      render: (_: any, record: IKeyValue) => (
        <CustomerAvatar src={record.avatar} alt='avatar_image' />
      ),
      width: '10%'
    },
    {
      title: 'Customer ID',
      dataIndex: 'id',
      key: 'id',
      sorter: (a: IKeyValue, b: IKeyValue) => a.id - b.id,
      sortDirections: ['descend'],
      width: '15%'
    },
    {
      title: 'Customer Name',
      dataIndex: 'customer_name',
      key: 'customer_name',
      sorter: (a: IKeyValue, b: IKeyValue) => a.first_name.length - b.first_name.length,
      sortDirections: ['descend'],
      render: (_: any, record: IKeyValue) => (
        <p>
          {record.first_name} {record.last_name}
        </p>
      ),
      width: '15%'
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      sorter: (a: IKeyValue, b: IKeyValue) => a.email.length - b.email.length,
      sortDirections: ['descend'],
      width: '15%'
    },
    {
      title: 'Action',
      dataIndex: 'Action',
      render: (_: any, record: IKeyValue) => (
        <>
          <AiFillEdit
            size={20}
            style={{ marginRight: '10px', cursor: 'pointer' }}
            onClick={() => handleOpen(record, setEditOpen)}
          />

          <MdDelete
            size={20}
            style={{ cursor: 'pointer' }}
            onClick={() => handleOpen(record, setDeleteOpen)}
          />
        </>
      )
    }
  ]

  return (
    <>
      <AddButton type='primary' onClick={() => setOpen(true)} icon={<PlusOutlined />}>
        Add New Customer
      </AddButton>
      <AppTable columns={columns} data={data} loading={isLoading} />
      <AddCustomersModal open={open} setOpen={setOpen} />
      <EditCustomerModal open={editOpen} setOpen={setEditOpen} record={record} />
      <DeleteCustomerModal open={deleteOpen} setOpen={setDeleteOpen} record={record} />
    </>
  )
}

export default CustomerList
