import Header from '@/components/layout/Header'
import { Outlet } from 'react-router-dom'

const PageLayout: React.FC = () => {
    return (
        <div className="flex h-screen w-full flex-col">
            <Header />
            <Outlet />
        </div>
    )
}

export default PageLayout
