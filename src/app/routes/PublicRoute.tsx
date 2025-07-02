// routes/PublicRoute.tsx
import { useAuth } from '@/providers/AuthProvider'
import { Navigate, Outlet } from 'react-router-dom'

const PublicRoute = () => {
    const { user } = useAuth()

    return user ? <Navigate to="/" replace /> : <Outlet />
}

export default PublicRoute
