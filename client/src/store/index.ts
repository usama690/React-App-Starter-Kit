import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import customers from './customer/customer.slice'
import { appApis } from '../services/api'

export interface RootState {
  customers: ReturnType<typeof customers>
}

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['customers']
}

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    customers,
    [appApis.reducerPath]: appApis.reducer
  })
)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(appApis.middleware)
})

export const persistor = persistStore(store)
