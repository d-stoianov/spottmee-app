import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import SignInRoute from './routes/auth/sign-in'
import SignUpRoute from './routes/auth/sign-up'

import HomeRoute from './routes/app'
import EventRoute from './routes/app/event/event-id'
import CompareRoute from './routes/app/event/compare/compare-id'

const createAppRouter = () => {
    return createBrowserRouter([
        { path: '/sign-in', Component: SignInRoute },
        { path: '/sign-up', Component: SignUpRoute },
        { path: '/', Component: HomeRoute },
        { path: '/event', Component: EventRoute },
        { path: '/event/:id', Component: EventRoute },
        { path: '/event/:id/:compareKey', Component: CompareRoute },
    ])
}

const AppRouter = () => {
    const router = createAppRouter()

    return <RouterProvider router={router} />
}

export default AppRouter
