interface IPublicRoute {
  component: ReactNode
}

const PublicRoute = ({ component: Component, ...rest }: IPublicRoute): ReactNode => {
  return <Component {...rest} />
}

export default PublicRoute
