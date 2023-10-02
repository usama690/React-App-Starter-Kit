import { prepareHeaders } from './_utils'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const appApis = createApi({
    reducerPath: 'appApis',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.REACT_APP_API_URL}`,
        prepareHeaders,
    }),
    tagTypes: ['Product', 'Categories'],

    endpoints: (builder) => ({
        getUserInfo: builder.query<any, void>({
            query: () => 'user/profile'
        }),
        getUserProducts: builder.query<any, IPagination>({
            query: (pagination: IPagination) => {
                const { page, pageSize } = pagination
                return {
                    url: 'products/user',
                    method: 'GET',
                    params: { page, pageSize }
                }
            },
            providesTags: ["Product"]
        }),
        getAllProducts: builder.query({
            query: (pagination) => {
                const { page, pageSize } = pagination
                return {
                    url: 'products/all',
                    method: 'GET',
                    params: { page, pageSize }
                }
            },
            serializeQueryArgs: ({ endpointName }) => {
                return endpointName;
            },
            merge: (currentCache, newItems) => {
                currentCache.products.push(...newItems.products);
            },
            forceRefetch({ currentArg, previousArg }) {
                return currentArg !== previousArg;
            }
        }),
        getCategories: builder.query<any, void>({
            query: () => "category"
        }),
        login: builder.mutation({
            query: (credentials) => ({
                url: 'auth/login',
                method: 'POST',
                body: credentials
            })
        }),
        register: builder.mutation({
            query: (credentials) => ({
                url: 'auth/register',
                method: 'POST',
                body: credentials
            })
        }),
        logout: builder.mutation<any, unknown>({
            query: () => ({
                url: 'auth/logout',
                method: 'POST'
            })
        }),
        addProduct: builder.mutation({
            query: (credentials) => ({
                url: 'products/',
                method: 'POST',
                body: credentials
            }),
            invalidatesTags: ["Product"]
        }),
        updateProduct: builder.mutation<void, any>({
            query: ({ id, formData }) => ({
                url: `products/${id}`,
                method: 'PUT',
                body: formData,
            }),
            invalidatesTags: ["Product"]
        }),
        deleteProduct: builder.mutation<{ id: string }, void>({
            query: (id) => ({
                url: `products/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ["Product"]
        }),
        getProductsBySearch: builder.mutation<any, { keyword?: string } | any>({
            query: (keyword) => {
                return {
                    url: 'products',
                    method: 'GET',
                    params: keyword
                }
            },
        }),
        addCategory: builder.mutation<any, IKeyValue>({
            query: (body) => {
                return {
                    url: 'category',
                    method: 'POST',
                    body
                }
            },
            invalidatesTags: ["Categories"]
        }),
        getAllCategories: builder.query<any, void>({
            query: () => 'category',
            providesTags: ["Categories"]

        }),
        deleteCategory: builder.mutation<IKeyValue, void>({
            query: (id) => ({
                url: `category/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ["Categories"]
        }),
        updateCategory: builder.mutation<void, any>({
            query: ({ id, values }) => ({
                url: `category/${id}`,
                method: 'PUT',
                body: values,
            }),
            invalidatesTags: ["Categories"]
        }),
    })
})

export const {
    useGetUserInfoQuery,
    useLoginMutation,
    useRegisterMutation,
    useGetUserProductsQuery,
    useAddProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,
    useGetCategoriesQuery,
    useGetAllProductsQuery,
    useGetProductsBySearchMutation,
    useAddCategoryMutation,
    useGetAllCategoriesQuery,
    useDeleteCategoryMutation,
    useUpdateCategoryMutation,
    useLogoutMutation
} = appApis