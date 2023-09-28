import { Table } from 'antd'

interface IAppTable {
    columns: { [key: string]: any }[]
    loading?: boolean,
    data?: { [key: string]: any }[]
}

const AppTable = ({ columns, loading, data }: IAppTable): ReactNode => {
    return (
        <Table
            columns={columns}
            rowKey={(recordd: any) => recordd.user_id}
            {...loading && { loading }}
            {...data?.length && { dataSource: data }}
        />
    )
}

export default AppTable