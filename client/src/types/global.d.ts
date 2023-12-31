declare global {
  type ReactNode =
    | React.ReactElement<unknown>
    | FunctionComponent<unknown>
    | React.ComponentClass<unknown>
    | null

  interface IBase extends Record<string, unkonwn> {
    id: string
  }

  interface IUser extends Record<string, unknown> {
    id: any
    name: string
    email: string
    role: string
    createdAt: string
  }
  interface ICustomer extends Record<string, unknown> {
    id?: string
    customer_name?: string
    first_name?: string
    last_name?: string
    email?: string
    avatar?: string
  }
  interface IProducts {
    title: string
    desc: string
    imgSrc: string
    price: string
    category: string
  }
  interface IProductsByQuery {
    products: {
      title: string
      desc: string
      imgSrc: string
      price: string
      category: string
    }[]
  }
  interface IKeyValue {
    [key: string]: any
  }
  interface IPagination {
    page: number | undefined
    pageSize?: number | undefined
    keyword?: string
  }
  interface ICategory {
    _id: string
    categoryName: string
  }
  interface ISearch {
    handleSearch: (searchData: IProductsByQuery) => void
    handleReFetchProducts?: () => void
  }
}

export {}
