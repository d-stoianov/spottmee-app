import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import ProtectedRoute from './routes/ProtectedRoute'
import PublicAlbumRouteWrapper from '@/app/routes/PublicAlbumRouteWrapper'

import SignInRoute from './routes/auth/sign-in'
import SignUpRoute from './routes/auth/sign-up'

import AppIndexRoute from './routes/app'
import CreateRoute from '@/app/routes/app/create'

import PageLayout from '@/components/layout/PageLayout'

import { AlbumsProvider } from '@/features/albums/AlbumsProvider'
import AlbumRoute from '@/app/routes/app/album-id'
import AlbumPhotosRoute from '@/app/routes/app/album-id/photos'
import AlbumShareRoute from '@/app/routes/app/album-id/share'
import SpotAlbumRoute from '@/app/routes/spot/album-id'
import SpotNotFoundRoute from '@/app/routes/spot/not-found'
import SpotSelfieRoute from '@/app/routes/spot/album-id/selfie.tsx'
import ProfileRoute from '@/app/routes/app/profile'
import SpotMatchRoute from '@/app/routes/spot/album-id/match-id.tsx'

const createAppRouter = () => {
    return createBrowserRouter([
        {
            children: [
                {
                    element: <PageLayout />,
                    children: [
                        { path: '/sign-in', element: <SignInRoute /> },
                        { path: '/sign-up', element: <SignUpRoute /> },
                        {
                            path: '/spot',
                            children: [
                                {
                                    path: '/spot',
                                    element: <SpotNotFoundRoute />,
                                },
                                {
                                    path: '/spot/not-found',
                                    element: <SpotNotFoundRoute />,
                                },
                                {
                                    path: '/spot/:albumId',
                                    element: <PublicAlbumRouteWrapper />,
                                    children: [
                                        {
                                            path: '/spot/:albumId',
                                            element: <SpotAlbumRoute />,
                                        },
                                        {
                                            path: '/spot/:albumId/selfie',
                                            element: <SpotSelfieRoute />,
                                        },
                                        {
                                            path: '/spot/:albumId/:matchId',
                                            element: <SpotMatchRoute />,
                                        },
                                        {
                                            path: '/spot/:albumId/:matchId/finish',
                                            element: <></>,
                                        },
                                    ],
                                },
                            ],
                        },
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
                        { path: '/', element: <AppIndexRoute /> },
                        { path: '/profile', element: <ProfileRoute /> },
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
