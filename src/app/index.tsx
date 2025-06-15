import { AuthProvider } from '@/providers/AuthProvider'
import { AppProvider } from './provider'
import AppRouter from './router'

const App: React.FC = () => {
    return (
        <AppProvider>
            <AuthProvider>
                <AppRouter />
            </AuthProvider>
        </AppProvider>
    )
}

export default App
