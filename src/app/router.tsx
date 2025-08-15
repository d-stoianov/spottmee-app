import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import ProtectedRoute from './routes/ProtectedRoute'
import PublicRoute from './routes/PublicRoute'

import SignInRoute from './routes/auth/sign-in'
import SignUpRoute from './routes/auth/sign-up'

import HomeRoute from './routes/app'

import PageLayout from '@/components/layout/PageLayout'

const createAppRouter = () => {
    return createBrowserRouter([
        {
            element: <PublicRoute />,
            children: [
                {
                    element: <PageLayout />,
                    children: [
                        { path: '/sign-in', Component: SignInRoute },
                        { path: '/sign-up', Component: SignUpRoute },
                    ],
                },
            ],
        },

        // protected routes
        {
            element: <ProtectedRoute />,
            children: [
                {
                    element: <PageLayout />,
                    children: [{ path: '/', element: <HomeRoute /> }],
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
