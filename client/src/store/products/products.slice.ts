/* eslint-disable import/no-extraneous-dependencies */
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    products: {},
}

export const products = createSlice({
    name: 'Auth',
    initialState,
    reducers: {
        setProducts: (state, { payload }) => ({ ...state, ...payload }),
    },
})

export const { setProducts } = products.actions
export default products.reducer
