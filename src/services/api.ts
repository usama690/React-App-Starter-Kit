import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const appApis = createApi({
  reducerPath: 'appApis',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_URL}`
  }),

  endpoints: (builder) => ({
    getCustomers: builder.query<any, IPagination>({
      query: (pagination: IPagination) => {
        const { page } = pagination
        return {
          url: 'users',
          method: 'GET',
          params: { page }
        }
      }
    })
  })
})

export const { useGetCustomersQuery } = appApis
