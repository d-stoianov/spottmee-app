import Header from '@/components/layout/Header'
import { Outlet } from 'react-router-dom'

type PageLayoutProps = {
    children?: React.ReactNode
}

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
    return (
        <div className="flex h-screen w-full flex-col">
            <Header />
            {children ?? <Outlet />}
        </div>
    )
}

export default PageLayout
