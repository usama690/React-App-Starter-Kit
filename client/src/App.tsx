import { BrowserRouter } from 'react-router-dom'
import Routes from './routes'
import { Provider } from 'react-redux'
import store from './store'
import './styles/global.css'

export default function App(): JSX.Element {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Routes />
            </BrowserRouter>
        </Provider>
    )
}
