import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import ProtectedRoute from './routes/ProtectedRoute'
import PublicRoute from './routes/PublicRoute'

import SignInRoute from './routes/auth/sign-in'
import SignUpRoute from './routes/auth/sign-up'

import HomeRoute from './routes/app'
import CreateRoute from '@/app/routes/app/create'

import PageLayout from '@/components/layout/PageLayout'

import { AlbumsProvider } from '@/features/albums/AlbumsProvider'
import AlbumRoute from '@/app/routes/app/album-id'
import AlbumPhotosRoute from '@/app/routes/app/album-id/photos'
import AlbumShareRoute from '@/app/routes/app/album-id/share'

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
                    element: (
                        <AlbumsProvider>
                            <PageLayout />
                        </AlbumsProvider>
                    ),
                    children: [
                        { path: '/', element: <HomeRoute /> },
                        { path: '/create', element: <CreateRoute /> },
                        {
                            path: '/:albumId',
                            children: [
                                { path: '/:albumId', element: <AlbumRoute /> },
                                {
                                    path: '/:albumId/photos',
                                    element: <AlbumPhotosRoute />,
                                },
                                {
                                    path: '/:albumId/share',
                                    element: <AlbumShareRoute />,
                                },
                            ],
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
