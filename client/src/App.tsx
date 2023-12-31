import { BrowserRouter } from 'react-router-dom'
import Routes from './routes'
import { Provider } from 'react-redux'
import { store, persistor } from './store'
import './styles/global.css'
import { Toaster } from 'react-hot-toast'
import { PersistGate } from 'redux-persist/integration/react'

export default function App(): JSX.Element {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Toaster toastOptions={{ duration: 2000 }} />
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  )
}
