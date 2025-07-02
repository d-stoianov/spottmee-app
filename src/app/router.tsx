import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import ProtectedRoute from './routes/ProtectedRoute'
import PublicRoute from './routes/PublicRoute'

import SignInRoute from './routes/auth/sign-in'
import SignUpRoute from './routes/auth/sign-up'

import DashboardLayout from '@/components/layout/DashboardLayout'

import HomeRoute from './routes/app'
import EventRoute from './routes/app/event/event-id'
import CompareRoute from './routes/app/event/compare/compare-id'

const createAppRouter = () => {
    return createBrowserRouter([
        {
            element: <PublicRoute />,
            children: [
                { path: '/sign-in', Component: SignInRoute },
                { path: '/sign-up', Component: SignUpRoute },
            ],
        },

        // protected routes
        {
            element: <ProtectedRoute />,
            children: [
                {
                    element: <DashboardLayout />,
                    children: [
                        { path: '/', element: <HomeRoute /> },
                        { path: '/event', element: <EventRoute /> },
                        { path: '/event/:id', element: <EventRoute /> },
                        {
                            path: '/event/:id/:compareKey',
                            element: <CompareRoute />,
                        },
                    ],
                },
            ],
        },
    ])
}

const AppRouter = () => {
    const router = createAppRouter()

    return <RouterProvider router={router} />
}

export default AppRouter
