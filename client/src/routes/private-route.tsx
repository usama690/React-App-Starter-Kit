import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { RootState } from '../store'
import { Splash } from '../pages'

interface IPrivateRoute {
    component: ReactNode
    navLink: string
}

const PrivateRoute = ({
    component: Component,
    navLink,
    ...rest
}: IPrivateRoute): ReactNode => {
    const authState = useSelector((state: RootState) => state.auth)

    if (authState.user) {
        return Component ? (
            <Component {...rest} />
        ) : (
            <Navigate to={navLink} replace />
        )
    }
    if (authState.isLoadingUser) {
        return <Splash />;
    }

    return <Navigate to="/" replace />
}

export default PrivateRoute
