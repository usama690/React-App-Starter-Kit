import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { RootState } from '../store'
import { Splash } from '../pages'

interface IPublicRoute {
  component: ReactNode
}

const PublicRoute = ({ component: Component, ...rest }: IPublicRoute): ReactNode => {
  const authState = useSelector((state: RootState) => state.auth)

  if (authState.isLoadingUser) {
    return <Splash />
  }

  if (authState.user) {
    return <Navigate to={`/`} replace />
  }

  return <Component {...rest} />
}

export default PublicRoute
