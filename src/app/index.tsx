import { AuthProvider } from '@/providers/AuthProvider'
import { AppProvider } from './provider'
import AppRouter from './router'
import '@/config/i18n'

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
