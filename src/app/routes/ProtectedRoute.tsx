import { useAuth } from '@/providers/AuthProvider'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = () => {
    const { user } = useAuth()

    return user ? <Outlet /> : <Navigate to="/sign-in" replace />
}

export default ProtectedRoute
