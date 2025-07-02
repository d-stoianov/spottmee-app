import { useAuth } from '@/providers/AuthProvider'
import { DashboardProvider } from '@/providers/DashboardProvider'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = () => {
    const { user } = useAuth()

    // undefined - value is still unset (auth provider deciding is user authorized or not)
    if (user === undefined) {
        return <div>Loading....</div>
    }

    if (user === null) {
        return <Navigate to="/sign-in" replace />
    }

    return (
        <DashboardProvider>
            <Outlet />
        </DashboardProvider>
    )
}

export default ProtectedRoute
