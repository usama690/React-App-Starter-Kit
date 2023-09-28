import { Navigate, useRoutes } from 'react-router-dom'
import PublicRoute from './public-route'
import { Error404NotFound, Login, Register } from '../pages'
import { useSelector } from 'react-redux'
import { RootState } from '../store'
import { roles } from '../roles'
import { RolesRoutes } from '../roles/routes'
import { AuthLayout } from '../layouts'

export default function Routes(): ReactNode {
  const { user } = useSelector((state: RootState) => state.auth);

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
    if (user?.role === roles.admin) {
      return RolesRoutes.admin;
    } else if (user?.role === roles.vendor) {
      return RolesRoutes.vendor;
    }
    return RolesRoutes.customer;
  };

  return useRoutes([getRolesRoutes(), ...PublicRoutes])
}


