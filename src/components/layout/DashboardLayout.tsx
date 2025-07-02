import { useAuth } from '@/providers/AuthProvider'
import { Outlet } from 'react-router-dom'

const DashboardLayout = () => {
    const { user, signOut } = useAuth()

    return (
        <div className="flex h-full w-full">
            <div className="flex h-full w-[18rem] flex-col bg-red-500 p-4">
                <div>
                    <p>{user?.email}</p>
                </div>
                <button onClick={signOut}>Sign out</button>
            </div>
            <main className="h-full w-full flex-1 p-10">
                <Outlet />
            </main>
        </div>
    )
}

export default DashboardLayout
