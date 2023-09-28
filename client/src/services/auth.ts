import { prepareHeaders } from './_utils'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: '/api',
        prepareHeaders
    }),

    endpoints: (builder) => ({
        getUserInfo: builder.query({
            query: () => 'user-info'
        }),
        login: builder.mutation({
            query: (credentials) => ({
                url: 'login',
                method: 'POST',
                body: credentials
            })
        })
    })
})

export const { useGetUserInfoQuery, useLoginMutation } = authApi