import { Table } from 'antd'
import React from 'react'

interface IAppTable {
  columns: IKeyValue[]
  data?: IKeyValue[]
  loading?: boolean
  handlePagination?: any
  onChange?: (pagination: any) => void
}

const AppTable = ({
  columns,
  data,
  loading,
  handlePagination,
  onChange
}: IAppTable): JSX.Element => {
  return (
    <Table
      scroll={{ x: 1500, y: 300 }}
      style={{ width: '100%' }}
      columns={columns}
      dataSource={data}
      {...(loading ? { loading } : {})}
      {...(handlePagination ? { pagination: handlePagination() } : {})}
      {...(onChange ? { onChange } : {})}
      pagination={false}
    />
  )
}

export default AppTable
