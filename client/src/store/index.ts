import { configureStore } from '@reduxjs/toolkit'
import auth from './auth/auth.slice'
import products from './products/products.slice'
import { authApi } from '../services/auth'

export interface RootState {
    auth: ReturnType<typeof auth>
    products: ReturnType<typeof products>
}


const store = configureStore({
    reducer: {
        auth,
        products,
        [authApi.reducerPath]: authApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware),
})

export default store
