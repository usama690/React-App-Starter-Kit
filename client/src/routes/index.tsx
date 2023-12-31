import { Navigate, useRoutes } from 'react-router-dom'
import PublicRoute from './public-route'
import { Error404NotFound } from '../pages'
import Customers from '../pages/main/customers'
import { MainLayout } from '../layouts'

export default function Routes(): ReactNode {
  const PublicRoutes = [
    {
      path: '/',
      element: <PublicRoute component={MainLayout} />,
      children: [
        {
          path: '',
          element: <Customers />
        }
      ]
    },
    {
      path: '*',
      element: <Navigate to='/404' />
    },
    { path: '404', element: <Error404NotFound /> }
  ]

  return useRoutes([...PublicRoutes])
}
