import { createSlice } from '@reduxjs/toolkit'

interface IAuthInitialState {
  customers: ICustomer[] | any
}

const initialState: IAuthInitialState = {
  customers: []
}

const customerReducer = createSlice({
  name: 'customers',
  initialState,
  reducers: {
    setCustomer: (state: IAuthInitialState, { payload }) => ({ ...state, ...payload })
  }
})

export const { setCustomer } = customerReducer.actions

export default customerReducer.reducer
