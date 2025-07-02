import { Outlet } from 'react-router-dom'

const DashboardLayout = () => {
    return (
        <div className="flex h-full w-full">
            <div className="flex h-full w-[18rem] flex-col bg-red-500"></div>
            <main className="h-full w-full flex-1 p-10">
                <Outlet />
            </main>
        </div>
    )
}

export default DashboardLayout
