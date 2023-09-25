/* eslint-disable prettier/prettier */
import * as React from 'react'
import { Navigate, useRoutes } from 'react-router-dom'
import { ReactNode } from 'react'
import Login from '../pages/Login/Login'
import NotFound from '../pages/NotFound/NotFound'

import PrivateRoute from './PrivateRoute'
import Register from '../pages/Register/Register'

export default function Routes() : any {
    return useRoutes([
        // {
        //     path: '/dashboard',
        //     element: <PrivateRoute navLink="/" component={DashboardLayout} />,
        //     children: [
        //         {
        //             path: '',
        //             element: <div />,
        //         },

        //     ],
        // },
        { path: '404', element: <NotFound /> },
        {
            path: '/register',
            element: <Register />,
        },
        {
            path: '/',
            element: <Login />,
        },
        {
            path: '*',
            element: <Navigate to="/404" />,
        },
    ])
}
