/* eslint-disable no-empty-pattern */
import { Navigate, useNavigate, useRoutes } from 'react-router-dom'
import PublicRoute from './public-route'
import { Error404NotFound, Login, Register } from '../pages'
import { useSelector } from 'react-redux'
import { RootState } from '../store'
import { roles } from '../roles'
import { RolesRoutes } from '../roles/routes'
import { AuthLayout } from '../layouts'
import { useGetUserInfoQuery } from '../services/api'
import { useEffect } from 'react'

export default function Routes(): ReactNode {
  const { user } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate()
  const {} = useGetUserInfoQuery()

  useEffect(() => {
    if (user?.role === 'ADMIN') navigate('/users')
    else navigate('/products')
  }, [user])

  const PublicRoutes = [
    {
      path: '/',
      element: <PublicRoute component={AuthLayout} />,
      children: [
        {
          path: "",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Register />,
        },
      ],

    },
    {
      path: '*',
      element: <Navigate to="/404" />,
    },
    { path: '404', element: <Error404NotFound /> },
  ];

  const getRolesRoutes = () => {
    if (user?.role === roles.admin.toUpperCase()) {
      return RolesRoutes.admin;
    } else if (user?.role === roles.vendor.toUpperCase()) {
      return RolesRoutes.vendor;
    }
    return RolesRoutes.customer;
  };

  return useRoutes([getRolesRoutes(), ...PublicRoutes])
}


